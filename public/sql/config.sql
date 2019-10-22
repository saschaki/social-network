DROP TABLE IF EXISTS users CASCADE;

CREATE table users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK(first != ''),
    last VARCHAR(255) NOT NULL CHECK(last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK(email != ''),
    password VARCHAR NOT NULL CHECK(password != ''),
    created_at TIMESTAMP DEFAULT now()
);
