steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE meetups (
            id SERIAL NOT NULL UNIQUE,
            name TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE meetups;
        """
    ],
]
