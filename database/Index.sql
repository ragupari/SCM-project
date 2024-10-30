CREATE INDEX idx_customers_username ON Customers (Username);
CREATE INDEX idx_customers_email ON Customers (Email);

ALTER TABLE Orders 
MODIFY COLUMN Status ENUM('Pending', 'Processing', 'OnTheWay', 'Received') NOT NULL;

CREATE INDEX idx_order_status ON Orders (Status);
CREATE INDEX idx_orders_customerid ON Orders (CustomerID);