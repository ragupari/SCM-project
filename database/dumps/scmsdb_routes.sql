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
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `RouteID` int NOT NULL AUTO_INCREMENT,
  `StoreID` int NOT NULL,
  `Destination` varchar(100) NOT NULL,
  `TimeToCompletion` time NOT NULL,
  `MainTowns` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`RouteID`),
  KEY `StoreID` (`StoreID`),
  CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,1,'Colombo','00:30:00','N/A'),(2,1,'Maradana','00:20:00','Pettah'),(3,1,'Dehiwala','00:50:00','Wellawatte, Mount Lavinia'),(4,1,'Malabe','01:00:00','Rajagiriya, Kaduwela'),(5,1,'Battaramulla','00:50:00','Rajagiriya'),(6,1,'Nugegoda','00:50:00','Kirulapone, Nawala'),(7,2,'Negombo','01:00:00','N/A'),(8,2,'Minuwangoda','00:30:00','Ja-Ela'),(9,2,'Katunayake','00:20:00','Seeduwa'),(10,2,'Kadana','01:00:00','Ja-Ela, Ragama'),(11,2,'Seeduwa','00:30:00','Katunayake'),(12,2,'Gampaha','01:40:00','Ja-Ela, Ragama'),(13,3,'Galle','00:30:00','N/A'),(14,3,'Hikkaduwa','01:10:00','Dodanduwa'),(15,3,'Koggala','01:00:00','Habaraduwa'),(16,3,'Unawatuna','00:30:00','N/A'),(17,3,'Bentota','01:10:00','Ambalangoda, Balapitiya'),(18,3,'Baddegama','01:45:00','Imaduwa'),(19,4,'Matara','00:30:00','N/A'),(20,4,'Tangalle','01:00:00','Dickwella'),(21,4,'Weligama','00:20:00','N/A'),(22,4,'Mirissa','01:30:00','Weligama'),(23,4,'Panaduwa','01:00:00','Hakmana'),(24,4,'Devinuwara','01:45:00','Dickwella'),(25,5,'Jaffna','00:30:00','N/A'),(26,5,'Kayts','01:30:00','Velanai'),(27,5,'Point Pedro','00:40:00','Nelliyadi'),(28,5,'Kodikamam','02:00:00','Chavakacheri'),(29,5,'Chavakachcheri','00:20:00','N/A'),(30,5,'Pooneryn','02:30:00','Paranthan'),(31,6,'Trinco','00:30:00','N/A'),(32,6,'Kinniya','00:20:00','N/A'),(33,6,'Pulmoddai','01:00:00','Kuchchaveli'),(34,6,'Nilaveli','01:20:00','Kuchchaveli'),(35,6,'Batticaloa','02:00:00','Kantale, Valaichchenai'),(36,6,'Mutur','00:40:00','N/A');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 12:20:16
