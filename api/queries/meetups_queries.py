"""
Database Queries for Meetups
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List
from models.meetups import MeetupsOut, MeetupsInUpdate, MeetupsIn


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class MeetupsQueries:
    def get_all_meetups(self) -> List[MeetupsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT (
                            id
                            , name
                            , date
                            , time
                            , description
                            , location
                        )
                        FROM meetups
                        ORDER BY id;
                        """
                    )
                    meetups = []
                    for record in db:
                        meetup = MeetupsOut(
                            id=record[0][0],
                            name=record[0][1],
                            date=record[0][2],
                            time=record[0][3],
                            description=record[0][4],
                            location=record[0][5]
                        )
                        meetups.append(meetup)
                    return meetups
        except psycopg.Error as e:
            print(e)
            return []

    def get_one(self, meetup_id: int) -> Optional[MeetupsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT (
                            id
                            , name
                            , date
                            , time
                            , description
                            , location
                        )
                        FROM meetups
                        WHERE id = %s;
                        """,
                        [meetup_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    meetup = MeetupsOut(
                        id=data[0][0],
                        name=data[0][1],
                        date=data[0][2],
                        time=data[0][3],
                        description=data[0][4],
                        location=data[0][5]
                    )
                    return meetup
        except psycopg.Error as e:
            print(e)
            return None

    def create(self, meetup: MeetupsIn) -> Optional[MeetupsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO meetups (
                            name
                            , date
                            , time
                            , description
                            , location
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING (
                            id
                            , name
                            , date
                            , time
                            , description
                            , location
                        )
                        """,
                        [
                            meetup.name,
                            meetup.date,
                            meetup.time,
                            meetup.description,
                            meetup.location
                        ],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    meetup = MeetupsOut(
                        id=data[0][0],
                        name=data[0][1],
                        date=data[0][2],
                        time=data[0][3],
                        description=data[0][4],
                        location=data[0][5]
                    )
                    return meetup
        except psycopg.Error as e:
            print(e)
            return None

    def update(self, meetup_id: int,
               meetup: MeetupsInUpdate) -> Optional[MeetupsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []

                    properties = ["name", "date", "time",
                                  "description", "location"]
                    for property in properties:
                        if getattr(meetup, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(meetup, property))

                    values.append(meetup_id)

                    db.execute(
                        f"""
                        UPDATE meetups
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING (
                            id
                            , name
                            , date
                            , time
                            , description
                            , location
                        )
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_meetup = MeetupsOut(
                        id=data[0][0],
                        name=data[0][1],
                        date=data[0][2],
                        time=data[0][3],
                        description=data[0][4],
                        location=data[0][5]
                    )
                    return updated_meetup
        except psycopg.Error as e:
            print(e)
            return None

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM meetups
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False
