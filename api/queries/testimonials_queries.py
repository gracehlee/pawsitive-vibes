import psycopg
from typing import List, Optional
from models.testimonials import (
    TestimonialIn,
    TestimonialOut,
    TestimonialInUpdate
)
from queries.pool import pool


class TestimonialRepository:
    def create(self, testimonial: TestimonialIn) -> TestimonialOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO testimonials
                            (rating, name, description, approved)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            testimonial.rating,
                            testimonial.name,
                            testimonial.description,
                            testimonial.approved
                        ]
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    testimonial = TestimonialOut(
                        id=data[0],
                        rating=data[1],
                        name=data[2],
                        description=data[3],
                        approved=data[4]
                    )
                    return testimonial

                    # id = result.fetchone()[0]
                    # old_data = testimonial.dict()
                    # # old_data = TestimonialOut(**testimonial.model_dump())
                    # return TestimonialOut(id=id, **old_data)
        except psycopg.Error as e:
            print(e)
            return None

    def get_all(self) -> List[TestimonialOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, rating, name, description
                        FROM testimonials
                        ORDER BY id;
                        """
                    )
                    testimonials = []
                    for record in db:
                        testimonial = TestimonialOut(
                            id=record[0],
                            rating=record[1],
                            name=record[2],
                            description=record[3],
                        )
                        testimonials.append(testimonial)
                    return testimonials
        except psycopg.Error as e:
            print(e)
            return []

    def get_one(self, testimonial_id: int) -> Optional[TestimonialOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, rating, name, description
                        FROM testimonials
                        WHERE id = %s;
                        """,
                        [testimonial_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    testimonial = TestimonialOut(
                        id=data[0],
                        rating=data[1],
                        name=data[2],
                        description=data[3]
                    )
                    return testimonial
        except psycopg.Error as e:
            print(e)
            return None

    def update(
            self,
            testimonial_id: int,
            testimonial: TestimonialInUpdate
    ) -> Optional[TestimonialOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []
                    properties = ["rating", "name", "description"]
                    for property in properties:
                        if getattr(testimonial, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(testimonial, property))
                    values.append(testimonial_id)
                    db.execute(
                        f"""
                        UPDATE testimonials
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING id, rating, name, description;
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_testimonial = TestimonialOut(
                        id=data[0],
                        rating=data[1],
                        name=data[2],
                        description=data[3]
                    )
                    return updated_testimonial
        except psycopg.Error as e:
            print(e)
            return None

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM testimonials
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False
