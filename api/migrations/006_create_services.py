steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE services (
            id SERIAL NOT NULL UNIQUE,
            service TEXT NOT NULL,
            description TEXT DEFAULT NULL,
            picture_url TEXT DEFAULT NULL,
            duration INTEGER DEFAULT NULL,
            cost TEXT DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE services;
        """
    ],
]
