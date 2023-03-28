CREATE DATABASE meal_sharing;
USE meal_sharing;

-- All this code has been formated with codebeautify
-- Creating meal table
CREATE TABLE `Meal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `title` VARCHAR(255) NOT NULL, 
  `description` TEXT NOT NULL,
  `location` VARCHAR(255) NOT NULL, 
  `when` DATETIME NOT NULL, 
  `max_reservations` int(50) NOT NULL, 
  `price` DECIMAL (10, 2) NOT NULL, 
  `created_date` DATETIME NOT NULL 
  );

-- Adding data into tables
INSERT INTO Meal (
  `id`, `title`, `description`, `location`, 
  `when`, `max_reservations`, `price`, 
  `created_date`
) 
VALUES 
  (
    1, 'Italian Dinner', 'Delicious homemade carbonara', 
    'Corso Leoniero, 30, 15057 Tortona AL, Italy', 
    '2023-03-20', 10, 50.00, NOW()
  );
VALUES 
  (
    2, 'Mexican Lunch', 'Spicy tacos', 
    'Jardines del Desierto, 33749 Camargo, Chihuahua, Mexico', 
    '2023-03-22', 5, 25.00, NOW()
  );
VALUES 
  (
    3, 'Argentinian Lunch', 'Traditional asado (BBQ), empanadas and fernet', 
    'Mitre, S2000 Rosario, Santa Fe, Argentina', 
    '2023-03-25', 20, 100.00, NOW()
  );
VALUES 
  (
    4, 'American classic', 'Mc and cheese', 
    'Tryon, North Carolina 28016, USA', 
    '2023-03-30', 3, 100.00, NOW()
  );
  VALUES 
  (
    5, 'Argentinian asado', 'asado', 
    'bs as, callao 1280, Buenos Aires', 
    '2024-03-08', 3, 400.00, NOW()
  );

-- Add a new reservation
INSERT INTO Reservation (
  `id`, `title`, `number_of_guests`, 
  `meal_id`, `created _date`, `contact_phonenumber`, 
  `contact_name`, `contact_email`
) 
VALUES 
  (
    1, 'Birthday celebration', 15, 1, NOW(), 
    '55228591', 'Mercedes Ubeira', 'mercedes@example.com'
  );
-- Get a reservation with any id, fx 1:
SELECT 
  * 
FROM 
  Reservation 
WHERE 
  id = 1;
-- Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes:
UPDATE 
  Reservation 
SET 
  title = 'Surprise birthday celebration', 
  number_of_guests = 3 
WHERE 
  id = 1;
-- Delete a reservation with any id, fx 1:
DELETE FROM 
  Reservation 
WHERE 
  id = 1;
-- Queries for review table
-- Get all Reviews
SELECT 
  * 
FROM 
  Review;
-- Add a new review
INSERT INTO Review (
  `title`, `description`, `meal_id`, 
  `stars`
) 
VALUES 
  (
    'Delicious', 'Really good food and the hosts were super kind', 
    1, 5
  );
-- Get a review with any id, fx 1
SELECT 
  * 
FROM 
  Review 
WHERE 
  id = 1;
-- Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes:
UPDATE 
  Review 
SET 
  title = 'So much hygge!', 
  description = 'Incredible food with good hosts.' 
WHERE 
  id = 1;
-- Delete a review with any id, fx 1:
DELETE FROM 
  Review 
WHERE 
  id = 1;
-- Get meals that have a price smaller than a specific price (e.g. 90):
SELECT 
  * 
FROM 
  Meal 
WHERE 
  price < 90;
-- Get meals that still have available reservations:
SELECT 
  * 
FROM 
  Meal 
WHERE 
  max_reservations > (
    SELECT 
      COUNT(*) 
    FROM 
      Reservation 
    WHERE 
      Reservation.meal_id = Meal.id
  );
-- Get meals that partially match a title. (e.g. "Rød grød med" will match the meal with the title "Rød grød med fløde"):
SELECT 
  * 
FROM 
  Meal 
WHERE 
  title LIKE '%Rød grød med%';
-- Get meals that have been created between two dates (e.g. between '2022-01-01' and '2022-12-31'):
SELECT 
  * 
FROM 
  Meal 
WHERE 
  created_date BETWEEN '2022-01-01' 
  AND '2022-12-31';
-- Get a specific number of meals (e.g. only return 5 meals):
SELECT 
  * 
FROM 
  Meal 
LIMIT 
  5;
-- Get meals that have good reviews (e.g. average number of stars is greater than 4):
SELECT 
  Meal.*, 
  AVG(Review.stars) AS avg_stars 
FROM 
  Meal 
  INNER JOIN Review ON Meal.id = Review.meal_id 
GROUP BY 
  Meal.id;
HAVING 
  AVG (Review.stars) > 4;

 -- Get reservations for a specific meal sorted by created_date (e.g. for meal with id 1):
SELECT 
  * 
FROM 
  Reservation 
WHERE 
  meal_id = 1 
ORDER BY 
  created_date;
-- Sort all meals by average number of stars in the reviews:
SELECT 
  Meal.*, 
  AVG(Review.stars) AS avg_stars 
FROM 
  Meal 
  JOIN Review ON Meal.id = Review.meal_id 
GROUP BY 
  Meal.id 
ORDER BY 
  avg_stars DESC;

