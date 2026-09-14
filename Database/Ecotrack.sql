CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(100),
    profile_image VARCHAR(255),
    phone VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    theme VARCHAR(20) DEFAULT 'light',
    language VARCHAR(20) DEFAULT 'en',
    auth_provider ENUM('local', 'google') DEFAULT 'local',
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    streak INT DEFAULT 0,
    last_activity DATE,
    notifications TINYINT(1) DEFAULT 1,

    PRIMARY KEY (id)
);

CREATE TABLE calculations (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    transport_type VARCHAR(50),
    travel_distance FLOAT,
    electricity_usage FLOAT,
    waste_generated FLOAT,
    total_carbon FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_calculations_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE achievements (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(50),
    requirement_type VARCHAR(50),
    requirement_value INT DEFAULT 1,
    xp_reward INT DEFAULT 0,

    PRIMARY KEY (id)
);

CREATE TABLE daily_challenges (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    xp_reward INT,
    challenge_date DATE,

    PRIMARY KEY (id)
);

CREATE TABLE user_achievements (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_user_achievements_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_achievements_achievement
        FOREIGN KEY (achievement_id)
        REFERENCES achievements(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    UNIQUE (user_id, achievement_id)
);