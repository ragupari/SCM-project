-- Create views for the database

-- View to get the total hours worked by drivers in a week
CREATE VIEW DriverWeeklyHours AS
SELECT 
    DriverID AS PersonID, 
    ROUND(SUM(TIMESTAMPDIFF(MINUTE, StartTime, EndTime) / 60), 1) AS TotalHours,
    WEEK(Date, 1) AS WeekNumber
    Month(Date,1) AS MonthNumber
FROM 
    Shipments
WHERE 
    StartTime IS NOT NULL AND EndTime IS NOT NULL
GROUP BY 
    DriverID, WEEK(Date, 1), MONTH(Date);

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
CREATE VIEW SalesReportByCityAndRoute AS
SELECT 
    S.City AS StoreCity,
    R.Destination AS RouteDestination,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity,
    OrderDate
FROM Orders O
JOIN Routes R ON O.RouteID = R.RouteID
JOIN Stores S ON R.StoreID = S.StoreID
GROUP BY S.City, R.Destination
ORDER BY S.City, R.Destination;

CREATE VIEW SalesReportByCityRouteAndQuarter AS
SELECT 
    S.City AS StoreCity,
    R.Destination AS RouteDestination,
    QUARTER(O.OrderDate) AS Quarter,
    YEAR(O.OrderDate) AS Year,
    SUM(O.TotalPrice) AS TotalSales,
    SUM(O.TotalCapacity) AS TotalCapacity
FROM Orders O
JOIN Routes R ON O.RouteID = R.RouteID
JOIN Stores S ON R.StoreID = S.StoreID
GROUP BY 
    S.City, 
    R.Destination, 
    QUARTER(O.OrderDate), 
    YEAR(O.OrderDate)
ORDER BY 
    S.City, 
    R.Destination, 
    QUARTER(O.OrderDate);

DROP VIEW IF EXISTS "ProductByStore";
CREATE VIEW "ProductByStore" AS
SELECT 
    Stores.StoreID, 
    Stores.City AS StoreName, 
    Products.ProductName AS ProductName, 
    YEAR(O.OrderDate) AS Year, 
    QUARTER(O.OrderDate) AS Quarter,
    SUM(OrderItems.Cost) AS Revenue
FROM 
    Orders O
JOIN 
    Routes R ON O.RouteID = R.RouteID
JOIN 
    Stores ON R.StoreID = Stores.StoreID
JOIN 
    OrderItems ON O.OrderID = OrderItems.OrderID
JOIN 
    Products ON OrderItems.ProductID = Products.ProductID
GROUP BY 
    Stores.StoreID, Stores.City, Products.ProductName, YEAR(O.OrderDate), QUARTER(O.OrderDate)
ORDER BY 
    Stores.StoreID;


DROP VIEW IF EXISTS "CategoryByStore";
CREATE VIEW "CategoryByStore" AS 
select Stores.StoreID, "Stores"."City" AS "StoreName","O"."OrderID" AS "OrderID","OrderItems"."ProductID" AS "ProductID",
"OrderItems"."Cost" AS "income","Products"."ProductName" AS "ProductName",
"ProductCategories"."CategoryName" AS "CategoryName",quarter("O"."OrderDate") AS "Quarter" 
from ((((("Orders" "O" join "Routes" "R" on(("O"."RouteID" = "R"."RouteID"))) join "Stores" on(("R"."StoreID" = "Stores"."StoreID"))) 
join "OrderItems" on(("O"."OrderID" = "OrderItems"."OrderID"))) join "Products" on(("OrderItems"."ProductID" = "Products"."ProductID"))) 
join "ProductCategories" on(("Products"."CategoryID" = "ProductCategories"."CategoryID"))) 
order by "R"."StoreID";
