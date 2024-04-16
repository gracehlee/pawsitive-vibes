CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    bio TEXT DEFAULT NULL,
    date_created DATETIME NOT NULL
);

CREATE TABLE pets (
    id SERIAL NOT NULL UNIQUE,
    dog_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    for_sale BOOLEAN NOT NULL DEFAULT FALSE,
    price INTEGER DEFAULT NULL,
    owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE
);

CREATE TABLE services (
    id SERIAL NOT NULL UNIQUE,
    service TEXT NOT NULL,
    picture_url TEXT NOT NULL,
    duration INTEGER NOT NULL,
    cost TEXT NOT NULL
);

CREATE TABLE testimonials (
    id SERIAL NOT NULL UNIQUE,
    rating INTEGER NOT NULL DEFAULT 5,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE appointments (
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    user TEXT DEFAULT NULL,
    email TEXT NOT NULL,
    cancel_url TEXT NOT NULL,
    reschedule_url TEXT NOT NULL,
    event TEXT NOT NULL
);


-- -- If we want to use pre-set data as an example, we can use the code:

-- -- To insert sample data
-- INSERT INTO pets (dog_name, image_url, for_sale, price, owner_id)
-- VALUES ('Rex', '{{URL}}', true, 100, 1);

-- -- To set correct id values for the sample data
-- SELECT setval('pets_id_seq', (SELECT MAX(id) + 1 FROM pets));

-- -- To drop the table if we want to just use the sample data
-- DROP TABLE IF EXISTS pets
