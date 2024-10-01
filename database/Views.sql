CREATE VIEW DriverWeeklyHours AS
SELECT 
    DriverID AS PersonID, 
    SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM 
    Shipment
GROUP BY 
    DriverID, WEEK(Date);
    
CREATE VIEW AssistantWeeklyHours AS
SELECT 
    DriverAssistantID AS PersonID, 
    SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM 
    Shipment
GROUP BY 
    DriverAssistantID, WEEK(Date);
    
CREATE VIEW TruckWeeklyHours AS
SELECT
	TruckID,
	SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM
	Shipment
GROUP BY
	TruckID, WEEK(Date);
