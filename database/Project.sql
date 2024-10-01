-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 02, 2024 at 05:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Project`
-- Host: 'localhost'
-- User: 'root'
-- Password: ''

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_ID` int(11) NOT NULL,
  `fullName` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_ID`, `fullName`, `email`, `username`, `password`) VALUES
(4, 'Paris', 'qwert@gma.co', '12321', '$2b$10$u2WUJ/8hgijG3oaRrWmlluJMRV3WYqEqOQ4TA6HsuJ6daDgv4fdGG');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_ID` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `category_ID` int(11) NOT NULL,
  `available` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_ID`, `product_name`, `unit_price`, `category_ID`, `available`) VALUES
(1, 'Smartphone', 300, 3, 50),
(2, 'Laptop', 800, 3, 30),
(3, 'Wireless Headphones', 130, 3, 40),
(4, 'Novel', 20, 4, 100),
(5, 'Textbook', 60, 4, 20),
(6, 'Men\'s T-Shirt', 16, 5, 60),
(7, 'Women\'s Dress', 50, 5, 25),
(8, 'Coffee Maker', 90, 6, 35),
(9, 'Microwave Oven', 120, 6, 20),
(10, 'Skincare Serum', 30, 7, 45),
(11, 'Running Shoes', 80, 8, 55),
(12, 'Yoga Mat', 25, 8, 70),
(13, 'Building Blocks', 15, 9, 80),
(14, 'Board Game', 35, 9, 25),
(15, 'Car Battery', 90, 10, 15),
(16, 'Oil Change Kit', 40, 10, 25),
(17, 'Organic Apples', 4, 11, 150),
(18, 'Whole Grain Bread', 2, 11, 100),
(19, 'Dog Food', 23, 12, 50),
(20, 'Cat Toy', 8, 12, 75),
(21, 'Tablet', 250, 3, 40),
(22, 'Camera', 500, 3, 25),
(23, 'Biography', 25, 4, 60),
(24, 'Cookbook', 30, 4, 40),
(25, 'Children\'s Jacket', 36, 5, 50),
(26, 'Blender', 55, 6, 20),
(27, 'Toaster', 30, 6, 45),
(28, 'Body Lotion', 13, 7, 55),
(29, 'Face Mask', 20, 7, 40),
(30, 'Camping Tent', 150, 8, 15),
(31, 'Fishing Rod', 90, 8, 20),
(32, 'Puzzle', 17, 9, 70),
(33, 'Action Figure', 23, 9, 60),
(34, 'Car Seat Cover', 30, 10, 30),
(35, 'Dashboard Camera', 80, 10, 10),
(36, 'Milk', 2, 11, 200),
(37, 'Cheese', 4, 11, 150),
(38, 'Bird Cage', 60, 12, 20),
(39, 'Cat Bed', 40, 12, 35),
(40, 'Smartwatch', 200, 3, 45),
(41, 'E-Reader', 130, 3, 35),
(42, 'History Book', 35, 4, 50),
(43, 'Science Fiction Novel', 28, 4, 70),
(44, 'Women\'s Sneakers', 60, 5, 30),
(45, 'Men\'s Suit', 150, 5, 15),
(46, 'Air Fryer', 100, 6, 25),
(47, 'Dishwasher', 400, 6, 10),
(48, 'Hand Cream', 9, 7, 65),
(49, 'Hair Dryer', 40, 7, 30),
(50, 'Mountain Bike', 500, 8, 20),
(51, 'Ski Equipment', 300, 8, 15),
(52, 'Doll', 25, 9, 40),
(53, 'Building Set', 50, 9, 35),
(54, 'Tool Kit', 90, 10, 20),
(55, 'Car Vacuum Cleaner', 40, 10, 25),
(56, 'Pasta', 3, 11, 180),
(57, 'Juice', 3, 11, 160),
(58, 'Fish Tank', 100, 12, 15),
(59, 'Pet Carrier', 50, 12, 25),
(60, 'Drone', 300, 3, 20),
(61, 'Smart Home Device', 150, 3, 30),
(62, 'Cookware Set', 130, 6, 15),
(63, 'Cutlery Set', 50, 6, 25),
(64, 'Nail Polish', 9, 7, 70),
(65, 'Lip Balm', 4, 7, 80),
(66, 'Hiking Boots', 90, 8, 20),
(67, 'Snowboard', 200, 8, 15),
(68, 'Action Camera', 150, 3, 25),
(69, 'Digital Frame', 80, 3, 40),
(70, 'Children\'s Encyclopedia', 40, 4, 45),
(71, 'Cookbook for Kids', 25, 4, 55),
(72, 'Men\'s Jacket', 90, 5, 25),
(73, 'Women\'s Scarf', 20, 5, 35),
(74, 'Espresso Machine', 250, 6, 15),
(75, 'Rice Cooker', 50, 6, 30),
(76, 'Foot Cream', 13, 7, 45),
(77, 'Shampoo', 9, 7, 50),
(78, 'Tennis Racket', 90, 8, 10),
(79, 'Golf Club', 150, 8, 10),
(80, 'Toy Train Set', 90, 9, 50);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `category_ID` int(150) NOT NULL,
  `category_name` varchar(150) NOT NULL,
  `category_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_ID`, `category_name`, `category_description`) VALUES
(3, 'Electronics', 'Devices, gadgets, and accessories.'),
(4, 'Books', 'Fiction, non-fiction, and educational materials.'),
(5, 'Clothing', 'Apparel for men, women, and children.'),
(6, 'Home & Kitchen', 'Furniture, appliances, and kitchenware.'),
(7, 'Beauty & Health', 'Cosmetics, skincare, and wellness products.'),
(8, 'Sports & Outdoors', 'Equipment and apparel for outdoor activities.'),
(9, 'Toys & Games', 'Children’s toys, games, and educational kits.'),
(10, 'Automotive', 'Car parts, accessories, and tools.'),
(11, 'Groceries', 'Food items, beverages, and household essentials.'),
(12, 'Pet Supplies', 'Products for pets, including food, toys, and care items.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_ID`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`category_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `category_ID` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
