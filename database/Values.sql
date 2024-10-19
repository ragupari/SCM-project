INSERT INTO Customers (Username, FullName, Address, City, Password, Email, Img) VALUES 
('user01','User01','7 Fife Road','Colombo','$2b$10$CUVP0r3PdSzeeTScU8sfwOFXhyFZvCyPQkB0T7Hd5BasZbgtMCr8u','user01@example.com',NULL),
('user02','User02','342/344, KOTTE ROAD','Pita-kotte','$2b$10$aiZAX7RytzurRVLdQmjY3e9q6g1kKWEHTII9LTe1CJi9cU/MvjS3a','user02@example.com',NULL),
('user03','User03','St. Josheps Street','Negombo', '$2b$10$JQ9r8CvOmKL/cVGpGd6yWulby9GXkjhv8i0CwtvY38O7QW35ZYdPu','user03@example.com',NULL),
('user04','User04','512/21, Colombo Road','Kurana','$2b$10$ir2tDSj6SZHoErPYztzbd.NZ//JU1/t/XTaSux305qN4N7OOFffn6','user04@example.com',NULL),
('user05','User05','Wackwella Road','Galle','$2b$10$Y3ulSKUDaXVd2n.VvOvEieHKQzcNfunEDSC2jiiCZTFkO..xLdgb2','user05@example.com',NULL),
('user06','User06','284A, Galle Road','Boossa','$2b$10$CIFD2Ut5Wdefk39ug64mcOE7vwv8AFNVGPKD4H4HCWo3EU6rfHbiK','user06@example.com',NULL),
('user07','User07','9, Sri Vijaya Building, Rahula Road','Matara','$2b$10$0T6.icAq.HWDJGhz7X28LeAvyM.GJcDs8J2RHO3jqK8nwfx36IsUy','user07@example.com',NULL),
('user08','User08','26 A, Post Office Road','Trincomalee','$2b$10$UXzVwzyN/DqYb0q0o9BCee/MPE4KbssqGmOSbK3XB84rGoj0JYtR6','user08@example.com',NULL),
('user09','User09','37, Mahatma Gandhi Road','Jaffna','$2b$10$Uc/tuD60xNXWnHP6HHHiuOapEQENng2jTjufonVRf8J9g5fr1cZsu','user09@example.com',NULL),
('user10','User10','No 29 Brown Road','Kokuvil East','$2b$10$yJocsR/3c3gxBBUFqJksk.rGW8Az88TU8bqFJOAN8ZG9N8pr.0iOW','user10@example.com',NULL);
-- username and password are same

INSERT INTO Stores (StoreID, City, ContactNumber) VALUES
(1, 'Colombo', 0115352748),
(2, 'Negombo', 031222227),
(3, 'Galle', 0912234593),
(4, 'Matara', 0412222235),
(5, 'Jaffna', 0212218107),
(6, 'Trinco', 0262222235),
(7, 'Main-Kandy', 0812222275);


INSERT INTO StoreManagers (StoreID, FullName, Username, Password, Email) VALUES 
(1,'Manager01','manager01','$2b$10$6b00mP7TNjCa3U1Vpc2d8.3Xn7yCqxND45dDTdlbSNoB93WcB39Ma','manager01@example.com'),
(2,'Manager02','manager02','$2b$10$07yluG.z8NXjtb1bxmsB0.FArO5O9bAcWPqUMtctqv87bJ8HKKuAK','manager02@example.com'),
(3,'Manager03','manager03','$2b$10$F0qlCyfHcOvd8wwKoJuSZ.fCgPWGDnANwjWPwJzK7aywhXAYSQ1/K','manager03@example.com'),
(4,'Manager04','manager04','$2b$10$RZCeIWNKg4uYYYXr2wqwce7GhEon/ov08ymkYvEJohex7nlAMQPmK','manager04@example.com'),
(5,'Manager05','manager05','$2b$10$T3AdSfiYDFwmFlzar9yWU.AabxhtI65r6cJGuJX7VKQlKppbZ.CLK','manager05@example.com'),
(6,'Manager06','manager06','$2b$10$UzvSHs.Ii03oA0w0Jj8DGev3j6td.6MHBWZuXvnSkaynaVEPxX4LK','manager06@example.com'),
(7,'Admin', 'admin', '$2b$10$yaPB.IllQmLdmF6pfMEWdeYdvgiGdxt/evQfUl/whh9powdt0KRyu', 'admin@examole.com');
-- username and password are same

INSERT INTO ProductCategories (CategoryID, CategoryName, Description) VALUES
(1, 'Black Tea', 'Traditional black tea grown and processed in the highlands of Sri Lanka, offering a rich, robust flavor'),
(2, 'Green Tea', 'Green tea cultivated in Sri Lanka, known for its fresh and slightly grassy taste'),
(3, 'Herbal Tea', 'A variety of herbal teas made from locally sourced herbs and flowers native to Sri Lanka'),
(4, 'Flavored Tea', 'Black and green teas infused with natural Sri Lankan flavors like cinnamon, vanilla, and cardamom'),
(5, 'White Tea', 'Exquisite white tea, handpicked and minimally processed in Sri Lanka for a delicate flavor'),
(6, 'Organic Tea', 'Certified organic tea grown in Sri Lanka without the use of synthetic fertilizers or pesticides'),
(7, 'Iced Tea', 'Specially blended teas designed for making iced tea, using Ceylon black and green tea leaves'),
(8, 'Fruit Tea', 'Fruit-infused teas featuring Sri Lankan fruits such as mango, pineapple, and passion fruit'),
(9, 'Loose Leaf Tea', 'Premium loose leaf teas from Sri Lanka, including black, green, and white tea varieties'),
(10, 'Tea Accessories', 'Locally made accessories for tea preparation and consumption, such as clay teapots and wooden tea strainers');

INSERT INTO Routes (StoreID, Destination, TimeforCompletion, MainTowns) VALUES
-- Closest cities to Colombo (StoreID 1)
(1, 'Colombo', '00:30:00', 'N/A'),
(1, 'Maradana', '00:20:00', 'Pettah'),
(1, 'Dehiwala', '00:50:00', 'Wellawatte, Mount Lavinia'),
(1, 'Malabe', '01:00:00', 'Rajagiriya, Kaduwela'),
(1, 'Battaramulla', '00:50:00', 'Rajagiriya'),
(1, 'Nugegoda', '00:50:00', 'Kirulapone, Nawala'),

-- Closest cities to Negombo (StoreID 2)
(2, 'Negombo', '01:00:00', 'N/A'),
(2, 'Minuwangoda', '00:30:00', 'Ja-Ela'),
(2, 'Katunayake', '00:20:00', 'Seeduwa'),
(2, 'Kadana', '01:00:00', 'Ja-Ela, Ragama'),
(2, 'Seeduwa', '00:30:00', 'Katunayake'),
(2, 'Gampaha', '01:40:00', 'Ja-Ela, Ragama'),

-- Closest cities to Galle (StoreID 3)
(3, 'Galle', '00:30:00', 'N/A'),
(3, 'Hikkaduwa', '01:10:00', 'Dodanduwa'),
(3, 'Koggala', '01:00:00', 'Habaraduwa'),
(3, 'Unawatuna', '00:30:00', 'N/A'),
(3, 'Bentota', '01:10:00', 'Ambalangoda, Balapitiya'),
(3, 'Baddegama', '01:45:00', 'Imaduwa'),

-- Closest cities to Matara (StoreID 4)
(4, 'Matara', '00:30:00', 'N/A'),
(4, 'Tangalle', '01:00:00', 'Dickwella'),
(4, 'Weligama', '00:20:00', 'N/A'),
(4, 'Mirissa', '01:30:00', 'Weligama'),
(4, 'Panaduwa', '01:00:00', 'Hakmana'),
(4, 'Devinuwara', '01:45:00', 'Dickwella'),

-- Closest cities to Jaffna (StoreID 5)
(5, 'Jaffna', '00:30:00', 'N/A'),
(5, 'Kayts', '01:30:00', 'Velanai'),
(5, 'Point Pedro', '00:40:00', 'Nelliyadi'),
(5, 'Kodikamam', '02:00:00', 'Chavakacheri'),
(5, 'Chavakachcheri', '00:20:00', 'N/A'),
(5, 'Pooneryn', '02:30:00', 'Paranthan'),

-- Closest cities to Trincomalee (StoreID 6)
(6, 'Trinco', '00:30:00', 'N/A'),
(6, 'Kinniya', '00:20:00', 'N/A'),
(6, 'Pulmoddai', '01:00:00', 'Kuchchaveli'),
(6, 'Nilaveli', '01:20:00', 'Kuchchaveli'),
(6, 'Batticaloa', '02:00:00', 'Kantale, Valaichchenai'),
(6, 'Mutur', '00:40:00', 'N/A');

INSERT INTO Products (ProductID, ProductName, UnitPrice, CapacityPerUnit, AvailableStock, CategoryID, Description) VALUES
-- Ceylon Black Tea Products
(1, 'Breakfast Tea', 12, 25, 500, 1, 'Strong, full-bodied Ceylon black tea perfect for morning consumption'),
(2, 'High Grown BOP', 15, 20, 300, 1, 'Broken Orange Pekoe black tea from Sri Lanka’s highlands'),
(3, 'Earl Grey', 14, 25, 400, 1, 'Ceylon black tea with natural bergamot flavoring'),
(4, 'Low Grown OP', 13, 20, 350, 1, 'Orange Pekoe black tea from Sri Lanka’s lowland regions'),
(5, 'Ceylon BOPF', 10, 20, 450, 1, 'Broken Orange Pekoe Fannings, offering a brisk and bold taste'),
(6, 'Ceylon Souchong', 16, 25, 300, 1, 'Unique smoked black tea with a rich, smoky aroma'),

-- Ceylon Green Tea Products
(7, 'Gunpowder Green Tea', 18, 25, 200, 2, 'Rolled Ceylon green tea leaves with a fresh, bold flavor'),
(8, 'Jasmine Green Tea', 20, 25, 180, 2, 'Green tea scented with natural jasmine flowers from Sri Lanka'),
(9, 'Sencha Green Tea', 22, 20, 150, 2, 'Japanese-style Sencha tea grown in Sri Lanka'),
(10, 'Green Pekoe', 19, 250, 22, 2, 'Light and grassy Ceylon green tea with a smooth finish'),
(11, 'Lemon Green Tea', 18, 20, 230, 2, 'Green tea infused with lemon for a zesty flavor'),
(12, 'Mint Green Tea', 17, 20, 240, 2, 'Refreshing mint-infused Ceylon green tea'),

-- Ceylon Herbal Tea Products
(13, 'Chamomile Tea', 16, 20, 150, 3, 'Relaxing herbal tea made from Sri Lankan-grown chamomile flowers'),
(14, 'Lemongrass Tea', 14, 20, 180, 3, 'Zesty lemongrass herbal tea from the Sri Lankan lowlands'),
(15, 'Cinnamon Herbal Tea', 18, 25, 200, 3, 'Cinnamon-infused herbal tea with natural Sri Lankan cinnamon'),
(16, 'Turmeric Ginger Tea', 20, 25, 140, 3, 'A spicy blend of turmeric and ginger grown in Sri Lanka'),
(17, 'Peppermint Herbal Tea', 15, 20, 160, 3, 'Cool and refreshing peppermint herbal tea from Sri Lanka'),
(18, 'Hibiscus Herbal Tea', 18, 20, 120, 3, 'Tart hibiscus tea sourced from local Sri Lankan farms'),

-- Ceylon Flavored Tea Products
(19, 'Vanilla Black Tea', 19, 25, 300, 4, 'Rich Ceylon black tea with a hint of vanilla flavor'),
(20, 'Cinnamon Black Tea', 18, 25, 250, 4, 'Black tea infused with natural Sri Lankan cinnamon'),
(21, 'Cardamom Green Tea', 20, 20, 220, 4, 'Ceylon green tea with aromatic cardamom flavor'),
(22, 'Rose Black Tea', 21, 25, 200, 4, 'Floral black tea with natural rose petals from Sri Lanka'),
(23, 'Lemon Black Tea', 17, 25, 260, 4, 'Black tea infused with natural lemon essence'),
(24, 'Ginger Green Tea', 19, 20, 240, 4, 'Zesty green tea blended with Sri Lankan ginger'),

-- Ceylon White Tea Products
(25, 'Silver Tips White Tea', 30, 10, 120, 5, 'Premium hand-picked white tea with delicate silver tips'),
(26, 'Golden Tips White Tea', 32, 10, 100, 5, 'Rare and exclusive golden tips white tea from Sri Lanka'),
(27, 'Peony White Tea', 28, 15, 90, 5, 'A subtle, floral white tea with notes of peony'),
(28, 'White Needle Tea', 29, 10, 110, 5, 'Finely crafted white tea with needle-like leaves'),
(29, 'Jasmine White Tea', 31, 10, 130, 5, 'Delicate white tea infused with jasmine flowers'),
(30, 'Organic White Tea', 35, 10, 80, 5, 'Hand-picked organic white tea from the highlands of Sri Lanka'),

-- Ceylon Organic Tea Products
(31, 'Organic Black Tea', 20, 25, 250, 6, 'Organically grown black tea from certified farms in Sri Lanka'),
(32, 'Organic Green Tea', 22, 20, 200, 6, 'Fresh organic green tea grown without pesticides'),
(33, 'Organic Chamomile Tea', 18, 20, 180, 6, 'Soothing chamomile tea from organic Sri Lankan farms'),
(34, 'Organic Cinnamon Tea', 19, 20, 160, 6, 'Organic black tea blended with Sri Lankan cinnamon'),
(35, 'Organic White Tea', 28, 10, 120, 6, 'Exquisite white tea from organic highland farms'),
(36, 'Organic Lemongrass Tea', 17, 20, 200, 6, 'Organic lemongrass tea with a fresh, citrusy flavor'),

-- Ceylon Iced Tea Products
(37, 'Peach Iced Tea', 14, 10, 220, 7, 'Fruity peach-flavored iced tea from Ceylon black tea'),
(38, 'Lemon Iced Tea', 12, 15, 230, 7, 'Refreshing lemon-flavored iced tea using Ceylon tea'),
(39, 'Raspberry Iced Tea', 15, 10, 200, 7, 'Fruity raspberry iced tea made with Ceylon black tea'),
(40, 'Mint Iced Tea', 14, 10, 180, 7, 'Cool mint iced tea using Sri Lankan black tea'),
(41, 'Sweetened Iced Tea', 12, 10, 240, 7, 'Classic sweetened iced tea brewed from Ceylon tea leaves'),
(42, 'Green Iced Tea', 13, 10, 210, 7, 'Light and refreshing iced tea made from Ceylon green tea'),

-- Ceylon Fruit Tea Products
(43, 'Mango Fruit Tea', 16, 20, 160, 8, 'Tropical fruit tea blend featuring Sri Lankan mango'),
(44, 'Pineapple Fruit Tea', 17, 20, 140, 8, 'Pineapple-infused fruit tea made with Ceylon black tea'),
(45, 'Passion Fruit Tea', 18, 20, 130, 8, 'Exotic passion fruit tea with a Ceylon black tea base'),
(46, 'Apple Cinnamon Fruit Tea', 19, 20, 120, 8, 'Warm apple and cinnamon tea using Sri Lankan black tea'),
(47, 'Hibiscus Fruit Tea', 17, 20, 150, 8, 'Fruity and tart hibiscus tea blended with Ceylon tea'),
(48, 'Berry Blend Fruit Tea', 20, 20, 110, 8, 'A mix of berries blended with Ceylon black tea'),

-- Ceylon Loose Leaf Tea Products
(49, 'Loose Leaf BOP', 15, 25, 300, 9, 'Premium broken orange pekoe Ceylon black tea in loose leaf form'),
(50, 'Loose Leaf Green Tea', 18, 25, 250, 9, 'Fresh Ceylon green tea available as loose leaves'),
(51, 'Loose Leaf White Tea', 28, 10, 90, 9, 'Delicate Ceylon white tea in loose leaf form'),
(52, 'Loose Leaf Earl Grey', 22, 25, 200, 9, 'Bergamot-flavored Earl Grey tea in loose leaf form'),
(53, 'Loose Leaf Oolong', 26, 20, 150, 9, 'Smooth and aromatic Ceylon oolong tea'),
(54, 'Loose Leaf Ceylon Breakfast Tea', 14, 25, 280, 9, 'Rich and bold loose leaf black tea for breakfast'),

-- Ceylon Tea Accessories Products
(55, 'Clay Teapot', 25, 200, 150, 10, 'Traditional Sri Lankan clay teapot for brewing tea'),
(56, 'Wooden Tea Strainer', 12, 450, 300, 10, 'Handcrafted wooden tea strainer for loose leaf tea'),
(57, 'Ceramic Tea Cups', 15, 250, 200, 10, 'Set of 6 ceramic tea cups made in Sri Lanka'),
(58, 'Copper Tea Kettle', 30, 300, 100, 10, 'Locally crafted copper tea kettle for boiling water'),
(59, 'Bamboo Tea Whisk', 10, 100, 250, 10, 'Natural bamboo whisk for preparing matcha and loose leaf teas'),
(60, 'Tea Storage Canister', 18, 150, 300, 10, 'Air-tight storage canister made from natural materials in Sri Lanka');

INSERT INTO Drivers (StoreID, Name, EmploymentStatus) VALUES 
(1, 'John Smith', 'PresentEmployer'), (1, 'Emma Johnson', 'PresentEmployer'), (1, 'Michael Brown', 'PresentEmployer'), (1, 'Sophia Davis', 'PresentEmployer'),
(2, 'William Wilson', 'PresentEmployer'), (2, 'Olivia Martinez', 'PresentEmployer'), (2, 'James Anderson', 'PresentEmployer'), (2, 'Ava Taylor', 'PresentEmployer'),
(3, 'Robert Thomas', 'PresentEmployer'), (3, 'Isabella Garcia', 'PresentEmployer'), (3, 'David Rodriguez', 'PresentEmployer'), (3, 'Mia Lopez', 'PresentEmployer'),
(4, 'Joseph Lee', 'PresentEmployer'), (4, 'Charlotte Hernandez', 'PresentEmployer'), (4, 'Daniel Gonzalez', 'PresentEmployer'), (4, 'Amelia Perez', 'PresentEmployer'),
(5, 'Christopher Clark', 'PresentEmployer'), (5, 'Harper Lewis', 'PresentEmployer'), (5, 'Matthew Hall', 'PresentEmployer'), (5, 'Evelyn Scott', 'PresentEmployer'),
(6, 'Andrew Young', 'PresentEmployer'), (6, 'Abigail King', 'PresentEmployer'), (6, 'Ethan Wright', 'PresentEmployer'), (6, 'Emily Green', 'PresentEmployer');

INSERT INTO DrivingAssistants (StoreID, Name, EmploymentStatus) VALUES 
(1, 'Alice Cooper', 'PresentEmployer'), (1, 'Benjamin Foster', 'PresentEmployer'), (1, 'Catherine Patel', 'PresentEmployer'), (1, 'Derek Chang', 'PresentEmployer'),
(2, 'Evelyn Morales', 'PresentEmployer'), (2, 'Felix Nguyen', 'PresentEmployer'), (2, 'Grace O''Brien', 'PresentEmployer'), (2, 'Henry Kim', 'PresentEmployer'),
(3, 'Isabelle Wong', 'PresentEmployer'), (3, 'Jack Thompson', 'PresentEmployer'), (3, 'Karen Gupta', 'PresentEmployer'), (3, 'Liam Murphy', 'PresentEmployer'),
(4, 'Monica Singh', 'PresentEmployer'), (4, 'Nathan Chow', 'PresentEmployer'), (4, 'Olivia Rossi', 'PresentEmployer'), (4, 'Patrick Okafor', 'PresentEmployer'),
(5, 'Quinn Larsson', 'PresentEmployer'), (5, 'Rachel Sanchez', 'PresentEmployer'), (5, 'Samuel Bianchi', 'PresentEmployer'), (5, 'Tara McLean', 'PresentEmployer'),
(6, 'Uma Patel', 'PresentEmployer'), (6, 'Victor Kowalski', 'PresentEmployer'), (6, 'Wendy Tanaka', 'PresentEmployer'), (6, 'Xavier Dubois', 'PresentEmployer');

INSERT INTO Trucks (Capacity, StoreID) VALUES 
(500,1),(500,1),(500,1),(500,1),
(500,2),(500,2),(500,2),(500,2),
(500,3),(500,3),(500,3),(500,3),
(500,4),(500,4),(500,4),(500,4),
(500,5),(500,5),(500,5),(500,5),
(500,6),(500,6),(500,6),(500,6);

-- Generate Train Trips
CALL GenerateTrainSchedule('2024-10-01', '2024-11-30');
