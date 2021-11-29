CREATE TABLE Users ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100), 
    email VARCHAR(100), 
    password VARCHAR(100), 
    is_active BIT, 
    last_time_active TIMESTAMP, 
    phone VARCHAR(100), 
    photo_url VARCHAR(500),
    is_merchant BIT,
    is_client BIT, 
    latitude DECIMAL,
    longitude DECIMAL 
);

CREATE TABLE Foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo_url VARCHAR(500),
    price DECIMAL NOT NULL,
    description VARCHAR(500) NOT NULL,
    avaliable_quantity INT,
    category VARCHAR(100),
    merchant_id INT NOT NULL,
    FOREIGN KEY (merchant_id) REFERENCES users(id)
);

CREATE TABLE Ratings (
    id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL,
    client_id INT NOT NULL,
    stars INT NOT NULL,
    date TIMESTAMP NOT NULL,
    FOREIGN KEY (merchant_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL,
    client_id INT NOT NULL,
    status VARCHAR(100) NOT NULL,
    total_price DECIMAL NOT NULL,
    payment_method DECIMAL NOT NULL,
    time_ordered TIMESTAMP NOT NULL,
    time_delivered TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);