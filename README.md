# LAB - Class 07

## Project: Bearer Authorization

### Author: Ethan Luxton

### Problem Domain

In this phase, the new requirement is that any user that has successfully logged in using basic authentication (username and password) is able to continuously authenticate … using a “token”

### Links and Resources

[ci/cd](https://github.com/ethan-luxton/basic-auth/actions/workflows/node.js.yml) (GitHub Actions)
[Main Deployment - Backend](https://basic-auth-g9ne.onrender.com)

### Setup

#### .env requirements

-   PORT: 3001
-   DATABASE_URL=postgres://localhost:5432/postgres (Local variable)

#### How to initialize/run your application

npm start

#### Features / Routes

-   Feature One: POST method to signup and signin as a specific user, Postgresql14 database.
    - POST to /signup to create a new user.
    - POST to /signin to login as a user using basic auth and JWT.
-   Feature Two: Testing
-   Feature Three: Deploy to Dev
-   Feature Four: Deploy to main

#### Tests

-   How do you run tests?
    -   npm test
-   Any tests of note?
    - Return a JSON web token when logging in as a user.

### UML

![UML](https://i.imgur.com/bovDTIp.png)