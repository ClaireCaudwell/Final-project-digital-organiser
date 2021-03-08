# Digital organiser 📆
Digital organiser is my final project as part of the Technigo bootcamp. The idea behind the digital organiser is for the user to sign up to create an account or login to an existing account. When the user is authenticated they will have access to their organiser.

The organiser contains two pages, Schedule and Notes:
1. In schedule page the user can:
    - Create a new task that's added to the users schedule.
    - View their schedule for a week at a time by clicking on a date for that week in the react-calendar.
    - Navigate through the react-calendar to see different months and years and choose dates to add tasks for.
    - Get a summary of the task by clicking on it in the weekly schedule to then either edit or delete the task.
2. In the notes pages the user can:
    - Add a new note.
    - Edit and delete notes.
    - Change the colour of the notes.

I also implemented a toggle button for the user to be able to choose between a light and dark colour themes.

It's a multi-page React app created using React Router, Redux and styled components for the frontend and for the backend a RESTful API created using Express and Node.js with the data being collected and stored via Mongoose and MongoDB.

## Idea/concept generation
In order to get a good overview and understanding of what my applications would need I used a figma board to sketch out the following:
1. Flow of application from frontend to backend and backend to frontend.
2. What API endpoints and requests I would need.
3. What react components would be necessary.
4. How the redux store could be used in relation to json responses from the backend and what state manangement I would need to help with the overall flow of the application.
5. What react router paths would be necessary.
6. And how the styling of my application would look.

## Backend
1. The first part of the process was to build the backend and my API endpoints. After sketching these out based on my application flow and idea I created the mongoose schema and model for each user. This consists of the users username, password and access token and also two arrays for both the users schedule tasks and notes.
2. After building up the endpoints I tested them out using Postman to ensure that they were working as intended and checked that data was being stored in the database as required using MongoDB Compass.

## Frontend
1. Once the backend was up and running I focused on creating the page and component structure so I knew where the data returned from the backend would need to be access when passed from the redux store.
2. Then it was time to implement the react router navigation between different components and pages.
3. When I felt that the general structure of components and flow navigating between them was ok I went on to set up each redux store. I decided to create four different redux stores, user, task, weeklySchedule and notes. Each one handling, via thunks, the fetch and json response returned from the different API endpoints depending on what the user does. For example when the user signs up or logs in the user reducer handles the json response returned and stores in the intial state the username, user ID, access token, status and error messages.
4. After the process of setting up the redux stores I updated each component with the relevant code relating to if it was selecting or dispatching data to and from the redux stores. 
5. I implemented react-calendar, date and time picker and used moment.js to handle converting dates from strings to date objects and vice versa when displaying and dispatching new dates etc. 
6. The list of weekly task objects that are returned in the GET request from the backend (if the user has created any tasks for that week) are sorted into chronological order and then pushed into a new array that matches the getDay() number that the task is equivalent to based on it's date.
7. Once I felt all the functionality was up and running and working error free I then went on to style the application and make it suitable for mobile tablet and desktop devices using styled components. This was alot of fun to do especially when working with props and figuring out how to hide the button on the addedittask component that is shown when the screen size is larger than 750px. On the smaller view the component is shown on it's own route and the button is needed to navigate back to the schedule page.
8. I also implemented the toggle colour scheme using redux to change the state to either "checked" or "unchecked" depending on if the toggle checkbox was checked or not. This then controls which colour theme file is show where if "checked" then show the dark theme and "unchecked" show the light theme.
9. Finally I deployed both the front and backend and checked the application on Chrome, Safari and Firefox with a few differences that I fixed.

## View it live
1. Backend RESTful API: https://claires-digital-organiser.herokuapp.com/
2. Frontend: https://claires-digital-organiser.netlify.app/
