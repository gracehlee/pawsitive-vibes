## 4.15.24 - 4.18.24
Group independently worked on the first endpoint (pets - POST), compared, and then moved onto other endpoints
Created api/queries/pets.py and pool.py
Created api/routers/pets.py
Created PetsIn, PetsOut, PetsRepository

Set up tables in migrations. Adjusted PetsIn / PetsOut to the SQL table our group agreed on.
Submitted POST requests to /pets, and (checking beekeeper) they exist in the data.

Started working on authorization, and it is now required for pet POST
More work done on endpoints

Created endpoints for users - get all, get one, update and delete

## 4.22.2024 - 4.26.2024
Submitting user endpoints
Working on Frontend for user signup form
Created user signup form with additional fields, in SignUpForm.jsx

Group is working on the POST form for each of the other endpoints, while Grace works on frontend Navigation to connect to them

Working on POST for pets, CreatePetForm.jsx
"for_sale" Checkbox results in boolean value added to form
Price input is displayed when "for_sale" is checked (true)

Working on PUT for pets, UpdatePetForm.jsx
