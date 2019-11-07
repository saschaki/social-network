DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;

CREATE table users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK(first != ''),
    last VARCHAR(255) NOT NULL CHECK(last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK(email != ''),
    password VARCHAR NOT NULL CHECK(password != ''),
    image VARCHAR(300),
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(id),
  receiver_id INT REFERENCES users(id),
  reply_to int REFERENCES messages,
  message VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


