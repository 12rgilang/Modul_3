CREATE DEFINER=`root`@`localhost` FUNCTION `get_total_room_booked_by_data_range`(
search_date_start DATETIME,
search_date_end DATETIME,
checkin DATETIME,
checkout DATETIME,
room_id_on_t INT,
total_room_on_t INT
) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE room_id INT;
    DECLARE total_room INT;
    WHILE search_date_start < search_date_end DO 
		IF(search_date_start >= checkin AND search_date_start < checkout)
			THEN
				SET room_id = room_id_on_t;
                SET total_room = total_room_on_t;
                END IF;
                SET search_date_start = DATE_ADD(search_date_start, INTERVAL 1 DAY);
	END WHILE;
RETURN (room_id);
END