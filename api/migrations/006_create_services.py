steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE services (
            id SERIAL NOT NULL UNIQUE,
            service TEXT NOT NULL,
            picture_url TEXT NOT NULL,
            duration INTEGER NOT NULL,
            cost TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE services;
        """
    ],
]
