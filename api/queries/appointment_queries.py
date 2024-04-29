import psycopg
from typing import List, Optional
from models.appointments import (
    ApptIn,
    ApptOut,
    ApptInUpdate
)
from queries.pool import pool


class AppointmentQueries:
    def create(self, appt: ApptIn) -> ApptOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO appointments (
                            user_id
                            , name
                            , email
                            , cancel_url
                            , reschedule_url
                            , service_id
                            , approved
                            , date
                            , time
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            appt.user_id,
                            appt.name,
                            appt.email,
                            appt.cancel_url,
                            appt.reschedule_url,
                            appt.service_id,
                            appt.approved,
                            appt.date,
                            appt.time
                        ]
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    appt = ApptOut(
                        id=data[0],
                        user_id=data[1],
                        name=data[2],
                        email=data[3],
                        cancel_url=data[4],
                        reschedule_url=data[5],
                        service_id=data[6],
                        approved=data[7],
                        date=data[8],
                        time=data[9]
                    )
                    return appt

        except psycopg.Error as e:
            print(e)
            return None

    def update(
        self,
        appt_id: int,
        appt: ApptInUpdate
    ) -> Optional[ApptOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []
                    properties = ["approved", "date"]
                    for property in properties:
                        if getattr(appt, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(appt, property))
                    values.append(appt_id)
                    db.execute(
                        f"""
                        UPDATE appointments
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING *;
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_appt = ApptOut(
                        id=data[0],
                        user_id=data[1],
                        name=data[2],
                        email=data[3],
                        cancel_url=data[4],
                        reschedule_url=data[5],
                        service_id=data[6],
                        approved=data[7],
                        date=data[8],
                        time=data[9]
                    )
                    return updated_appt
        except psycopg.Error as e:
            print(e)
            return None

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM appointments
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False

    def get_all(self) -> List[ApptOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM appointments
                        ORDER BY id;
                        """
                    )
                    appts = []
                    for data in db:
                        appt = ApptOut(
                            id=data[0],
                            user_id=data[1],
                            name=data[2],
                            email=data[3],
                            cancel_url=data[4],
                            reschedule_url=data[5],
                            service_id=data[6],
                            approved=data[7],
                            date=data[8],
                            time=data[9]
                        )
                        appts.append(appt)
                    return appts
        except psycopg.Error as e:
            print(e)
            return []

    def get_one(self, appt_id: int) -> Optional[ApptOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM appointments
                        WHERE id = %s;
                        """,
                        [appt_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    appt = ApptOut(
                        id=data[0],
                        user_id=data[1],
                        name=data[2],
                        email=data[3],
                        cancel_url=data[4],
                        reschedule_url=data[5],
                        service_id=data[6],
                        approved=data[7],
                        date=data[8],
                        time=data[9]
                    )
                    return appt
        except psycopg.Error as e:
            print(e)
            return None
