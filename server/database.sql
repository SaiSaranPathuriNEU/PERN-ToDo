--creating a database called pern_todo and table called todo

CREATE database pern_todo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

