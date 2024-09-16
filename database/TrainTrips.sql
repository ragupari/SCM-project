-- Day 1 (starting from the current date)
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 1 DAY + INTERVAL '06:00' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 1 DAY + INTERVAL '06:30' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 1 DAY + INTERVAL '07:00' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 1 DAY + INTERVAL '07:30' HOUR_SECOND, 4, 160), -- Matara
(NOW() + INTERVAL 1 DAY + INTERVAL '08:00' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 1 DAY + INTERVAL '08:30' HOUR_SECOND, 6, 170); -- Trincomalee

-- Day 2
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 2 DAY + INTERVAL '06:00' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 2 DAY + INTERVAL '06:45' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 2 DAY + INTERVAL '07:15' HOUR_SECOND, 4, 160), -- Matara
(NOW() + INTERVAL 2 DAY + INTERVAL '07:45' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 2 DAY + INTERVAL '08:15' HOUR_SECOND, 6, 170), -- Trincomalee
(NOW() + INTERVAL 2 DAY + INTERVAL '08:45' HOUR_SECOND, 5, 220); -- Jaffna

-- Day 3
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 3 DAY + INTERVAL '06:00' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 3 DAY + INTERVAL '06:30' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 3 DAY + INTERVAL '07:00' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 3 DAY + INTERVAL '07:30' HOUR_SECOND, 4, 160), -- Matara
(NOW() + INTERVAL 3 DAY + INTERVAL '08:00' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 3 DAY + INTERVAL '08:30' HOUR_SECOND, 6, 170); -- Trincomalee

-- Day 4
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 4 DAY + INTERVAL '06:00' HOUR_SECOND, 4, 160), -- Matara
(NOW() + INTERVAL 4 DAY + INTERVAL '06:45' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 4 DAY + INTERVAL '07:15' HOUR_SECOND, 6, 170), -- Trincomalee
(NOW() + INTERVAL 4 DAY + INTERVAL '07:45' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 4 DAY + INTERVAL '08:15' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 4 DAY + INTERVAL '08:45' HOUR_SECOND, 3, 180); -- Galle

-- Day 5
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 5 DAY + INTERVAL '06:00' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 5 DAY + INTERVAL '06:30' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 5 DAY + INTERVAL '07:00' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 5 DAY + INTERVAL '07:30' HOUR_SECOND, 6, 170), -- Trincomalee
(NOW() + INTERVAL 5 DAY + INTERVAL '08:00' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 5 DAY + INTERVAL '08:30' HOUR_SECOND, 4, 160); -- Matara

-- Day 6
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 6 DAY + INTERVAL '06:00' HOUR_SECOND, 6, 170), -- Trincomalee
(NOW() + INTERVAL 6 DAY + INTERVAL '06:30' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 6 DAY + INTERVAL '07:00' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 6 DAY + INTERVAL '07:30' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 6 DAY + INTERVAL '08:00' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 6 DAY + INTERVAL '08:30' HOUR_SECOND, 4, 160); -- Matara

-- Day 7
INSERT INTO TrainTrips (DepartureTime, Destination, AvailableCapacity) VALUES
(NOW() + INTERVAL 7 DAY + INTERVAL '06:00' HOUR_SECOND, 5, 220), -- Jaffna
(NOW() + INTERVAL 7 DAY + INTERVAL '06:30' HOUR_SECOND, 1, 200), -- Colombo
(NOW() + INTERVAL 7 DAY + INTERVAL '07:00' HOUR_SECOND, 2, 150), -- Negombo
(NOW() + INTERVAL 7 DAY + INTERVAL '07:30' HOUR_SECOND, 3, 180), -- Galle
(NOW() + INTERVAL 7 DAY + INTERVAL '08:00' HOUR_SECOND, 4, 160), -- Matara
(NOW() + INTERVAL 7 DAY + INTERVAL '08:30' HOUR_SECOND, 6, 170); -- Trincomalee