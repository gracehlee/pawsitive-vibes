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

Group is working on the POST form for each of the other endpoints, while Grace works on frontend Navigation connecting them

Working on POST for pets, CreatePetForm.jsx
"for_sale" Checkbox results in boolean value added to form
Price input is displayed when "for_sale" is checked (true)

"for_sale" Checkbox results in boolean value added to form
Price input is displayed when "for_sale" is checked (true)

Working on PUT for pets, UpdatePetForm.jsx

Refactored tables for additional fields and updated all corresponding code so endpoints function properly.
Removed test print statements

Removed "age" from pets, in all corresponding code
Required fields on CreatePetForm, so pets submits properly and receives 200 OK response
Added "date" and "time" to appointments table

Changed Appointment table "event" to "service_id" and referenced services table "id",
ON DELETE RESTRICT to preserve appointments

Changed Appointment table "user_id" to reference users ("id"),
ON DELETE RESTRICT to preserve appointments

Created appointments.py, appointment_queries.py and appointment_router.py
Created CreateAppt.jsx
Minor changes to service_queries GET, to return "Services not found" if there are no services.
Tested all endpoints and they function correctly
Updated CSS so the footer adjusts to page length
Updated frontend homepage text
Updated Footer with email address, "Contact Us", and FB_Logo/IG_Logo img with href opening either in a new tab.

## 4.29.2024 - 5.2.2024
TODO: Location for appointments.

TODO: Would you like to receive a phone call or email confirmation if approved?
If yes,
If no, "Ok, I look forward to seeing you at {location} on {date} at {time}"

TODO: Consolidate CreatePetForm and SellPetForm, add conditional statements

getUserConfirmation: func
A function to use to confirm navigation. You must use this option when using <MemoryRouter> directly with a <Prompt>.
PACFA compliant - trains in presence of owner, and doesn't breed more than 2 litters per year
