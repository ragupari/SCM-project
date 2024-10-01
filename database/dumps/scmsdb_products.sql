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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_ID` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `unit_price` int NOT NULL,
  `CapacityPerUnit` int NOT NULL,
  `available` int NOT NULL,
  `category_ID` int NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_ID`),
  KEY `category_ID` (`category_ID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_ID`) REFERENCES `product_categories` (`category_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Breakfast Tea',12,25,500,1,'Strong, full-bodied Ceylon black tea perfect for morning consumption'),(2,'High Grown BOP',15,20,300,1,'Broken Orange Pekoe black tea from Sri Lanka’s highlands'),(3,'Earl Grey',14,25,400,1,'Ceylon black tea with natural bergamot flavoring'),(4,'Low Grown OP',13,20,350,1,'Orange Pekoe black tea from Sri Lanka’s lowland regions'),(5,'Ceylon BOPF',10,20,450,1,'Broken Orange Pekoe Fannings, offering a brisk and bold taste'),(6,'Ceylon Souchong',16,25,300,1,'Unique smoked black tea with a rich, smoky aroma'),(7,'Gunpowder Green Tea',18,25,200,2,'Rolled Ceylon green tea leaves with a fresh, bold flavor'),(8,'Jasmine Green Tea',20,25,180,2,'Green tea scented with natural jasmine flowers from Sri Lanka'),(9,'Sencha Green Tea',22,20,150,2,'Japanese-style Sencha tea grown in Sri Lanka'),(10,'Green Pekoe',19,25,220,2,'Light and grassy Ceylon green tea with a smooth finish'),(11,'Lemon Green Tea',18,20,230,2,'Green tea infused with lemon for a zesty flavor'),(12,'Mint Green Tea',17,20,240,2,'Refreshing mint-infused Ceylon green tea'),(13,'Chamomile Tea',16,20,150,3,'Relaxing herbal tea made from Sri Lankan-grown chamomile flowers'),(14,'Lemongrass Tea',14,20,180,3,'Zesty lemongrass herbal tea from the Sri Lankan lowlands'),(15,'Cinnamon Herbal Tea',18,25,200,3,'Cinnamon-infused herbal tea with natural Sri Lankan cinnamon'),(16,'Turmeric Ginger Tea',20,25,140,3,'A spicy blend of turmeric and ginger grown in Sri Lanka'),(17,'Peppermint Herbal Tea',15,20,160,3,'Cool and refreshing peppermint herbal tea from Sri Lanka'),(18,'Hibiscus Herbal Tea',18,20,120,3,'Tart hibiscus tea sourced from local Sri Lankan farms'),(19,'Vanilla Black Tea',19,25,300,4,'Rich Ceylon black tea with a hint of vanilla flavor'),(20,'Cinnamon Black Tea',18,25,250,4,'Black tea infused with natural Sri Lankan cinnamon'),(21,'Cardamom Green Tea',20,20,220,4,'Ceylon green tea with aromatic cardamom flavor'),(22,'Rose Black Tea',21,25,200,4,'Floral black tea with natural rose petals from Sri Lanka'),(23,'Lemon Black Tea',17,25,260,4,'Black tea infused with natural lemon essence'),(24,'Ginger Green Tea',19,20,240,4,'Zesty green tea blended with Sri Lankan ginger'),(25,'Silver Tips White Tea',30,10,120,5,'Premium hand-picked white tea with delicate silver tips'),(26,'Golden Tips White Tea',32,10,100,5,'Rare and exclusive golden tips white tea from Sri Lanka'),(27,'Peony White Tea',28,15,90,5,'A subtle, floral white tea with notes of peony'),(28,'White Needle Tea',29,10,110,5,'Finely crafted white tea with needle-like leaves'),(29,'Jasmine White Tea',31,10,130,5,'Delicate white tea infused with jasmine flowers'),(30,'Organic White Tea',35,10,80,5,'Hand-picked organic white tea from the highlands of Sri Lanka'),(31,'Organic Black Tea',20,25,250,6,'Organically grown black tea from certified farms in Sri Lanka'),(32,'Organic Green Tea',22,20,200,6,'Fresh organic green tea grown without pesticides'),(33,'Organic Chamomile Tea',18,20,180,6,'Soothing chamomile tea from organic Sri Lankan farms'),(34,'Organic Cinnamon Tea',19,20,160,6,'Organic black tea blended with Sri Lankan cinnamon'),(35,'Organic White Tea',28,10,120,6,'Exquisite white tea from organic highland farms'),(36,'Organic Lemongrass Tea',17,20,200,6,'Organic lemongrass tea with a fresh, citrusy flavor'),(37,'Peach Iced Tea',14,10,220,7,'Fruity peach-flavored iced tea from Ceylon black tea'),(38,'Lemon Iced Tea',12,10,230,7,'Refreshing lemon-flavored iced tea using Ceylon tea'),(39,'Raspberry Iced Tea',15,10,200,7,'Fruity raspberry iced tea made with Ceylon black tea'),(40,'Mint Iced Tea',14,10,180,7,'Cool mint iced tea using Sri Lankan black tea'),(41,'Sweetened Iced Tea',12,10,240,7,'Classic sweetened iced tea brewed from Ceylon tea leaves'),(42,'Green Iced Tea',13,10,210,7,'Light and refreshing iced tea made from Ceylon green tea'),(43,'Mango Fruit Tea',16,20,160,8,'Tropical fruit tea blend featuring Sri Lankan mango'),(44,'Pineapple Fruit Tea',17,20,140,8,'Pineapple-infused fruit tea made with Ceylon black tea'),(45,'Passion Fruit Tea',18,20,130,8,'Exotic passion fruit tea with a Ceylon black tea base'),(46,'Apple Cinnamon Fruit Tea',19,20,120,8,'Warm apple and cinnamon tea using Sri Lankan black tea'),(47,'Hibiscus Fruit Tea',17,20,150,8,'Fruity and tart hibiscus tea blended with Ceylon tea'),(48,'Berry Blend Fruit Tea',20,20,110,8,'A mix of berries blended with Ceylon black tea'),(49,'Loose Leaf BOP',15,25,300,9,'Premium broken orange pekoe Ceylon black tea in loose leaf form'),(50,'Loose Leaf Green Tea',18,25,250,9,'Fresh Ceylon green tea available as loose leaves'),(51,'Loose Leaf White Tea',28,10,90,9,'Delicate Ceylon white tea in loose leaf form'),(52,'Loose Leaf Earl Grey',22,25,200,9,'Bergamot-flavored Earl Grey tea in loose leaf form'),(53,'Loose Leaf Oolong',26,20,150,9,'Smooth and aromatic Ceylon oolong tea'),(54,'Loose Leaf Ceylon Breakfast Tea',14,25,280,9,'Rich and bold loose leaf black tea for breakfast'),(55,'Clay Teapot',25,50,150,10,'Traditional Sri Lankan clay teapot for brewing tea'),(56,'Wooden Tea Strainer',12,150,300,10,'Handcrafted wooden tea strainer for loose leaf tea'),(57,'Ceramic Tea Cups',15,60,200,10,'Set of 6 ceramic tea cups made in Sri Lanka'),(58,'Copper Tea Kettle',30,40,100,10,'Locally crafted copper tea kettle for boiling water'),(59,'Bamboo Tea Whisk',10,60,250,10,'Natural bamboo whisk for preparing matcha and loose leaf teas'),(60,'Tea Storage Canister',18,100,300,10,'Air-tight storage canister made from natural materials in Sri Lanka');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 12:20:15
