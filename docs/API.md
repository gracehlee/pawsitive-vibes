[Return to README](../README.md)

# APIs

## Authentication

### POST `/api/auth/signup`

Creates a new user.

#### Input

```json
{
    "username": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone_number": "string",
    "admin": false,
    "bio": "string"
}
```

#### Output

```json
{
  "id": int,
  "username": "string",
  "password": "string"
}
```

#### Error

```
422: Error: Unprocessable Entity
```

### POST `/api/auth/signin`

Signs in the user.

#### Input

```json
{
    "username": "string",
    "password": "string"
}
```

#### Output

```json
{
  "id": int,
  "username": "string"
}
```

#### Error

```
422: Validation Error
```

### GET `/api/auth/authenticate`

JWT Validation.

#### Function

```
This function returns the user if the user is logged in.
```

#### Output

```json
{
  "id": int,
  "username": "string"
}
```

#### Error

```
422: Validation Error
```

### DELETE `/api/auth/signout`

Signs user out by deleting the JWT Cookie.

#### Output

```
200: Successful Response
```

## Users

### GET `/api/users`

Gets all users.

#### Output

```json
[
  {
    "id": int,
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone_number": "string",
    "admin": false,
    "bio": "string"
  },
  ...
]
```

#### Error

```
422: Validation Error
```

### GET `/api/users/{id}`

Get User by ID

#### Parameters

```
{id}
JWT Token
```

#### Output

```json
{
  "id": {id},
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone_number": "string",
  "admin": false,
  "bio": "string"
}
```

#### Error

```
422: Validation Error
```

### PUT `/api/users/{id}`

Update User by ID

#### Input

```
{id}
JWT Token
```

```json
{
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone_number": "string",
    "admin": false,
    "bio": "string"
}
```

#### Output

```json
{
  "id": {id},
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone_number": "string",
  "admin": false,
  "bio": "string"
}
```

#### Error

```
422: Validation Error
```

### DELETE `/users/{id}`

Delete User by ID

#### Parameters

```
{id}
JWT Token
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

## Pets

### POST `/api/pets`

Create Pet

#### Input

```json
{
  "pet_name": "string",
  "image_url": "string",
  "for_sale": true,
  "price": int,
  "breed": "string",
  "birthday": "2024-05-09",
  "description": "string",
  "owner_id": int
}
```

#### Output

```json
{
  "id": int,
  "pet_name": "string",
  "image_url": "string",
  "for_sale": true,
  "price": int,
  "breed": "string",
  "birthday": "2024-05-09",
  "description": "string",
  "owner_id": int
}
```

#### Error

```
422: Validation Error
```

### GET `/api/pets`

Get All Pets

#### Output

```json
[
  {
    "id": int,
    "pet_name": "string",
    "image_url": "string",
    "for_sale": true,
    "price": int,
    "breed": "string",
    "birthday": "2024-05-09",
    "description": "string",
    "owner_id": int
  },
  ...
]
```

#### Error

```
404: Pets not found.
```

### GET `/api/pets/{pet_id}`

Get one Pet by ID

#### Parameters

```
{pet_id}
```

#### Output

```json
{
  "id": int,
  "pet_name": "string",
  "image_url": "string",
  "for_sale": true,
  "price": int,
  "breed": "string",
  "birthday": "2024-05-09",
  "description": "string",
  "owner_id": int
}
```

#### Error

```
404: Pet not found.
```

### PUT `/api/pets/{pet_id}`

Update one Pet by ID

#### Input

```
{pet_id}
JWT Token
```

```json
{
  "pet_name": "string",
  "image_url": "string",
  "for_sale": true,
  "price": int,
  "breed": "string",
  "birthday": "2024-05-09",
  "description": "string",
  "owner_id": int
}
```

#### Output

```json
{
  "id": {pet_id},
  "pet_name": "string",
  "image_url": "string",
  "for_sale": true,
  "price": int,
  "breed": "string",
  "birthday": "2024-05-09",
  "description": "string",
  "owner_id": int
}
```

#### Error

```
404: Pet not found
```

### DELETE `/api/pets/{pet_id}`

Delete one Pet by ID

#### Parameters

```
{pet_id}
JWT Token
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

## Services

### POST `/api/services`

Create Service

#### Input

```json
{
  "service": "string",
  "description": "string",
  "picture_url": "string",
  "duration": int,
  "cost": "string",
  "calendly_url": "string"
}
```

#### Output

```json
{
  "id": int,
  "service": "string",
  "description": "string",
  "picture_url": "string",
  "duration": int,
  "cost": "string",
  "calendly_url": "string"
}
```

#### Error

```
422: Validation Error
```

### GET `/api/services`

Get All Services

#### Output

```json
[
  {
    "id": int,
    "service": "string",
    "description": "string",
    "picture_url": "string",
    "duration": int,
    "cost": "string",
    "calendly_url": "string"
  },
  ...
]
```

#### Error

```
404: Services not found
```

### GET `/api/services/{service_id}`

Get Service by ID

#### Parameters

```
{service_id}
```

#### Output

```json
{
  "id": {service_id},
  "service": "string",
  "description": "string",
  "picture_url": "string",
  "duration": int,
  "cost": "string",
  "calendly_url": "string"
}
```

#### Error

```
422: Validation Error
```

### PUT `/api/services/{service_id}`

Update Service by ID

#### Input

```
{service_id}
JWT Token
```

```json
{
  "service": "string",
  "description": "string",
  "picture_url": "string",
  "duration": int,
  "cost": "string",
  "calendly_url": "string"
}
```

#### Output

```json
{
  "id": {service_id},
  "service": "string",
  "description": "string",
  "picture_url": "string",
  "duration": int,
  "cost": "string",
  "calendly_url": "string"
}
```

#### Error

```
422: Validation Error
```

### DELETE `/api/services/{service_id}`

Delete Service by ID

#### Parameters

```
{service_id}
JWT Token
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

## Testimonials

### GET `/api/testimonials`

Get All Testimonials

#### Output

```json
[
  {
    "id": int,
    "rating": int,
    "name": "string",
    "description": "string",
    "approved": false
  },
  ...
]
```

### GET `/api/testimonials/{testimonial_id}`

Get one Testimonial by ID

#### Parameters

```
{testimonial_id}
```

#### Output

```json
{
  "id": {testimonial_id},
  "rating": int,
  "name": "string",
  "description": "string",
  "approved": false
}
```

#### Error

```
422: Validation Error
```

### POST `/api/testimonials`

Create Testimonial

#### Input

```json
{
  "rating": int,
  "name": "string",
  "description": "string",
  "approved": false
}
```

#### Output

```json
{
  "id": int,
  "rating": int,
  "name": "string",
  "description": "string",
  "approved": false
}
```

#### Error

```
422: Validation Error
```

### PUT `/api/testimonials/{testimonial_id}`

Update Testimonial by ID

#### Input

```
{testimonial_id}
JWT Token
```

```json
{
  "rating": int,
  "name": "string",
  "description": "string",
  "approved": false
}
```

#### Output

```json
{
  "id": {testimonial_id},
  "rating": int,
  "name": "string",
  "description": "string",
  "approved": false
}
```

#### Error

```
422: Validation Error
```

### DELETE `/api/testimonials/{testimonial_id}`

Delete Testimonial by ID

#### Parameters

```
{testimonial_id}
JWT Token
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

## Meetups

### POST `/api/meetups`

Create Meetup

#### Input

```json
{
    "name": "string",
    "date": "2024-05-09",
    "time": "04:58:06.048Z",
    "description": "string",
    "location": "string"
}
```

#### Output

```json
{
  "id": int,
  "name": "string",
  "date": "2024-05-09",
  "time": "04:58:06.049Z",
  "description": "string",
  "location": "string"
}
```

#### Error

```
422: Validation Error
```

### GET `/api/meetups`

Get All Meetups

#### Output

```json
[
  {
    "id": int,
    "name": "string",
    "date": "2024-05-09",
    "time": "04:59:46.584Z",
    "description": "string",
    "location": "string"
  },
  ...
]
```

### GET `/api/meetups/{meetup_id}`

Get one Meetup by ID

#### Parameters

```
{meetup_id}
```

#### Output

```json
{
  "id": {meetup_id},
  "name": "string",
  "date": "2024-05-09",
  "time": "05:00:52.759Z",
  "description": "string",
  "location": "string"
}
```

#### Error

```
422: Validation Error
```

### PUT `/api/meetups/{meetup_id}`

Update one Meetup by ID

#### Input

```
{meetup_id}
JWT Token
```

```json
{
    "name": "string",
    "date": "2024-05-09",
    "time": "05:01:42.560Z",
    "description": "string",
    "location": "string"
}
```

#### Output

```json
{
  "id": {meetup_id},
  "name": "string",
  "date": "2024-05-09",
  "time": "05:01:42.561Z",
  "description": "string",
  "location": "string"
}
```

#### Error

```
422: Validation Error
```

### DELETE `/api/meetups/{meetup_id}`

Delete one Meetup by ID

#### Parameters

```
{meetup_id}
JWT Token
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

## Image Uploads

### POST `/upload/`

Upload a profile picture.

#### Parameters

```
file_upload: string($binary)
filename: string
```

#### Output

Image is uploaded into profile_image folder with the name user_id.png.

```
200 Successful Response
```

#### Error

```
Validation Error
```

### POST `/upload_service_image/`

Upload a service picture.

#### Parameters

```
file_upload: string($binary)
filename: string
```

#### Output

Image is uploaded into service_image folder with the name service_id.png.

```
200 Successful Response
```

#### Error

```
Validation Error
```

### GET `/profile_image/{id}`

Get Profile Image

#### Parameters

Requires user id.

```
{id}
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

### GET `/service_image/{id}`

Get Service Image

#### Parameters

Requires service id.

```
{id}
```

#### Output

```
200: Successful Response
```

#### Error

```
422: Validation Error
```

# Optional: Appointments

## Appointments

### POST `/api/appointments`

Create Appointment

#### Input

```json
{
  "user_id": int,
  "name": "string",
  "email": "string",
  "cancel_url": "string",
  "reschedule_url": "string",
  "service_id": int,
  "approved": true,
  "date": "2024-05-09",
  "time": "05:11:51.218Z"
}
```

#### Output

```json
{
  "id": int,
  "user_id": int,
  "name": "string",
  "email": "string",
  "cancel_url": "string",
  "reschedule_url": "string",
  "service_id": int,
  "approved": true,
  "date": "2024-05-09",
  "time": "05:11:51.238Z"
}
```

#### Error
```
422: Validation Error
```

### GET `/api/appointments`

Get All Appointments

#### Output

```json
[
  {
    "id": int,
    "user_id": int,
    "name": "string",
    "email": "string",
    "cancel_url": "string",
    "reschedule_url": "string",
    "service_id": int,
    "approved": true,
    "date": "2024-05-09",
    "time": "05:13:39.478Z"
  },
  ...
]
```

#### Error

```
422: Validation Error
```

### GET `/api/appointments/{appt_id}`

Get Appointment by ID

#### Parameters

```
{appt_id}
JWT Token
```

#### Output

```json
{
  "id": {appt_id},
  "user_id": int,
  "name": "string",
  "email": "string",
  "cancel_url": "string",
  "reschedule_url": "string",
  "service_id": int,
  "approved": true,
  "date": "2024-05-09",
  "time": "05:14:42.883Z"
}
```

#### Error

```
422: Validation Error
```

### PUT `/api/appointments/{appt_id}`

Update one Appointment by ID

#### Input
```
{appt_id}
JWT Token
```
```json
{
  "approved": true,
  "date": "2024-05-09",
  "time": "05:16:00.461Z"
}
```

#### Output

```json
{
  "id": {appt_id},
  "user_id": int,
  "name": "string",
  "email": "string",
  "cancel_url": "string",
  "reschedule_url": "string",
  "service_id": int,
  "approved": true,
  "date": "2024-05-09",
  "time": "05:16:00.482Z"
}
```

#### Error
```
422: Validation Error
```

### DELETE `/api/appointments/{appt_id}`

Delete one Appointment by ID

#### Parameters
```
{appt_id}
JWT Token
```

#### Output
```
200: Successful Response
```

#### Error
```
422: Validation Error
```
