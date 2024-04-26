steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE testimonials (
            id SERIAL NOT NULL UNIQUE,
            rating INTEGER NOT NULL DEFAULT 5,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            approved BOOLEAN DEFAULT FALSE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE testimonials;
        """
    ],
]
