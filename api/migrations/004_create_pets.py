steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE pets (
            id SERIAL NOT NULL UNIQUE,
            pet_name TEXT NOT NULL,
            image_url TEXT DEFAULT NULL,
            for_sale BOOLEAN NOT NULL DEFAULT FALSE,
            price INTEGER DEFAULT NULL,
            breed TEXT DEFAULT NULL,
            age TEXT DEFAULT NULL,
            birthday DATE DEFAULT NULL,
            description TEXT DEFAULT NULL,
            owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE pets;
        """
    ],
]
