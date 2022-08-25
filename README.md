# Storefront Backend API [Hassan Ali]

This is storefront backend API for an online store.

database schema and API routes & endpoints can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
Run the following command at the root directory to install all packages.

`yarn` or `npm install`


## Set up Database
### Create Databases
You should create development and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO shopping_user;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`npm run migrate:up`


## Enviromental Variables Set up
enviromental variables values are used in developement and testing needs to be set in a `.env` file. 
```
# Main Server Info
PORT=3000

# Node Env
NODE_ENV="development"

# POSTGRES Connection
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=storefront
TEST_DATABASE_NAME=storefront_test
DATABASE_USER=shopping_user
DATABASE_PASSWORD=password123

# API Secrets
JWT_SECRET="storefront_jdywo_jwt_47618_#secret"
BCRYPT_SECRET="storefront_lamvv_bcrypt_82746_#secret"
BCRYPT_SALT=10
```

## Start Application
`yarn dev` or `npm run dev`
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoints
endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

Tokens should be passed in the requests header as 
```
Authorization: Bearer <token>
```

## Testing
Run app unit testing with `npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

