#### Grace's Development Journal

## 4.12.2024

Set Up Day

-   Our group successfully worked on our wireframe diagrams and discussed API endpoints.
-   Our group successfully set up our GitLab repositories and downloaded our project base.

## 4.15.2024

Today I worked on:

Understanding the various components of our project. I'm trying to understand how to implement a SQL database and table relations. I created the directory data, and inside created a Dockerfile.dev with commands to load the sql file to the Docker database when Docker runs. The dogs.sql file was also created to hold the SQL code that sets up the data types and table structures for our PostgreSQL database. I set up the basic table structure for the various endpoints we will be working with, but the Appointments table will largely be a work-in-progress depending on how we decide to structure the third party API data.

## 4.16.2024

Today I worked on:

Our group is creating issues and assigning them, with the goal of creating 1 table with migrations this week and completing 1 set of endpoints for our models. I created a few issues that we can reference as we create merge requests. I took the sample data tables created in dogs.sql and transferred them to knew .py files in the directory api/migrations.

Then I worked on creating a pets.py in the directory models, with a pet_queries.py file in the directory queries. The pet_queries.py file contains the various CRUD class functions to create, update, delete, and get a pet(s). I also created the pets_routers.py that so far has one get function defined. I have yet to test these functions yet, but I will work more on that tomorrow.

## 4.17.2024

Today I worked on:

I noticed that my FastAPI docs page was not loading, and found out that it was due to errors in how I've set up my routers. I was able to go back and correctly create endpoints for the model pets. Afterwards, the FastAPI docs page was working properly. I modified my PetQueries repository to return Falsy values instead of an error message, so that the error messages would instead be displayed on the router portion of the app. For error handling, I referenced the user_router.py and decided to use the HTTPException status codes and messages.

## 4.18.2024

Today I worked on:

I completed the SQL Database table showing the relations between our data tables. The users, pets, and appointments tables have relationships, while the services and testimonials tables do not.

![sql relationships table](./images/sql_relationships.png)

Our group split up endpoints to work on. I've already finished all of the pets endpoints for models, queries, and routers; Kyle will be working on the users endpoints, Austin will be working on the services endpoints, and James will be working on the testimonials endpoints. We are hoping to set up our React front-end so we can start testing our database set up.

## 4.20.2024

Today I worked on:

I created the base template for an index.js to create a root for our app, and also created a base template for App.js. I created a folder to hold the base App.js that came with the project files, in case we need to reference anything from it. I'm hoping and planning to modify some Bootstrap HTML formatting to create basic form templates for our various forms, before we also adjust the design to match our client's needs. I have yet to get to it, but I've looked through more of the project files and found that the app favicon icon is decided by the index.html file. Eventually, I hope to re-create a paw icon from the client's logo to be used as the favicon for a more professional business look.

## 4.22.2024

Today I worked on:

Today, we had only 2 members of our project available. Since today was the deadline for last week's stretch goals, we used our time to merge our progress on our issue branches onto the main branch, and then pull the changes so each of us will be able to work off the same checkpoint. I decided to start working on the Navigation (Nav.js) page for our app using React.

I realized that the main.jsx is the file that is serving as the "index.js" similar to our other project. This is where the project is mounted to the ReactDOM. So I deleted the index.jsx file I had created so we can continue using the main.jsx file.

While working on the project with my partner Kyle, we ran into a roadblock where we are unable to see anything displayed on our localhost:5173 page. We are trying to debug this currently.

Update: We were able to troubleshoot it- by deleting and recreating the database_volume and re-starting the docker containers, we were able to see our changes in the localhost:5173.

## 4.23.2023

Today I worked on:

Today, I debugged our user creation models, queries, and router so that we are able to create a new unique user using FastAPI with a 200OK response. I also applied the back-end authentication that will require the correct FastAPI Token before one is able to perform any of the user APIs, with the exception of creating a new user.

We were running into a duplicate router error, and we were able to find the source of the bug in the App.jsx file. We removed the BrowserRouter there, since we already have a Router set in our main.jsx. So far, on the localhost:5173 page, I'm able to see our page title "Pawsitive Vibes" with a link that redirects home, but I have yet to see the navigation page I've worked on. I'll work on debugging this today.

1. front end auth
2. Work on React forms jsx files.
3. Navigation

I've revised our main.jsx to not hold the BrowserRouter, and instead moved that to our App.jsx. Now, the App.jsx holds the various components of our pages that can be accessed by clicking the NavLinks in our Nav.jsx. The UI design still needs to be refined, but the base is available to build upon.

I noticed that the SignUp form needed to be restructured, so I edited some of the fields and removed the labels for a better interface. This, however, is not a complete SignUp form as I'm unable to create a new user using the form due to some errors. Since Kyle is working on this, I'll leave him to debug this for now.

Update: Kyle and I were able to work together to have a working Sign Up, Sign Out, and Sign In Form. Now the main errors we are facing is that we are unable to see our pages (ie. Create a Pet Form) when we click on the NavLink, most likely because something is wrong on the authentication side for our app. This is a roadblock we have and we will work on this more tomorrow.

## 4.24.2024

Today I worked on:

I was able to debug our web components that were rendering errors when accessed and redirecting to main "/" path rather than the page itself once the user was logged in. The culprit was in some lines of code that redirected the user to main through the use of Navigate, which I deleted from the CreatePetForm. I also added business logic to the front end routing on the Nav to not display certain links if the user is logged in VS logged out - however, this does not stop the user from accessing those pages if they type it into their browser. So I will be working on limiting the components hopefully in App.jsx as well.

I took the time to refactor some of our Nav links and App component pages. Instead of having individual routes for the Create Pets or Create Services form, I made the forms render on a "Aussie Dogs" page and "Services" page. I have yet to add the logic for a conditional, but the idea is that by checking if the user is logged in, the "Add a Dog" button would be visible. In the future, only admins will be able to access the button to "Add a Service" on the services page. Also, by adding conditional logic to the App.jsx, we made sure that users cannot access certain pages by brute-forcing a direct URL into the browser. When these pages are visited while the user is logged out, they can see the Dog and Services page, but there is no button to toggle the forms for adding a pet or service.
