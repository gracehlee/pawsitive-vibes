### James' Final Project Jounal

## 04/12/2024

- Group worked on wireframe design and possible endpoints
- Brought down initial git repository and familiarized ourselfs with structure and files

## 04/15/2024 - 04/18/2024
- created models queries and routers subdirectory of api directory
- created pets.py, pets_router.py pets_queries.py
- study learn material on SQL tabes and FastAPI

Our group decided to individually work on a POST endpoint for pets. In order to study up on FastAPI and get ready to use it for the backend of our project. Overall I'm begining to grasp SQL and it's bringing back material I learned in a college SQL class almost 3 years ago now. FastAPI is another backend framework I already can tell I will enjoy working with. It's straight forward and easy to learn and the docs feature in the browser will be a great tool. I'm also begining to see the control you're given with structuring the database and how FastAPI will interact with that. Unlike Django doing this for you.

## 04/22 - 04/26
- Wrote testimonials.py, testimonials_queries.py and testimonials_router.py
- Created 005_create_testimonials.py in migrations directory
- tested endpoints for POST, GET, PUT and DELETE

Our group tasked out the endpoints of the projects and I will be working on the endpoints for testimonials. I've written out the CRUD functions in the testimonial_routers.py to provide database interactions for creating, listing all, editing and deleting a testimonial. FastAPI's docs tool in the brower was great in testing all of these endpoints. I've included error handling for authentication and in the case there are no testimonials in the database. The default return code for a successful request is 200.

## 04/20/2024 - 05/02/2024
- Wrote Testimonials.jsx, CreateTestimonialsForm.jsx, GetAllTestimonials.jsx, StarRating.jsx and TestimonialCarousel.jsx
- Added CSS files for Testimonials and TestimonialsCarousel
- updated database for testimonials adding a boolean value for a new approved attribute.
- created a list view for admins to view all testimonials and update(PUT) the approved attribute and also functionality to delete a testimonial


This week I began working on the frontend components for testimonials. I've created A form to fill out and submit testimonials. I took some time to figure out how I would implement stars on the page to represent a review rating from 1-5. After some research I decided to write out a new component called StarRating this component accepts three properties via desctructuring, the count that is used to create a count lengthed array and used to display the number of stars. The value for the number of stars selected and a callback function called onChange to handle the rating changing. It used the index of the array and parses this to an int after adding 1 to account for zero indexing. This was important as the database expected an int value for a testimonial. The result was really satisfying as you can now add a star rating to your testimonial. I also dealt with authentication as only a logged in user can submit a testimonial and only a logged in admin user can view the list of all the testimonials. An admin can then delete or approve a testimonial from this list. Once approved the testimonial will be added to a carousel of testimonials on the home page.

## 05/06/2024 - 05/10/2024
- Finished Testimonials Carousel
- Implemented an images Carousel
- Added Google Maps API for service area

Debugging has been a process throughout the entire project but has become more of a focus this week. I've also added a Images Carousel using the owner previous static pictures. I've hard coded them in and stored the images in a seperate folder. I also reasearched GoogleAPI's and am using the Google maps javascript api to integrate a google map of the service area using GoogleMapReact I had to enable the api from google and learn best practices for hiding that api key. 
