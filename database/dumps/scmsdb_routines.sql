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
-- Temporary view structure for view `driverweeklyhours`
--

DROP TABLE IF EXISTS `driverweeklyhours`;
/*!50001 DROP VIEW IF EXISTS `driverweeklyhours`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `driverweeklyhours` AS SELECT 
 1 AS `DriverID`,
 1 AS `TotalHours`,
 1 AS `WeekNumber`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `assistantweeklyhours`
--

DROP TABLE IF EXISTS `assistantweeklyhours`;
/*!50001 DROP VIEW IF EXISTS `assistantweeklyhours`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `assistantweeklyhours` AS SELECT 
 1 AS `DriverAssistantID`,
 1 AS `TotalHours`,
 1 AS `WeekNumber`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `truckweeklyhours`
--

DROP TABLE IF EXISTS `truckweeklyhours`;
/*!50001 DROP VIEW IF EXISTS `truckweeklyhours`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `truckweeklyhours` AS SELECT 
 1 AS `TruckID`,
 1 AS `TotalHours`,
 1 AS `WeekNumber`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `driverweeklyhours`
--

/*!50001 DROP VIEW IF EXISTS `driverweeklyhours`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `driverweeklyhours` AS select `shipment`.`DriverID` AS `DriverID`,sum(timestampdiff(HOUR,`shipment`.`StartTime`,`shipment`.`EndTime`)) AS `TotalHours`,week(`shipment`.`Date`,0) AS `WeekNumber` from `shipment` group by `shipment`.`DriverID`,week(`shipment`.`Date`,0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `assistantweeklyhours`
--

/*!50001 DROP VIEW IF EXISTS `assistantweeklyhours`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `assistantweeklyhours` AS select `shipment`.`DriverAssistantID` AS `DriverAssistantID`,sum(timestampdiff(HOUR,`shipment`.`StartTime`,`shipment`.`EndTime`)) AS `TotalHours`,week(`shipment`.`Date`,0) AS `WeekNumber` from `shipment` group by `shipment`.`DriverAssistantID`,week(`shipment`.`Date`,0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `truckweeklyhours`
--

/*!50001 DROP VIEW IF EXISTS `truckweeklyhours`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `truckweeklyhours` AS select `shipment`.`TruckID` AS `TruckID`,sum(timestampdiff(HOUR,`shipment`.`StartTime`,`shipment`.`EndTime`)) AS `TotalHours`,week(`shipment`.`Date`,0) AS `WeekNumber` from `shipment` group by `shipment`.`TruckID`,week(`shipment`.`Date`,0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping routines for database 'scmsdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetAvailableDriver` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAvailableDriver`(IN specified_storeID INT)
BEGIN
    SELECT
        d.DriverID, 
        DATE_ADD(s.LastShiftEnd, INTERVAL 1 HOUR) AS DriverAvailableTime,  -- 1-hour gap, can be NULL if no shipments
        IFNULL(dwh.TotalHours, 0) AS WorkHours,                            -- Work hours, default to 0 if NULL
        s2.Date AS DriverAvailableDate                                     -- Date corresponding to the last EndTime, can be NULL
    FROM 
        -- Filter drivers by StoreID
        (SELECT 
            DriverID, 
            StoreID
         FROM 
            drivers
         WHERE 
            StoreID = specified_storeID) d
    LEFT JOIN
        -- Subquery to get DriverID and the latest EndTime
        (SELECT 
            DriverID, 
            MAX(EndTime) AS LastShiftEnd
         FROM 
            Shipment
         GROUP BY 
            DriverID) s ON d.DriverID = s.DriverID
    LEFT JOIN
        DriverWeeklyHours dwh ON d.DriverID = dwh.DriverID
    LEFT JOIN
        Shipment s2 ON s.DriverID = s2.DriverID AND s.LastShiftEnd = s2.EndTime  -- Fetch the Date for the last EndTime
    GROUP BY 
        d.DriverID, dwh.TotalHours, s2.Date                                      -- Add non-aggregated columns to GROUP BY
    HAVING 
        IFNULL(dwh.TotalHours, 0) < 40;                                          -- Ensure drivers without hours are included
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAvailableDrivingAssistant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAvailableDrivingAssistant`(IN specified_storeID INT)
BEGIN
    SELECT
        a.DriverAssistantID, 
        MAX(s.EndTime) AS LastShiftEnd,                                     -- Last shift end, can be NULL if no shipments
        IFNULL(awh.TotalHours, 0) AS WorkHours,                             -- Work hours, default to 0 if NULL
        s.Date AS DriverAssistantAvailableDate                              -- Date of last shift, can be NULL
    FROM 
        -- Filter driver assistants by StoreID
        (SELECT 
            DriverAssistantID, 
            StoreID
         FROM 
            driverassistants
         WHERE 
            StoreID = specified_storeID) a
    LEFT JOIN
        -- Get the last EndTime for each driver assistant from shipments
        Shipment s ON a.DriverAssistantID = s.DriverAssistantID
    LEFT JOIN
        AssistantWeeklyHours awh ON a.DriverAssistantID = awh.DriverAssistantID
    GROUP BY 
        a.DriverAssistantID, awh.TotalHours, s.Date                         -- Group by all non-aggregated columns
    HAVING 
        IFNULL(awh.TotalHours, 0) < 60;                                     -- Treat NULL work hours as 0
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAvailableTrucks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAvailableTrucks`(IN specified_storeID INT)
BEGIN
    SELECT 
        t.TruckID,
        s2.Date AS TruckAvailableDate,  -- Get the date corresponding to the last EndTime
        s.LastShiftEnd,                 -- Get the latest EndTime
        t.Capacity
    FROM 
        (SELECT 
            TruckID, 
            MAX(EndTime) AS LastShiftEnd -- Get the latest EndTime for each Truck
         FROM 
            Shipment
         GROUP BY 
            TruckID) s
    RIGHT JOIN
        (SELECT 
            TruckID, 
            StoreID,
            Capacity
         FROM 
            Trucks
         WHERE 
            StoreID = specified_storeID) t ON s.TruckID = t.TruckID
    LEFT JOIN
        Shipment s2 ON s.TruckID = s2.TruckID AND s.LastShiftEnd = s2.EndTime -- Join to get the Date for the latest EndTime
    GROUP BY 
        t.TruckID, s2.Date, s.LastShiftEnd, t.Capacity;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 12:20:16
