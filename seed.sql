--Bikin Table
CREATE TABLE users (
  id VARCHAR PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255)  NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(5) DEFAULT 'user',
  photo_profile VARCHAR(255) DEFAULT 'default_photo.png',
  bio VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

CREATE TABLE recipes (
  id VARCHAR PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  ingredient TEXT NOT NULL,
  photo VARCHAR(255) NOT NULL,
  video VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  users_id VARCHAR(255) REFERENCES users(id) NOT NULL,
  category_id VARCHAR(255) REFERENCES category(id) NOT NULL
);

CREATE TABLE recipe_comment (
  id VARCHAR PRIMARY KEY NOT NULL,
  fill_comment TEXT NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  users_id VARCHAR(255) REFERENCES users(id),
  recipes_id VARCHAR(255) REFERENCES recipes(id)
);

CREATE TABLE category (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  parent_category_id VARCHAR(255) REFERENCES category(id)
);

CREATE TABLE tag (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

CREATE TABLE recipe_tags (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  recipes_id VARCHAR(255) REFERENCES recipes(id) NOT NULL,
  tag_id VARCHAR(255) REFERENCES tag(id) NOT NULL
);


-- Isi colom table
INSERT INTO users (id, name, phone, email, role, password, createdAt) 
  VALUES ('5','Habibi', '085555555', 'habibi@gmail.com', 'user','123456789', NOW());

INSERT INTO category (id, name, createdAt, parent_category_id) 
  VALUES ('5','Ciki', NOW(), '2');

INSERT INTO tag (id, name, createdAt) 
  VALUES ('3','Recommended', NOW());

INSERT INTO recipes (id, title, ingredient, photo, video, createdAt, category_id, users_id) 
  VALUES ('8','Bolu', 'egg, salt, oil', 'https://placehold.co/600x400', 'https://placehold.co/600x400', NOW(), '2', '3');

INSERT INTO profile (id, photo_profile, bio, createdAt, users_id) 
  VALUES ('1','gambar_default.jpg', 'Aku adalah Ricky', NOW(), '1');

INSERT INTO recipe_comment (id, fill_comment, createdAt, recipes_id, users_id) 
  VALUES ('3','Bagus banget', NOW(), '1', '5');

INSERT INTO recipe_tags (id, recipes_id, tag_id) 
  VALUES ('1', '1', '1');

SELECT * FROM users;
SELECT * FROM recipes;
SELECT * FROM category;
SELECT * FROM profile;

SELECT * FROM recipe_comment;
SELECT * FROM tag;
SELECT * FROM recipe_tags;

SELECT * FROM category WHERE parent_category_id = '2';
SELECT * FROM recipes JOIN users ON recipes.users_id = users.id
WHERE users.id = '1';


SELECT user_details.*
FROM user_details
JOIN users ON user_details.user_id = users.id
WHERE users.id = 'user_id_yang_diinginkan';

ALTER TABLE recipes ADD COLUMN viewer INT DEFAULT 0;
UPDATE users SET viewer = viewer + 1 WHERE id = '1';


SELECT profile.users_id, users.name, profile.photo_profile, profile.bio 
FROM profile
JOIN users ON profile.users_id = users.id
WHERE users.id = '1';

UPDATE profile SET updatedat

SELECT recipe_comment.*
FROM recipe_comment
JOIN recipes ON recipe_comment.recipes_id = recipes.id
WHERE recipes.id = '1';

SELECT recipe_comment.*
FROM recipe_comment
JOIN users ON recipe_comment.users_id = users.id
JOIN recipes ON recipe_comment.recipes_id = recipes.id
WHERE users.id = '3'
AND recipes.id = '1';

--Hapus table
DROP TABLE users;
DROP TABLE recipes;
DROP TABLE category;

--Update table
ALTER TABLE users ADD COLUMN viewer INT DEFAULT 0;

UPDATE recipes SET video = 'videogambar' WHERE id = '1';


DELETE FROM recipes WHERE id = 'ae95c564-870a-4611-a2e8-81b6225b949c';

UPDATE users SET phone = '087384343438' WHERE name = 'ricky';

ALTER TABLE users DROP COLUMN viewer;

UPDATE recipes SET updatedAt=NOW(), title='Kue Lapis', ingredient='Tepung terigu', photo='http.png', video='cikalang', category_id='3' WHERE id='2971900b-8662-4644-a7af-98bae97bb7fb'

UPDATE profile SET updatedAt=NOW(), photo_profile='xsawd.jpt', bio='oke ini saya' WHERE users_id='3'

SELECT * FROM users WHERE email='lukyp@gmail.com';