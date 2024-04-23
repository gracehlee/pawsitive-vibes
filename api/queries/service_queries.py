import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.services import ServiceIn, ServiceInUpdate, ServiceOut


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)

class ServiceRepository:
    def create(self, service: ServiceIn) -> Optional[ServiceOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO services (service, picture_url, duration, cost)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, service, picture_url, duration, cost;
                        """,
                        [
                            service.service,
                            service.picture_url,
                            service.duration,
                            service.cost
                        ],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    service = ServiceOut(
                        id=data[0],
                        service=data[1],
                        picture_url=data[2],
                        duration=data[3],
                        cost=data[4],
                    )
                    return service
        except psycopg.Error as e:
            print(e)
            return None
        
    def get_all(self) -> List[ServiceOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, service, picture_url, duration, cost
                        FROM services
                        ORDER BY id;
                        """
                    )
                    services = []
                    for record in db:
                        service = ServiceOut(
                            id=record[0],
                            service=record[1],
                            picture_url=record[2],
                            duration=record[3],
                            cost=record[4]
                        )
                        services.append(service)
                    return services
        except psycopg.Error as e:
            print(e)
            return []
        
    def get_one(self, service_id: int) -> Optional[ServiceOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, service, picture_url, duration, cost
                        FROM services
                        WHERE id = %s;
                        """,
                        [service_id],
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    service = ServiceOut(
                        id=data[0],
                        service=data[1],
                        picture_url=data[2],
                        duration=data[3],
                        cost=data[4]
                    )
                    return service
        except psycopg.Error as e:
            print(e)
            return None
        
    def update(self, service_id: int, service: ServiceInUpdate) -> Optional[ServiceOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    fields = []
                    values = []

                    properties = ["service", "picture_url", "duration", "cost"]
                    for property in properties:
                        if getattr(service, property) is not None:
                            fields.append(f"{property} = %s")
                            values.append(getattr(service, property))
                    
                    values.append(service_id)

                    db.execute(
                        f"""
                        UPDATE services
                        SET {', '.join(fields)}
                        WHERE id = %s
                        RETURNING id, service, picture_url, duration, cost;
                        """,
                        values,
                    )
                    data = db.fetchone()
                    if data is None:
                        return None
                    updated_service = ServiceOut(
                        id=data[0],
                        service=data[1],
                        picture_url=data[2],
                        duration=data[3],
                        cost=data[4]
                    )
                    return updated_service
        except psycopg.Error as e:
            print(e)
            return None
        
    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM services
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False