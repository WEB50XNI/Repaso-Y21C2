CREATE TABLE movies (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL,
    year INTEGER NOT NULL, 
    description VARCHAR NOT NULL, 
    image VARCHAR);