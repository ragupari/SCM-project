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
            StoreID = specified_storeID) d
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
        DriverWeeklyHours dwh ON d.DriverID = dwh.PersonID
    GROUP BY 
        d.DriverID, dwh.TotalHours
    HAVING 
        IFNULL(dwh.TotalHours, 0) < 40;  -- Ensure drivers without hours are included
END$$

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
                -- Otherwise, use the last shift end time + 1 hour
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
            StoreID = specified_storeID) a
    LEFT JOIN
        -- Subquery to get the last EndTime for each assistant and count shifts on the given date
        (SELECT 
            DrivingAssistantID, 
            MAX(EndTime) AS LastShiftEnd,
            COUNT(*) AS ShiftCount   -- Count the number of shifts worked on the given date
         FROM 
            Shipments
         WHERE 
			Date = specified_date   -- Filter shipments for the specified date
            AND StoreID = specified_storeID   -- Ensure we match StoreID as well
         GROUP BY 
            DrivingAssistantID
        ) s ON a.DrivingAssistantID = s.DrivingAssistantID
    LEFT JOIN
        AssistantWeeklyHours awh ON a.DrivingAssistantID = awh.PersonID
    GROUP BY 
        a.DrivingAssistantID, awh.TotalHours;
END$$

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
        t.TruckID, s.LastShiftEnd, t.Capacity;
END$$