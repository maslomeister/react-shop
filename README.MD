# [Open deployment](https://maslomeister.github.io/react-shop/)

### Description

This is small shop website

- backend - nodejs, express, node-json-db
- frontend - react, react-router, redux(no toolkit), css modules

There are two accounts available:

- Customer - `login: Customer, password: qwertycustomer` - this is an **user** account, it can buy products
- Admin - `login: Admin, password: qwertyadmin` - this is an **admin** account, it can edit product information

**You can aslo register new user accounts**

### Local usage

1. Go to backend folder
2. run `npm i` command and then run `npm start` command
3. Wait for server to start
4. Go to frontend folder
5. run `npm i` command and then run `npm start` command
6. Wait for client to start
7. Open [http://localhost:3000/react-shop](http://localhost:3000/react-shop) to view it in your browser.

### Unit and integration testing

#### Test coverage is around 98%

Run `npm run test` to run all unit/integration tests and get coverage report
