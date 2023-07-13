CREATE TABLE unreviewed_posts(id SERIAL PRIMARY KEY, gender TEXT, level TEXT, date DATE, content TEXT);
CREATE TABLE reviewed_posts(id SERIAL PRIMARY KEY, gender TEXT, level TEXT, date DATE, content TEXT);

CREATE TABLE special_users(role TEXT, password TEXT);
INSERT INTO special_users VALUES('admin','admin'), ('maintainer','maintainer');

CREATE TABLE comments(id SERIAL PRIMARY KEY, post_id INT,owner_name TEXT ,content TEXT,CONSTRAINT fk_posts
FOREIGN KEY(post_id) REFERENCES reviewed_posts(id) ON DELETE CASCADE);