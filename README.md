# superscholar-phase2
Super Scholar phase 2 screening test projects
[LINK TO THE PROBLEM STATEMENTS](https://docs.google.com/document/d/1i2hJDZZ4N6irwbvCdl6Nb-OPVDY-80ZoOtvSxHg_MPI/edit#)

## Project 1 Implement a REST service that exposes the /boards endpoint.  - by using NodeJs Express Js
After cloning the repo, head over to project-1 folder and run `npm install` to install all the dependencies used in the project in your local machine.  
Run `npm test` so that all the integration tests in `__tests__` folder will start running.  

#### Tools and technologies used
- Node js (Javascript Runtime)
- Express (Minimal and flexible Node js web application framework)
- sqlite3 (in memory database to store all the board related data)
- cors (cross origin resource sharing)
- helmet (for securing HTTP headers)
- morgan (for logging)
- jest and supertest (for writing integration tests for our API)

## Project 2 Extension of Part-1 : Authentication Module
After cloning the repo, head over to project-2 folder and run `npm install` to install all the dependencies used in the project in your local machine.  
Run `npm test` so that all the integration tests in `__tests__` folder will start running.  

#### Tools and technologies used
- Node js (Javascript Runtime)
- Express (Minimal and flexible Node js web application framework)
- MongoDB Atlas (cloud database)
- mongoose (Node. js-based Object Data Modeling (ODM) library for MongoDB)
- passport (authentication middleware for Node.js)
- jwt (open standard used to share security information between two parties)
- bcrypt (A library to help you hash passwords)
- axios (Promise based HTTP client for the browser and node.js)
- cors (cross origin resource sharing)
- helmet (for securing HTTP headers)
- morgan (for logging)
- jest and supertest (for writing integration tests for our API)

## Part 3 : Integration of External API using axios
*Link to external API* `https://jsonmock.hackerrank.com/api/articles?page=<pageNumber>`
where pageNumber is an integer where 1 <= pageNumber <= total_pages. total_pages is one of the fields in the JSON data.  
Head over to **`part3_externalAPI`** folder in **`project-2`** folder. You find two functions `fetchArticles.js` and `topArticles.js`.
1. `fetchArticles.js` contains the code to fetch all the articles by sending a HTTP get request to the API by going through all of the pages. The number of pages will be known once we got the result from the first page.
2. `topArticles.js` sorts all the retrieved articles based on **no.of comments** and if tie occurs, then **title(title || story_title)** and returns the top **limit** most results where limit is the parameter to the function. 

Unit tests for this function can be found in `__tests__/externalapi.test.js`

