SELECT * FROM ;

-- GET TOTAL ROOMS EACH HOTEL
SELECT h.id, h.name, SUM(available_Room) as total_rooms FROM hotel h
JOIN room hr ON h.id = hr.hotel_id
GROUP BY h.id;

-- CREATE VARIABLE to TESTING
SET @searchIn = '2022-11-20 11:00:00', @searchOut = '2022-12-21 12:00:00';

-- CREATE VARIABLE to TESTING
SET @searchIn = '2022-11-20 11:00:00', @searchOut = '2022-12-21 12:00:00';

SELECT a.hotel_id, a.hotel_name, b.total_room_each_hotel, a.total_room_booked, b.total_room_each_hotel - a.total_room_booked as total_room_available
FROM 
(
SELECT h.id as hotel_id, h.name as hotel_name, r.name as room_name, IFNULL(SUM(get_total_room_booked_by_date_range(@searchIn,@searchOut,t.checkin,t.checkout,t.room_id,t.total_room)), 0) as total_room_booked
FROM transaction t
RIGHT JOIN room r ON r.id = t.room_id
JOIN hotel h ON h.id = r.hotel_id
GROUP BY h.id
) as a
CROSS JOIN
(
SELECT h.id as hotel_id, h.name, SUM(available_Room) as total_room_each_hotel FROM hotel h
JOIN room r ON h.id = r.hotel_id
GROUP BY h.id
) as b
ON a.hotel_id = b.hotel_id
GROUP BY a.hotel_id;

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- Hotels Details
SELECT h.id, h.name, h.location, GROUP_CONCAT(hi.url, '') as images FROM hotel h 
JOIN hotel_image hi ON h.id = hi.hotel.id
WHERE h.id = 1;

SET @seacrhIn = '2022-12-20 19:00:00', @searchOut = '2022-12-21 05:00:00';
SELECT r.id, r.name, r.price, GROUP_CONCAT(DISTINCT ri.image, '') as url,
r.available_Room, IFNULL(SUM(DISTINCT get_total_room_booked_by_date_range(@searchIn,
@searchOut, t.checkin, t.checkout, t.room_id, t.total_room)), 0) as total_rooms_booked,
r.available_Room - IFNULL(SUM(DISTINCT get_total_room_booked_by_date_range(@searchIn,
@searchOut, t.checkin, t.checkout, t.room_id, t.total_room)), 0) as total_rooms_available
FROM room r
LEFT JOIN transaction t ON t.room_id = r.id
JOIN room_image ri ON r.id = ri.room_id
WHERE r.hotel_id = 1
GROUP BY r.id
HAVING total_rooms_available > 0