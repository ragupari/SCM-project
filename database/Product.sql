INSERT INTO products (product_ID, product_name, unit_price, CapacityPerUnit, available, category_ID, Description) VALUES
-- Green Tea Products
(1, 'Matcha Powder', 15, 50, 100, 1, 'Premium ceremonial-grade matcha powder'),
(2, 'Sencha Green Tea', 10, 100, 80, 1, 'Traditional Japanese green tea leaves'),
(3, 'Jasmine Green Tea', 12, 80, 120, 1, 'Fragrant green tea infused with jasmine flowers'),
(4, 'Gunpowder Green Tea', 9, 100, 60, 1, 'Chinese green tea known for its rolled pellet shape'),
(5, 'Dragon Well Green Tea', 18, 50, 40, 1, 'High-quality Longjing green tea with a sweet flavor'),
(6, 'Genmaicha Green Tea', 11, 100, 50, 1, 'Green tea mixed with roasted rice'),

-- Black Tea Products
(7, 'Earl Grey Black Tea', 10, 100, 90, 2, 'Black tea flavored with bergamot oil'),
(8, 'English Breakfast Tea', 8, 100, 150, 2, 'A robust and full-bodied black tea blend'),
(9, 'Darjeeling Black Tea', 14, 50, 60, 2, 'Aromatic black tea from the Darjeeling region of India'),
(10, 'Assam Black Tea', 12, 100, 70, 2, 'Strong and malty black tea from Assam, India'),
(11, 'Ceylon Black Tea', 13, 80, 80, 2, 'Bright and citrusy black tea from Sri Lanka'),
(12, 'Lapsang Souchong', 16, 50, 40, 2, 'Smoky black tea from the Fujian province of China'),

-- Herbal Tea Products
(13, 'Chamomile Herbal Tea', 9, 80, 120, 3, 'Soothing and caffeine-free chamomile flower tea'),
(14, 'Peppermint Herbal Tea', 8, 100, 130, 3, 'Refreshing and invigorating peppermint leaf tea'),
(15, 'Rooibos Herbal Tea', 11, 100, 90, 3, 'South African red bush tea with antioxidant properties'),
(16, 'Lemon Balm Herbal Tea', 7, 80, 110, 3, 'Mild lemon-flavored herbal tea for relaxation'),
(17, 'Hibiscus Herbal Tea', 10, 100, 100, 3, 'Tart and fruity hibiscus flower tea'),
(18, 'Ginger Herbal Tea', 9, 100, 80, 3, 'Spicy ginger root tea with digestive benefits'),

-- Oolong Tea Products
(19, 'Tie Guan Yin Oolong Tea', 18, 50, 50, 4, 'Premium Chinese oolong tea with floral notes'),
(20, 'Da Hong Pao Oolong Tea', 22, 50, 30, 4, 'Legendary Wuyi Mountain rock oolong tea'),
(21, 'Milk Oolong Tea', 20, 50, 40, 4, 'Creamy and smooth oolong tea with a milky aroma'),
(22, 'Oriental Beauty Oolong Tea', 17, 50, 60, 4, 'Taiwanese oolong with a fruity, honeyed flavor'),
(23, 'Phoenix Dan Cong Oolong Tea', 19, 50, 50, 4, 'Single-origin oolong tea with complex floral notes'),
(24, 'Shui Xian Oolong Tea', 16, 50, 40, 4, 'Chinese oolong tea with a sweet and roasted flavor'),

-- White Tea Products
(25, 'Silver Needle White Tea', 25, 50, 30, 5, 'Delicate white tea made from young buds'),
(26, 'White Peony Tea', 18, 50, 40, 5, 'Light and floral white tea with young leaves and buds'),
(27, 'Darjeeling White Tea', 20, 50, 30, 5, 'Rare white tea from the Darjeeling region of India'),
(28, 'Moonlight White Tea', 22, 50, 20, 5, 'Unique white tea with a fruity and sweet profile'),
(29, 'Shou Mei White Tea', 15, 50, 50, 5, 'A stronger, more full-bodied white tea'),
(30, 'Ceylon Silver Tips White Tea', 24, 50, 20, 5, 'Luxury white tea from Sri Lanka'),

-- Chai Tea Products
(31, 'Masala Chai Tea', 10, 100, 100, 6, 'Spiced black tea with cinnamon, cardamom, and cloves'),
(32, 'Vanilla Chai Tea', 12, 100, 80, 6, 'Spiced chai tea with a hint of vanilla flavor'),
(33, 'Ginger Chai Tea', 11, 100, 90, 6, 'Spicy black tea infused with ginger'),
(34, 'Kashmiri Chai Tea', 14, 100, 60, 6, 'Green tea chai with cardamom and almonds'),
(35, 'Turmeric Chai Tea', 13, 100, 70, 6, 'Chai tea blend with earthy turmeric notes'),
(36, 'Cardamom Chai Tea', 11, 100, 100, 6, 'Chai tea blend with rich cardamom spice'),

-- Iced Tea Products
(37, 'Peach Iced Tea', 8, 1000, 200, 7, 'Refreshing peach-flavored iced tea'),
(38, 'Lemon Iced Tea', 7, 1000, 250, 7, 'Citrusy lemon-flavored iced tea'),
(39, 'Raspberry Iced Tea', 8, 1000, 180, 7, 'Sweet raspberry-flavored iced tea'),
(40, 'Green Iced Tea', 9, 1000, 150, 7, 'Light and refreshing green tea brewed for iced tea'),
(41, 'Sweetened Black Iced Tea', 7, 1000, 200, 7, 'Classic black tea iced and sweetened'),
(42, 'Mint Iced Tea', 9, 1000, 170, 7, 'Cooling mint-flavored iced tea'),

-- Fruit Tea Products
(43, 'Hibiscus Fruit Tea', 9, 100, 150, 8, 'Tart hibiscus tea with a fruity flavor'),
(44, 'Apple Cinnamon Fruit Tea', 10, 100, 140, 8, 'Warm apple and cinnamon flavored fruit tea'),
(45, 'Berry Bliss Fruit Tea', 11, 100, 120, 8, 'A blend of mixed berries infused with tea'),
(46, 'Mango Passion Fruit Tea', 12, 100, 130, 8, 'Tropical tea blend with mango and passion fruit flavors'),
(47, 'Citrus Burst Fruit Tea', 10, 100, 160, 8, 'A zesty mix of orange, lemon, and lime flavors'),
(48, 'Pineapple Coconut Fruit Tea', 13, 100, 110, 8, 'Tropical blend of pineapple and coconut tea'),

-- Loose Leaf Tea Products
(49, 'Loose Leaf Assam Tea', 14, 250, 90, 9, 'Strong, malty Assam black tea in loose leaf form'),
(50, 'Loose Leaf Sencha Green Tea', 13, 250, 80, 9, 'Fresh Sencha green tea leaves for brewing'),
(51, 'Loose Leaf Chamomile Tea', 12, 200, 120, 9, 'Calming loose leaf chamomile flower tea'),
(52, 'Loose Leaf Darjeeling Tea', 16, 250, 60, 9, 'Aromatic Darjeeling tea in loose leaf form'),
(53, 'Loose Leaf Oolong Tea', 18, 200, 50, 9, 'Premium oolong tea available as loose leaves'),
(54, 'Loose Leaf Earl Grey Tea', 15, 250, 100, 9, 'Bergamot-flavored Earl Grey tea in loose leaf'),

-- Tea Accessories
(55, 'Glass Teapot with Infuser', 25, 1, 70, 10, 'Elegant glass teapot with a built-in infuser for loose leaf tea'),
(56, 'Stainless Steel Tea Strainer', 10, 1, 150, 10, 'Durable tea strainer for loose leaf tea brewing'),
(57, 'Ceramic Tea Mug', 12, 1, 200, 10, 'Handcrafted ceramic tea mug for hot tea'),
(58, 'Electric Kettle', 35, 1, 80, 10, 'Fast-boiling electric kettle for tea preparation'),
(59, 'Tea Storage Tin', 8, 1, 120, 10, 'Airtight tea tin for preserving loose leaf tea freshness'),
(60, 'Bamboo Tea Tray', 22, 1, 90, 10, 'Eco-friendly bamboo tray for serving tea');
