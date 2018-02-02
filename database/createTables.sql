create table "user_info" (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

create table "container" (
    id INTEGER PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    pill_type TEXT,
    reminder_time TIME NOT NULL,
    frequency INTEGER NOT NULL,
    last_opened TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES user_info(id) ON DELETE CASCADE
);