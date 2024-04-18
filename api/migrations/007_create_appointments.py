steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE appointments (
            id SERIAL NOT NULL UNIQUE,
            name TEXT NOT NULL,
            "user" TEXT DEFAULT NULL,
            email TEXT NOT NULL,
            cancel_url TEXT NOT NULL,
            reschedule_url TEXT NOT NULL,
            event TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE services;
        """
    ],
]
