# Northcoders-News-API

A Reddit-style news API, socially curated by site members.

Northcoders back-end project. API hosted on Heroku: https://nc-news-hm.herokuapp.com/api/

Front-end project can be found here: https://github.com/hvmurphy/NC-News

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Below are a number of packages you will require in order to run this project:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- Code editor such as [VS Code](https://code.visualstudio.com/)

### Installing

- Clone this repo to your local machine 
```
git clone https://github.com/hvmurphy/Northcoders-News-API.git
```
- Install the required dependencies
``` 
$ cd Northcoders-News-API
$ npm install
```
- If you are using linux you will need to provide your postgres username and password.  This can be done by inserting  your username and password into the knexfile.js as shown below **(Please ensure that the knexfile.js is added to the .gitignore if you wish to push to a public repository)**:

```  const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      username: myUsername,
      password: myPassword
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: myUsername,
      password: myPassword
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
    username: myUsername,
    password: myPassword
  }
};     
```

- Set-up the Database
```
npm run setup:dbs
```
- Seed the Database
```
npm run seed
```
- Start local server
```
npm start
```

### Running the Tests
Testing is conducted using Mocha, Chai, Supertest.

To run the tests:
```
npm start
```

### Deployment

This API is hosted on Heroku, the deployed version of the site can be found [here](https://nc-news-hm.herokuapp.com/api/)

If you wish to deploy to your own site, please follow the instructions on the [Heroku site](https://devcenter.heroku.com/categories/deployment)

### Built With
- Node.js (in VS Code) - Javascript runtime environment
- postgreSQL - Relational database
- Knex.js - SQL query builder
- Express - Web application framework
- Heroku - Platform used to host the API

### Authors
- Holly Murphy 

**Thanks for visiting!**
