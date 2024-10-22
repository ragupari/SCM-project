-- Create views for the database

-- View to get the total hours worked by drivers in a week
CREATE VIEW DriverWeeklyHours AS
SELECT 
    DriverID AS PersonID, 
    ROUND(SUM(TIMESTAMPDIFF(MINUTE, StartTime, EndTime) / 60), 1) AS TotalHours,
    WEEK(Date, 1) AS WeekNumber
FROM 
    Shipments
WHERE 
    StartTime IS NOT NULL AND EndTime IS NOT NULL
GROUP BY 
    DriverID, WEEK(Date, 1);

-- View to get the total hours worked by driving assistants in a week   
CREATE VIEW AssistantWeeklyHours AS
SELECT 
    DrivingAssistantID AS PersonID, 
    ROUND(SUM(TIMESTAMPDIFF(MINUTE, StartTime, EndTime) / 60), 1) AS TotalHours,
    WEEK(Date, 1) AS WeekNumber
FROM 
    Shipments
WHERE 
    StartTime IS NOT NULL AND EndTime IS NOT NULL
GROUP BY 
    DrivingAssistantID, WEEK(Date, 1);

-- View to get the total hours worked by trucks in a week  
CREATE VIEW TruckWeeklyHours AS
SELECT
    TruckID,
    ROUND(SUM(TIMESTAMPDIFF(MINUTE, StartTime, EndTime) / 60), 1) AS TotalHours,
    WEEK(Date, 1) AS WeekNumber
FROM
    Shipments
WHERE 
    StartTime IS NOT NULL AND EndTime IS NOT NULL
GROUP BY
    TruckID, WEEK(Date, 1);

-- View to get the total sales and capacity for each quarter 
CREATE VIEW QuarterlySalesReport AS
SELECT 
    QUARTER(O.OrderDate) AS Quarter,
    YEAR(O.OrderDate) AS Year,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity
FROM Orders O
GROUP BY YEAR(O.OrderDate), QUARTER(O.OrderDate)
ORDER BY Year, Quarter;

-- View to get the total quantity ordered for each product  
CREATE VIEW MostOrderedItems AS
SELECT 
    P.ProductName,
    SUM(OI.Quantity) AS TotalQuantityOrdered
FROM OrderItems OI
JOIN Products P ON OI.ProductID = P.ProductID
GROUP BY P.ProductName
ORDER BY TotalQuantityOrdered DESC;

-- View to get the total sales and capacity for each store
CREATE VIEW SalesReportByCityRouteAndYear AS
SELECT 
    S.City AS StoreCity,
    R.Destination AS RouteDestination,
    YEAR(O.OrderDate) AS Year,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity
FROM Orders O
JOIN Routes R ON O.RouteID = R.RouteID
JOIN Stores S ON R.StoreID = S.StoreID
GROUP BY S.City, R.Destination, YEAR(O.OrderDate)
ORDER BY S.City, R.Destination, YEAR(O.OrderDate);

-- View to get the total quantity ordered for each category
CREATE VIEW OrderedQuantityByCategory AS
SELECT 
    pc.CategoryName,
    SUM(oi.Quantity) AS TotalOrderedQuantity
FROM 
    OrderItems oi
    JOIN Products p ON oi.ProductID = p.ProductID
    JOIN ProductCategories pc ON p.CategoryID = pc.CategoryID
GROUP BY 
    pc.CategoryID, pc.CategoryName;

-- View to get the total revenue for each category
CREATE VIEW RevenueByCategory AS
SELECT 
    pc.CategoryName,
    SUM(oi.Cost) AS TotalRevenue
FROM 
    OrderItems oi
    JOIN Products p ON oi.ProductID = p.ProductID
    JOIN ProductCategories pc ON p.CategoryID = pc.CategoryID
GROUP BY 
    pc.CategoryID, pc.CategoryName;