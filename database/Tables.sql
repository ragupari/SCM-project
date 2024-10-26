CREATE DATABASE  IF NOT EXISTS scmsdb;
USE scmsdb;

CREATE TABLE Stores (
    StoreID INT NOT NULL AUTO_INCREMENT,
    City VARCHAR(100) NOT NULL,
    ContactNumber INT,
    PRIMARY KEY (StoreID)
);

CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    FullName VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    City VARCHAR(100),
    Img VARCHAR(255)
); 

CREATE TABLE StoreManagers (
  ManagerID int NOT NULL AUTO_INCREMENT,
  StoreID int NOT NULL, 
  FullName varchar(100) NOT NULL,
  Username varchar(100) NOT NULL UNIQUE,
  Password varchar(100) NOT NULL,
  Email varchar(100) NOT NULL UNIQUE,
  primary key (ManagerID),
  foreign key (StoreID) references Stores(StoreID) ON DELETE CASCADE
);

CREATE TABLE TrainTrips (
  TrainTripID int NOT NULL AUTO_INCREMENT,
  DepartureTime datetime NOT NULL,
  Destination int NOT NULL,
  AvailableCapacity int NOT NULL,
  PRIMARY KEY (TrainTripID),
  FOREIGN KEY (Destination) REFERENCES Stores(StoreID)
);

CREATE TABLE Routes (
  RouteID int NOT NULL AUTO_INCREMENT,
  StoreID int NOT NULL,
  Destination varchar(100) NOT NULL,
  TimeforCompletion time NOT NULL,
  MainTowns varchar(255) DEFAULT NULL,
  PRIMARY KEY (RouteID),
  FOREIGN KEY (StoreID) REFERENCES Stores(StoreID) ON DELETE CASCADE
);

CREATE TABLE Orders (
  OrderID int NOT NULL AUTO_INCREMENT,
  CustomerID int NOT NULL,
  DeliveryAddress varchar(255) NOT NULL,
  Status varchar(50) NOT NULL,
  OrderDate date NOT NULL,
  DeliveryDate date NOT NULL,
  TotalPrice int NOT NULL,
  TotalCapacity int NOT NULL,
  RouteID int NOT NULL,
  TrainTripID int NULL,
  DeliveryID int NULL,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
  FOREIGN KEY (RouteID) REFERENCES Routes(RouteID),
  FOREIGN KEY (TrainTripID) REFERENCES TrainTrips(TrainTripID)
);

CREATE TABLE ProductCategories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL
);

CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    UnitPrice INT NOT NULL,
    CapacityPerUnit INT NOT NULL,
    AvailableStock INT NOT NULL,
    CategoryID INT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES ProductCategories(CategoryID) ON DELETE CASCADE
);

CREATE TABLE OrderItems (
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Cost INT NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Trucks (
  TruckID int NOT NULL AUTO_INCREMENT,
  Capacity int NOT NULL,
  StoreID int NOT NULL,
  PRIMARY KEY (TruckID),
  FOREIGN KEY (StoreID) REFERENCES Stores(StoreID) ON DELETE CASCADE
);

CREATE TABLE DrivingAssistants (
  DrivingAssistantID int NOT NULL AUTO_INCREMENT,
  StoreID int NOT NULL,
  Name varchar(100) NOT NULL,
  EmploymentStatus varchar(100),
  PRIMARY KEY (DrivingAssistantID),
  FOREIGN KEY (StoreID) REFERENCES Stores(StoreID)
);

CREATE TABLE Drivers (
  DriverID int NOT NULL AUTO_INCREMENT,
  StoreID int NOT NULL,
  Name varchar(100) NOT NULL,
  EmploymentStatus varchar(100),
  PRIMARY KEY (DriverID),
  FOREIGN KEY (StoreID) REFERENCES Stores(StoreID)
);

CREATE TABLE Shipments (
  DeliveryID int NOT NULL AUTO_INCREMENT,
  RouteID int NOT NULL,
  StoreID int NOT NULL,
  TruckID int NOT NULL,
  DriverID int NOT NULL,
  DrivingAssistantID int NOT NULL,
  Date date NOT NULL,
  StartTime time NOT NULL,
  EndTime time NOT NULL,
  RemainingCapacity INT check (RemainingCapacity >= 0),
  PRIMARY KEY (DeliveryID),
  FOREIGN KEY (RouteID) REFERENCES Routes(RouteID),
  FOREIGN KEY (StoreID) REFERENCES Stores(StoreID),
  FOREIGN KEY (TruckID) REFERENCES Trucks(TruckID),
  FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
  FOREIGN KEY (DrivingAssistantID) REFERENCES DrivingAssistants(DrivingAssistantID)
);

CREATE TABLE Cart (
  CartItemID int NOT NULL UNIQUE AUTO_INCREMENT,
  CustomerID int NOT NULL,
  ProductID int NOT NULL,
  Number int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (CartItemID)
);


-- useful when you need to re-create the tables and load data
SET Foreign_key_checks = 0;
SET Foreign_key_checks = 1;