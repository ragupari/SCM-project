-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: scmsdb
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `DeliveryID` int NOT NULL AUTO_INCREMENT,
  `TrainTripID` int NOT NULL,
  `OrderID` int NOT NULL,
  `TruckID` int NOT NULL,
  `DriverID` int NOT NULL,
  `DriverAssistantID` int NOT NULL,
  `RouteID` int NOT NULL,
  `Date` date NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  PRIMARY KEY (`DeliveryID`),
  KEY `TrainTripID` (`TrainTripID`),
  KEY `OrderID` (`OrderID`),
  KEY `TruckID` (`TruckID`),
  KEY `DriverID` (`DriverID`),
  KEY `DriverAssistantID` (`DriverAssistantID`),
  KEY `RouteID` (`RouteID`),
  CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`TrainTripID`) REFERENCES `traintrips` (`TrainTripID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_3` FOREIGN KEY (`TruckID`) REFERENCES `trucks` (`TruckID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_4` FOREIGN KEY (`DriverID`) REFERENCES `drivers` (`DriverID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_5` FOREIGN KEY (`DriverAssistantID`) REFERENCES `driverassistants` (`DriverAssistantID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_6` FOREIGN KEY (`RouteID`) REFERENCES `routes` (`RouteID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 12:11:04
