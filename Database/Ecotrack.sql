CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE calculations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  transport_type VARCHAR(50),
  travel_distance FLOAT,
  electricity_usage FLOAT,
  waste_generated FLOAT,
  total_carbon FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

