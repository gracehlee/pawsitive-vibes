"""
Database Queries for Pets
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from typing import Optional, List
from models.pets import PetOut, PetInUpdate, PetIn


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PetQueries:
    def get_all_pets(self) -> List[PetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT (
                            id
                            , pet_name
                            , image_url
                            , for_sale
                            , price
                            , breed
                            , age
                            , birthday
                            , description
                            , owner_id
                        )
                        FROM pets
                        ORDER BY id;
                        """
                    )
                    pets = []
                    print("DB IS:", db)
                    for record in db:
                        print("RECORD IS:", record)
                        pet = PetOut(
                            id=record[0][0],
                            pet_name=record[0][1],
                            image_url=record[0][2],
                            for_sale=record[0][3],
                            price=record[0][4],
                            breed=record[0][5],
                            age=record[0][6],
                            birthday=record[0][7],
                            description=record[0][8],
                            owner_id=record[0][9],
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
                        SELECT (
                            id
                            , pet_name
                            , image_url
                            , for_sale
                            , price
                            , breed
                            , age
                            , birthday
                            , description
                            , owner_id
                        )
                        FROM pets
                        WHERE id = %s;
                        """,
                        [pet_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    pet = PetOut(
                        id=data[0][0],
                        pet_name=data[0][1],
                        image_url=data[0][2],
                        for_sale=data[0][3],
                        price=data[0][4],
                        breed=data[0][5],
                        age=data[0][6],
                        birthday=data[0][7],
                        description=data[0][8],
                        owner_id=data[0][9],
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
                        INSERT INTO pets (
                            pet_name
                            , image_url
                            , for_sale
                            , price
                            , breed
                            , age
                            , birthday
                            , description
                            , owner_id
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING (
                            id
                            , pet_name
                            , image_url
                            , for_sale
                            , price
                            , breed
                            , age
                            , birthday
                            , description
                            , owner_id
                        )
                        """,
                        [
                            pet.pet_name,
                            pet.image_url,
                            pet.for_sale,
                            pet.price,
                            pet.breed,
                            pet.age,
                            pet.birthday,
                            pet.description,
                            pet.owner_id,
                        ],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    pet = PetOut(
                        id=data[0][0],
                        pet_name=data[0][1],
                        image_url=data[0][2],
                        for_sale=data[0][3],
                        price=data[0][4],
                        breed=data[0][5],
                        age=data[0][6],
                        birthday=data[0][7],
                        description=data[0][8],
                        owner_id=data[0][9],
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

                    properties = ["pet_name", "image_url", "for_sale", "price",
                                  "breed", "age", "birthday", "description",
                                  "owner_id"]
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
                        RETURNING (
                            id
                            , pet_name
                            , image_url
                            , for_sale
                            , price
                            , breed
                            , age
                            , birthday
                            , description
                            , owner_id
                        )
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_pet = PetOut(
                        id=data[0][0],
                        pet_name=data[0][1],
                        image_url=data[0][2],
                        for_sale=data[0][3],
                        price=data[0][4],
                        breed=data[0][5],
                        age=data[0][6],
                        birthday=data[0][7],
                        description=data[0][8],
                        owner_id=data[0][9],
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
