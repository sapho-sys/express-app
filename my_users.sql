CREATE TABLE users_greeted(
    id SERIAL PRIMARY KEY,
    greeted_users VARCHAR(40) NOT NULL,
    counter int NOT NULL
);