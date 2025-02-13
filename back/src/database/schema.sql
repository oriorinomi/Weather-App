-- Active: 1736414096214@@127.0.0.1@3306@weather_db
CREATE TABLE icons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL, 
  image_url VARCHAR(255) NOT NULL 
);

CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL, 
  min_temp DECIMAL(5) NOT NULL,
  max_temp DECIMAL(5) NOT NULL, 
  icon_id INT,
  FOREIGN KEY (icon_id) REFERENCES icons(id)  
);

CREATE TABLE forecast (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city_id INT NOT NULL,
  date DATE NOT NULL,
  min_temp DECIMAL(5) NOT NULL,
  max_temp DECIMAL(5) NOT NULL,
  icon_id INT NOT NULL,
  FOREIGN KEY (city_id) REFERENCES cities(id),
  FOREIGN KEY (icon_id) REFERENCES icons(id)
);



INSERT INTO icons (name, image_url)
VALUES
  ('sunny', "http://localhost:3000/src/assets/icons/soleil.svg"),
  ('cloudy', "http://localhost:3000/src/assets/icons/nuage.svg"),
  ('rainy', "http://localhost:3000/src/assets/icons/pluie.svg"),
  ('snowy', "http://localhost:3000/src/assets/icons/neige.svg");


INSERT INTO cities (name, country, min_temp, max_temp, icon_id)
VALUES
  ('Paris', 'France', 8, 15, 1),
  ('London', 'UK', 5, 10, 2),
  ('New York', 'USA', 10, 20, 3),
  ('Tokyo', 'Japan', 12, 22, 4),
  ('Moscow', 'Russia', -5, 2, 1);

  INSERT INTO forecast (city_id, date, min_temp, max_temp, icon_id)
VALUES
  (1, '2025-02-12', 8, 15, 1),
  (1, '2025-02-13', 9, 16, 2),
  (1, '2025-02-14', 7, 14, 3),
  (1, '2025-02-15', 6, 12, 1),
  (1, '2025-02-16', 5, 11, 4),
  (1, '2025-02-17', 6, 13, 2),
  (1, '2025-02-18', 7, 14, 3),

  (2, '2025-02-12', 5, 10, 2),
  (2, '2025-02-13', 6, 11, 3),
  (2, '2025-02-14', 4, 9, 1),
  (2, '2025-02-15', 3, 7, 4),
  (2, '2025-02-16', 2, 6, 2),
  (2, '2025-02-17', 4, 8, 3),
  (2, '2025-02-18', 5, 9, 1),

  (3, '2025-02-12', 10, 20, 3),
  (3, '2025-02-13', 11, 21, 4),
  (3, '2025-02-14', 9, 19, 2),
  (3, '2025-02-15', 8, 17, 3),
  (3, '2025-02-16', 7, 16, 1),
  (3, '2025-02-17', 9, 18, 4),
  (3, '2025-02-18', 10, 19, 2),

  (4, '2025-02-12', 12, 22, 4),
  (4, '2025-02-13', 13, 23, 1),
  (4, '2025-02-14', 11, 21, 2),
  (4, '2025-02-15', 10, 19, 3),
  (4, '2025-02-16', 9, 18, 4),
  (4, '2025-02-17', 11, 20, 1),
  (4, '2025-02-18', 12, 21, 2),

  (5, '2025-02-12', -5, 2, 1),
  (5, '2025-02-13', -4, 3, 2),
  (5, '2025-02-14', -6, 1, 3),
  (5, '2025-02-15', -8, -2, 4),
  (5, '2025-02-16', -8, -3, 1),
  (5, '2025-02-17', -7, -1, 2),
  (5, '2025-02-18', -5, 0, 3);
