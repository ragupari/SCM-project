DELIMITER $$

CREATE PROCEDURE GetAvailableDrivingAssistant(IN specified_storeID INT)
BEGIN
    SELECT
        a.DriverAssistantID, 
        MAX(s.EndTime) AS LastShiftEnd,                                     -- Last shift end, can be NULL if no shipments
        IFNULL(awh.TotalHours, 0) AS WorkHours,                             -- Work hours, default to 0 if NULL
        s.Date AS DriverAssistantAvailableDate                              -- Date of last shift, can be NULL
    FROM 
        -- Filter driver assistants by StoreID
        (SELECT 
            DriverAssistantID, 
            StoreID
         FROM 
            driverassistants
         WHERE 
            StoreID = specified_storeID) a
    LEFT JOIN
        -- Get the last EndTime for each driver assistant from shipments
        Shipment s ON a.DriverAssistantID = s.DriverAssistantID
    LEFT JOIN
        AssistantWeeklyHours awh ON a.DriverAssistantID = awh.DriverAssistantID
    GROUP BY 
        a.DriverAssistantID, awh.TotalHours, s.Date                         -- Group by all non-aggregated columns
    HAVING 
        IFNULL(awh.TotalHours, 0) < 60;                                     -- Treat NULL work hours as 0
END $$

CREATE PROCEDURE GetAvailableDriver(IN specified_storeID INT)
BEGIN
    SELECT
        d.DriverID, 
        DATE_ADD(s.LastShiftEnd, INTERVAL 1 HOUR) AS DriverAvailableTime,  -- 1-hour gap
        IFNULL(dwh.TotalHours, 0) AS WorkHours,                            -- Work hours, default to 0 if NULL
        s2.Date AS DriverAvailableDate                                     -- Date corresponding to the last EndTime
    FROM 
        -- Filter drivers by StoreID
        (SELECT 
            DriverID, 
            StoreID
         FROM 
            drivers
         WHERE 
            StoreID = specified_storeID) d
    LEFT JOIN
        -- Subquery to get DriverID and the latest EndTime
        (SELECT 
            DriverID, 
            MAX(EndTime) AS LastShiftEnd
         FROM 
            Shipment
         GROUP BY 
            DriverID) s ON d.DriverID = s.DriverID
    LEFT JOIN
        DriverWeeklyHours dwh ON d.DriverID = dwh.DriverID
    LEFT JOIN
        Shipment s2 ON s.DriverID = s2.DriverID AND s.LastShiftEnd = s2.EndTime  -- Fetch the Date for the last EndTime
    GROUP BY 
        d.DriverID, dwh.TotalHours, s2.Date                                      -- Add non-aggregated columns to GROUP BY
    HAVING 
        IFNULL(dwh.TotalHours, 0) < 40;                                          -- Ensure drivers without hours are included
END $$

CREATE PROCEDURE GetAvailableTrucks(IN specified_storeID INT)
BEGIN
    SELECT 
        t.TruckID,
        s2.Date AS TruckAvailableDate,  -- Get the date corresponding to the last EndTime
        s.LastShiftEnd,                 -- Get the latest EndTime
        t.Capacity
    FROM 
        (SELECT 
            TruckID, 
            MAX(EndTime) AS LastShiftEnd -- Get the latest EndTime for each Truck
         FROM 
            Shipment
         GROUP BY 
            TruckID) s
    RIGHT JOIN
        (SELECT 
            TruckID, 
            StoreID,
            Capacity
         FROM 
            Trucks
         WHERE 
            StoreID = specified_storeID) t ON s.TruckID = t.TruckID
    LEFT JOIN
        Shipment s2 ON s.TruckID = s2.TruckID AND s.LastShiftEnd = s2.EndTime -- Join to get the Date for the latest EndTime
    GROUP BY 
        t.TruckID, s2.Date, s.LastShiftEnd, t.Capacity;
END $$