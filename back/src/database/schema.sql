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
  min_temp DECIMAL(5,2) NOT NULL,
  max_temp DECIMAL(5,2) NOT NULL, 
  icon_id INT,
  FOREIGN KEY (icon_id) REFERENCES icons(id)  
);

CREATE TABLE weather_forecast (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cities_id INT NOT NULL,
  date DATE NOT NULL,
  min_temp DECIMAL(5,2) NOT NULL,
  max_temp DECIMAL(5,2) NOT NULL,
  icon_id INT NOT NULL,
  FOREIGN KEY (cities_id) REFERENCES cities(id),
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
  ('Paris', 'France', 8.5, 15.2, 1),
  ('London', 'UK', 5.0, 10.0, 2),
  ('New York', 'USA', 10.0, 20.0, 3),
  ('Tokyo', 'Japan', 12.0, 22.0, 4),
  ('Moscow', 'Russia', -5.0, 2.0, 1);

  INSERT INTO weather_forecast (cities_id, date, min_temp, max_temp, icon_id)
VALUES
  (1, '2025-02-12', 8.5, 15.2, 1),
  (1, '2025-02-13', 9.0, 16.0, 2),
  (1, '2025-02-14', 7.5, 14.0, 3),
  (1, '2025-02-15', 6.0, 12.5, 1),
  (1, '2025-02-16', 5.5, 11.0, 4),
  (1, '2025-02-17', 6.2, 13.5, 2),
  (1, '2025-02-18', 7.0, 14.8, 3),

  (2, '2025-02-12', 5.0, 10.0, 2),
  (2, '2025-02-13', 6.0, 11.5, 3),
  (2, '2025-02-14', 4.5, 9.0, 1),
  (2, '2025-02-15', 3.0, 7.5, 4),
  (2, '2025-02-16', 2.5, 6.0, 2),
  (2, '2025-02-17', 4.0, 8.5, 3),
  (2, '2025-02-18', 5.2, 9.8, 1),

  (3, '2025-02-12', 10.0, 20.0, 3),
  (3, '2025-02-13', 11.0, 21.5, 4),
  (3, '2025-02-14', 9.5, 19.0, 2),
  (3, '2025-02-15', 8.0, 17.5, 3),
  (3, '2025-02-16', 7.5, 16.0, 1),
  (3, '2025-02-17', 9.0, 18.5, 4),
  (3, '2025-02-18', 10.2, 19.8, 2),

  (4, '2025-02-12', 12.0, 22.0, 4),
  (4, '2025-02-13', 13.0, 23.5, 1),
  (4, '2025-02-14', 11.5, 21.0, 2),
  (4, '2025-02-15', 10.0, 19.5, 3),
  (4, '2025-02-16', 9.5, 18.0, 4),
  (4, '2025-02-17', 11.0, 20.5, 1),
  (4, '2025-02-18', 12.2, 21.8, 2),

  (5, '2025-02-12', -5.0, 2.0, 1),
  (5, '2025-02-13', -4.0, 3.5, 2),
  (5, '2025-02-14', -6.5, 1.0, 3),
  (5, '2025-02-15', -8.0, -2.5, 4),
  (5, '2025-02-16', -8.5, -3.0, 1),
  (5, '2025-02-17', -7.0, -1.5, 2),
  (5, '2025-02-18', -5.8, 0.8, 3);

