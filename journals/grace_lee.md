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

Finally, I revised some of the formatting and css for our forms. While this might not be the final design of these forms, at least it provides a clear and understandable format to work with until we change it later.

## 4.25.2024

Today I worked on:

Goals for today are to work on modifying our user schema and related back end to include a user property called "admin" as a boolean true/false. This will hopefully allow us to access the user properties through the use of Auth Service (user.admin) and lock features behind admin status on the front end side.

-   secondarily, if I have time, I want to see if I can debug some of the console errors we've been getting. We've been seeing some errors that say: utils.js:12 GET http://localhost:8000/api/auth/authenticate 404 (Not Found)
-   Per Rosheen, de-prioritize the console dev errors because some of those may be due to the time it takes to load the app.

-   I confirmed with Amy that back end auth JWT token should be used for endpoints that can only be accessed when user is logged in. Per Amy, if we are not logged in and hypothetically had access to a form with that particular endpoint, the logged-out visitor will not be able to submit the form. This shouldn't be an issue in our app since on the front-end side, we've made forms and parts of the app not accessible if a user is logged out.

-   I worked with Kyle to adapt our user schema, queries, and router to make sure the newly added properties are working properly, and confirmed that the FastAPI docs show the endpoints are still working. Through pair programming, we are adjusting some of our database schemas and making sure all of the other components are working well. We repeated this process for our pets, testimonials, and services.

I created a footer for our page, and will be working on adapting a contact form component in the footer. Goals for tomorrow are to work on a functional contact form, and integrate the contact form into our footer.

## 4.26.2024

Today I worked on:

Today I refactored some of our page components and routings. I also created a Community page with a sidebar navigation that will render different content based on user interaction.

CSS work:

-   invisible scrollbar
-   standardize form css for all our forms
-   Community tab side navigation toggle

I was also able to debug the "Sign in failed" error we were seeing in our forms. Our Auth Service would throw an error upon failed sign in, but it was not clearing the error after the user successfully signed in. I added a function clearError and called the function for each of the signup, signin, and signout for good measure. This removed the "Sign in failed" error from our forms once the user was logged in and navigated to our other pages.

Next, I want to apply transitions to the pages of our SPA app.
https://reactcommunity.org/react-transition-group/

I also want to figure out a way to render a different page height based on whether a form is toggled or not.

## 4.28.2024

Today I worked on:

I'm working on the sidebar menu for the Community tab, but still considering different design aspects of it. It is a neat feature to have a toggle sidebar, but we could also do a drop-down menu. I'll see if I can optimize the design of the sidebar, and if it doesn't look nice, I might switch over to a dropdown menu from Nav instead.

## 4.29.2024

Today I worked on:

I created a favicon icon to match the business logo, replaced the home button with this favicon, and added the business logo as a header on the home page.

I want to apply CSS animations to the pages of the SPA when they load in. I'm currently researching keyframes, but also read about CSS transitions. I'll be creating some draft CSS files to work with.

## 4.30.2024

Today I worked on:

The focus for today will be to work on a Contact form, and to give it EmailJS functionality. However, as I was building my form, I realized that I would want to have some way of getting user information to pre-fill the forms potentially. While exploring that, I also realized that we need to track admin status throughout our various pages and set a way to refresh a page after a user has logged out, so that the state is no longer showing elements that are for admins or users only.

-   refactored Kyle's user fetch - admin logic to be part of App.jsx top level
-   passed the admin down as a prop to child components
-   set a state "refresh" to be passed to child components so that refresh occurs when refresh is updated with signout

I worked on our Contact Form and have the basic layout completed. I added a fetch request to update the form fields with the user info if the user is logged in. Tomorrow, I hope to work on EmailJS functionality for it.

## 5.1.2024

Today I worked on:

Today, I'm working on email functionality for the Contact Form, drop-down menu for the navigation Community tab, and User Profile components.

Resource: https://react-bootstrap.netlify.app/docs/components/dropdowns/


I finally got the Contact Form and EmailJS service up and running.
Resource: https://www.emailjs.com/docs/examples/reactjs/
- refactored the Contact Form to use variables imported from config.js
- to set up the config file, in ghi directory, create config.js and paste in the following:
    - export const PUBLIC_KEY = '5FO8dA-tJnoAnlmDx'
    - export const TEMPLATE_ID = 'contact_form'
    - export const SERVICE_ID = 'service_wflr4qv'
    - export const PV_EMAIL = 'pawsitivevibescolorado@gmail.com'
- these keys can be changed in the future for security purposes.

## 5.2.2024
Today I worked on:

I added regex validation to the Contact Form, with some success and error message handling and display in the form. I will be adjusting the Sign Up Form in a similar fashion. I would like to explore connecting email to a "Forgot Password" page as well, so users can get an email to reset their password if applicable. But I will be exploring that later as a stretch goal. Now that the Community tab has a drop down menu, I will be working on the Community Welcome page. Then I'll work on the User Profile page, where I will do a fetch GET request to retrieve the user info and input it into a profile format. Then I will work on UPDATE (PUT) functionality to allow the user to update their profile info.

TO DO:
- 1 unit test for today
- Sign Up Regex Validation - DONE
- Community Profile page (USER GET)
- Profile Update (USER PUT)
- more unit tests
- Meet Ups schema, model, queries, router, GET, PUT, DELETE
- Google Maps API
- Account banning and blocked emails list?
