steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            first_name TEXT DEFAULT NULL,
            last_name TEXT DEFAULT NULL,
            email TEXT DEFAULT NULL UNIQUE,
            phone_number TEXT DEFAULT NULL,
            admin BOOLEAN DEFAULT FALSE,
            bio TEXT DEFAULT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
