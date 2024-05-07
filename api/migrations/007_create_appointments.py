steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE appointments (
            id SERIAL NOT NULL UNIQUE,
            user_id INTEGER NOT NULL REFERENCES users
            ("id") ON DELETE RESTRICT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            cancel_url TEXT DEFAULT NULL,
            reschedule_url TEXT DEFAULT NULL,
            service_id INTEGER NOT NULL REFERENCES services
            ("id") ON DELETE RESTRICT,
            approved BOOLEAN DEFAULT FALSE,
            date DATE NOT NULL,
            time TIME NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE appointments;
        """
    ],
]
