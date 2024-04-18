"""
Database Queries for Pets
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.pets import PetOut, PetInUpdate, PetIn


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PetQueries:
    def get_all(self) -> List[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, pet_name, image_url, for_sale, price, owner_id
                        FROM pets
                        ORDER BY id;
                        """
                    )
                    pets = []
                    for record in db:
                        pet = PetOut(
                            id=record[0],
                            pet_name=record[1],
                            image_url=record[2],
                            for_sale=record[3],
                            price=record[4],
                            owner_id=record[5],
                        )
                        pets.append(pet)
                    return pets
        except psycopg.Error as e:
            print(e)
            return []

    def get_one(self, pet_id: int) -> Optional[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, pet_name, image_url, for_sale, price, owner_id
                        FROM pets
                        WHERE id = %s;
                        """,
                        [pet_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    pet = PetOut(
                        id=data[0],
                        pet_name=data[1],
                        image_url=data[2],
                        for_sale=data[3],
                        price=data[4],
                        owner_id=data[5],
                    )
                    return pet
        except psycopg.Error as e:
            print(e)
            return None

    def create(self, pet: PetIn) -> Optional[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO pets (pet_name, image_url, for_sale, price, owner_id)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id, pet_name, image_url, for_sale, price, owner_id;
                        """,
                        [
                            pet.pet_name,
                            pet.image_url,
                            pet.for_sale,
                            pet.price,
                            pet.owner_id,
                        ],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    pet = PetOut(
                        id=data[0],
                        pet_name=data[1],
                        image_url=data[2],
                        for_sale=data[3],
                        price=data[4],
                        owner_id=data[5],
                    )
                    return pet
        except psycopg.Error as e:
            print(e)
            return None

    def update(self, pet_id: int, pet: PetInUpdate) -> Optional[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []

                    properties = ["pet_name", "image_url", "for_sale", "price"]
                    for property in properties:
                        if getattr(pet, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(pet, property))

                    values.append(pet_id)

                    db.execute(
                        f"""
                        UPDATE pets
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING id, pet_name, image_url, for_sale, price, owner_id;
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_pet = PetOut(
                        id=data[0],
                        pet_name=data[1],
                        image_url=data[2],
                        for_sale=data[3],
                        price=data[4],
                        owner_id=data[5],
                    )
                    return updated_pet
        except psycopg.Error as e:
            print(e)
            return None

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pets
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False
