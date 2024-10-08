CREATE VIEW DriverWeeklyHours AS
SELECT 
    DriverID AS PersonID, 
    SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM 
    Shipments
GROUP BY 
    DriverID, WEEK(Date);
    
CREATE VIEW AssistantWeeklyHours AS
SELECT 
    DrivingAssistantID AS PersonID, 
    SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM 
    Shipments
GROUP BY 
    DrivingAssistantID, WEEK(Date);
    
CREATE VIEW TruckWeeklyHours AS
SELECT
	TruckID,
	SUM(TIMESTAMPDIFF(HOUR, StartTime, EndTime)) AS TotalHours,
    WEEK(Date) AS WeekNumber
FROM
	Shipments
GROUP BY
	TruckID, WEEK(Date);
    
CREATE VIEW QuarterlySalesReport AS
SELECT 
    QUARTER(O.OrderDate) AS Quarter,
    YEAR(O.OrderDate) AS Year,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity
FROM Orders O
GROUP BY YEAR(O.OrderDate), QUARTER(O.OrderDate)
ORDER BY Year, Quarter;

    
CREATE VIEW MostOrderedItems AS
SELECT 
    P.ProductName,
    SUM(OI.Quantity) AS TotalQuantityOrdered
FROM OrderItems OI
JOIN Products P ON OI.ProductID = P.ProductID
GROUP BY P.ProductName
ORDER BY TotalQuantityOrdered DESC;

CREATE VIEW SalesReportByCityAndRoute AS
SELECT 
    S.City AS StoreCity,
    R.Destination AS RouteDestination,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity
FROM Orders O
JOIN Routes R ON O.RouteID = R.RouteID
JOIN Stores S ON R.StoreID = S.StoreID
GROUP BY S.City, R.Destination
ORDER BY S.City, R.Destination;




