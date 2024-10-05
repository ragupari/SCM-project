DELIMITER $$
CREATE TRIGGER update_product_stock_after_order
AFTER INSERT ON OrderItems
FOR EACH ROW
BEGIN
  UPDATE products
  SET AvailableStock = AvailableStock - NEW.Quantity
  WHERE ProductID = NEW.ProductID;
END$$

DELIMITER $$
CREATE TRIGGER prevent_negative_stock
BEFORE UPDATE ON Products
FOR EACH ROW
BEGIN
  IF NEW.AvailableStock < 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Stock quantity cannot be negative';
  END IF;
END;


-- Didn't work
DELIMITER $$
CREATE TRIGGER update_traintrip_available_capacity
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    -- Check if TrainTripID is provided in the new order
    IF NEW.TrainTripID IS NOT NULL THEN
        -- Update the AvailableCapacity of the selected TrainTrip
        UPDATE TrainTrips
        SET AvailableCapacity = AvailableCapacity - NEW.TotalCapacity
        WHERE TrainTripID = NEW.TrainTripID;
    END IF;
END $$

DELIMITER $$
CREATE TRIGGER set_initial_remaining_capacity
BEFORE INSERT ON Shipments
FOR EACH ROW
BEGIN
    -- Set the RemainingCapacity equal to the Truck's Capacity at the beginning of the shipment
    SET NEW.RemainingCapacity = (SELECT Capacity FROM Trucks WHERE TruckID = NEW.TruckID);
END $$

DELIMITER $$
CREATE TRIGGER update_remaining_capacity_on_order
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    -- Check if a shipment (DeliveryID) is associated with the order
    IF NEW.DeliveryID IS NOT NULL THEN
        UPDATE Shipments
        SET RemainingCapacity = RemainingCapacity - NEW.TotalCapacity
        WHERE DeliveryID = NEW.DeliveryID;
    END IF;
END $$


DELIMITER ;
