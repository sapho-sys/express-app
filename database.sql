CREATE TABLE userdata{
    id SERIAL PRIMARY KEY,
    greeted_users VARCHAR(40) NOT NULL,
    counter int NOT NULL
}