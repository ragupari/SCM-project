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
-- Table structure for table `driverassistants`
--

DROP TABLE IF EXISTS `driverassistants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driverassistants` (
  `DriverAssistantID` int NOT NULL AUTO_INCREMENT,
  `StoreID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`DriverAssistantID`),
  KEY `StoreID` (`StoreID`),
  CONSTRAINT `driverassistants_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverassistants`
--

LOCK TABLES `driverassistants` WRITE;
/*!40000 ALTER TABLE `driverassistants` DISABLE KEYS */;
INSERT INTO `driverassistants` VALUES (1,1,'Alice Cooper'),(2,1,'Benjamin Foster'),(3,1,'Catherine Patel'),(4,1,'Derek Chang'),(5,2,'Evelyn Morales'),(6,2,'Felix Nguyen'),(7,2,'Grace O\'Brien'),(8,2,'Henry Kim'),(9,3,'Isabelle Wong'),(10,3,'Jack Thompson'),(11,3,'Karen Gupta'),(12,3,'Liam Murphy'),(13,4,'Monica Singh'),(14,4,'Nathan Chow'),(15,4,'Olivia Rossi'),(16,4,'Patrick Okafor'),(17,5,'Quinn Larsson'),(18,5,'Rachel Sanchez'),(19,5,'Samuel Bianchi'),(20,5,'Tara McLean'),(21,6,'Uma Patel'),(22,6,'Victor Kowalski'),(23,6,'Wendy Tanaka'),(24,6,'Xavier Dubois');
/*!40000 ALTER TABLE `driverassistants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 12:20:12
