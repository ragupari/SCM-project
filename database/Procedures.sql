-- Contains stored procedures for the database.

-- Get available drivers for a specified store and date
DELIMITER $$
CREATE PROCEDURE GetAvailableDriver(
    IN specified_storeID INT,
    IN specified_date DATE
)
BEGIN
    SELECT
        d.DriverID, 
        IFNULL(
            CASE 
                WHEN s.LastShiftEnd IS NULL THEN '09:00:00'   -- If no shipment, show 9:00 AM
                ELSE DATE_FORMAT(DATE_ADD(s.LastShiftEnd, INTERVAL 1 HOUR), '%H:%i:%s') 
            END, 
            '09:00:00'   -- Default to 9:00 AM if no shipment exists at all
        ) AS DriverAvailableTime,
        IFNULL(dwh.TotalHours, 0) AS WorkHours  -- Work hours, default to 0 if NULL
    FROM 
        -- Filter drivers by StoreID
        (SELECT 
            DriverID, 
            StoreID
         FROM 
            Drivers
         WHERE 
            StoreID = specified_storeID AND EmploymentStatus = 'PresentEmployer') d
    LEFT JOIN
        -- Subquery to get DriverID and the latest EndTime for the given date and store
        (SELECT 
            DriverID, 
            MAX(EndTime) AS LastShiftEnd
         FROM 
            Shipments
         WHERE 
            Date = specified_date   -- Filter shipments for the specified date
            AND StoreID = specified_storeID   -- Ensure we match StoreID as well
         GROUP BY 
            DriverID) s ON d.DriverID = s.DriverID
    LEFT JOIN
        -- Join weekly hours ensuring it's for the same week and driver
        (SELECT 
            PersonID, 
            TotalHours 
         FROM 
            DriverWeeklyHours 
         WHERE 
            WeekNumber = WEEK(specified_date, 1)) dwh ON d.DriverID = dwh.PersonID
    GROUP BY 
        d.DriverID, dwh.TotalHours
    HAVING 
        IFNULL(dwh.TotalHours, 0) < 40  -- Ensure drivers without hours are included
    ORDER BY 
        DriverAvailableTime;  -- Order by DriverAvailableTime
END$$

-- Get available driving assistants for a specified store and date
DELIMITER $$
CREATE PROCEDURE GetAvailableDrivingAssistant(
    IN specified_storeID INT,
    IN specified_date DATE
)
BEGIN
    SELECT
        a.DrivingAssistantID, 
        IFNULL(
            CASE 
                -- If assistant has worked an even number of shifts (consecutive), enforce a 1-hour break
                WHEN ShiftCount % 2 = 0 AND ShiftCount != 0 THEN DATE_FORMAT(DATE_ADD(s.LastShiftEnd, INTERVAL 1 HOUR), '%H:%i:%s')
                -- Otherwise, use the last shift end time
                ELSE DATE_FORMAT(s.LastShiftEnd, '%H:%i:%s')
            END, 
            '09:00:00'   -- Default to 9:00 AM if no shifts
        ) AS DrivingAssistantAvailableTime,
        IFNULL(awh.TotalHours, 0) AS WorkHours  -- Work hours, default to 0 if NULL
    FROM 
        -- Filter driving assistants by StoreID
        (SELECT 
            DrivingAssistantID, 
            StoreID
         FROM 
            DrivingAssistants
         WHERE 
            StoreID = specified_storeID AND EmploymentStatus = 'PresentEmployer') a
    LEFT JOIN
        -- Subquery to get the last EndTime and count the number of shifts for each assistant
        (SELECT 
            DrivingAssistantID, 
            MAX(EndTime) AS LastShiftEnd,
            COUNT(*) AS ShiftCount   -- Count the number of shifts worked on the specified date
         FROM 
            Shipments
         WHERE 
            Date = specified_date   -- Filter shipments for the specified date
            AND StoreID = specified_storeID   -- Match StoreID as well
         GROUP BY 
            DrivingAssistantID
        ) s ON a.DrivingAssistantID = s.DrivingAssistantID
    LEFT JOIN
        -- Join weekly hours, ensuring it's for the correct week and assistant
        (SELECT 
            PersonID, 
            TotalHours 
         FROM 
            AssistantWeeklyHours 
         WHERE 
            WeekNumber = WEEK(specified_date, 1)) awh ON a.DrivingAssistantID = awh.PersonID
    GROUP BY 
        a.DrivingAssistantID, awh.TotalHours
    ORDER BY
        DrivingAssistantAvailableTime;  -- Order by DrivingAssistantAvailableTime
END$$

-- Get available trucks for a specified store and date
DELIMITER $$
CREATE PROCEDURE GetAvailableTrucks(
    IN specified_storeID INT,
    IN specified_date DATE
)
BEGIN
    SELECT 
        t.TruckID,
        IFNULL(s.LastShiftEnd, '09:00:00') AS LastShiftEnd,  -- Get the last shift end time or default to 9:00 AM if no shift
        t.Capacity
    FROM 
        -- Subquery to get the latest EndTime for each Truck on the specified date
        (SELECT 
            TruckID, 
            MAX(EndTime) AS LastShiftEnd  -- Get the latest EndTime for each Truck on the given date
         FROM 
            Shipments
         WHERE 
			Date = specified_date   -- Filter shipments for the specified date
            AND StoreID = specified_storeID   -- Ensure we match StoreID as well
         GROUP BY 
            TruckID) s
    RIGHT JOIN
        -- Filter trucks by StoreID
        (SELECT 
            TruckID, 
            StoreID,
            Capacity
         FROM 
            Trucks
         WHERE 
            StoreID = specified_storeID) t ON s.TruckID = t.TruckID
    GROUP BY 
        t.TruckID, s.LastShiftEnd, t.Capacity
    ORDER BY 
        LastShiftEnd;  -- Order by LastShiftEnd
END$$

-- Generate Train Schedule
DELIMITER $$
CREATE PROCEDURE GenerateTrainSchedule(IN StartDate DATE, IN EndDate DATE)
BEGIN
    DECLARE DayTotalCapacity INT;
    DECLARE DayCapacity INT;

    WHILE StartDate <= EndDate DO
        -- Train 1 to Destination 1
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 06:00:00'), 1, 1500 + FLOOR(RAND() * 1000));

        -- Train 2 to Destination 2
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 06:20:00'), 2, 1500 + FLOOR(RAND() * 1000));

        -- Train 3 to Destination 3
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 07:15:00'), 3, 1500 + FLOOR(RAND() * 1000));

        -- Train 4 to Destination 4
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 07:40:00'), 4, 1500 + FLOOR(RAND() * 1000));

        -- Train 5 to Destination 5
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 08:10:00'), 5, 1500 + FLOOR(RAND() * 1000));

        -- Train 6 to Destination 6
        INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity)
        VALUES (CONCAT(StartDate, ' 08:20:00'), 6, 1500 + FLOOR(RAND() * 1000));

        -- Move to the next day
        SET StartDate = DATE_ADD(StartDate, INTERVAL 1 DAY);
    END WHILE;
END $$

DELIMITER ;