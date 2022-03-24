# SMS-API

This is a simple sms api deployed [here](https://mymoneykarma-api.herokuapp.com/)

## Steps to run this project:

1. Run `npm i` command
2. Make sure you have node, redis and postgreSQL installed.
3. Change the `.env.example` file to `.env`
4. Fill up the credentials in `.env`
5. Run `npm start` command
6. Run scripts in /src/utils/queries to prepopulate database with necessary data

## Available routes

1. https://mymoneykarma-api.herokuapp.com/login [POST]
2. https://mymoneykarma-api.herokuapp.com/outbound/sms (protected) [POST]
3. https://mymoneykarma-api.herokuapp.com/inbound/sms (protected) [POST]

## Technologies used

- Typescript
- Node.js
- Express
- REST Communication Protocol
- Redis
- TypeORM
- PostgreSQL

## Note
1. Authorization follows the Bearer [token] pattern. To access private routes, copy the token received during login into the authorization header.
2. The api accepts only POST request

## Running Tests
1. Create a test database and fill up the credential in your `.env`
2. Run `npm run test` and it will create the tables. The test may fail.
3. Run the script in `/db/testSeed.sql` to prepopulate your db
4. Run `npm run test` again. This should pass.
