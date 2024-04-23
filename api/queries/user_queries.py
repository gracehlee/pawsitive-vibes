"""
Database Queries for Users
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.users import UserWithPw, UserInUpdate, UserOut
from utils.exceptions import UserDatabaseException


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """
    # get_by_username, get_by_id and create_user with auth_router.py
    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as db:
                    db.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = db.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as db:
                    db.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE id = %s
                            """,
                        [id],
                    )
                    user = db.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return user

    def create_user(
        self,
        username: str,
        password: str,
        first_name: str,
        last_name: str,
        email: str,
        phone_number: int,
        bio: Optional[str] = None
    ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as db:
                    db.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            phone_number,
                            bio
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            phone_number,
                            bio,
                        ],
                    )
                    user = db.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {username}"
            )
        return user

    # get_all_users, get_one, update and delete with users_router.py
    def get_all(self) -> List[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                            """
                            SELECT
                            id, username, first_name, last_name,
                            email, phone_number, bio
                            FROM users
                            ORDER BY id
                            """
                    )
                    all_users = []
                    for record in db:
                        user = UserOut(
                            id=record[0],
                            username=record[1],
                            first_name=record[2],
                            last_name=record[3],
                            email=record[4],
                            phone_number=record[5],
                            bio=record[6]
                        )
                        all_users.append(user)
                    return all_users
        except psycopg.Error as e:
            print(e)
            return []

    def get_one(self, id: int) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        id, username, first_name, last_name,
                        email, phone_number, bio
                        FROM users
                        WHERE id = %s;
                        """,
                        [id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    user = UserOut(
                        id=data[0],
                        username=data[1],
                        first_name=data[2],
                        last_name=data[3],
                        email=data[4],
                        phone_number=data[5],
                        bio=data[6]
                    )
                    return user

        except psycopg.Error as e:
            print(e)
            return None

    def update(self, id: int, user: UserInUpdate) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []

                    properties = ["first_name", "last_name",
                                  "email", "phone_number", "bio"]
                    for property in properties:
                        if getattr(user, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(user, property))

                    values.append(id)

                    db.execute(
                        f"""
                        UPDATE users
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING
                        id, username, first_name, last_name,
                        email, phone_number, bio;
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_user = UserOut(
                        id=data[0],
                        username=data[1],
                        first_name=data[2],
                        last_name=data[3],
                        email=data[4],
                        phone_number=data[5],
                        bio=data[6]
                    )
                    return updated_user
        except psycopg.Error as e:
            print(e)
            return None

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False
