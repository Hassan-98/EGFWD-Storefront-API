# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:  `GET '/api/products'`
- Show:  `GET '/api/products/:id'`
- Create (args: Product) [token required]: `POST '/api/products/'`
- Delete: `DELETE '/api/products/:id`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category: `GET '/api/products/cat/:category'`

#### Users
- Index [token required]: `GET '/api/users/' (token)`
- Show [token required]: `GET '/api/users/:id' (token)`
- Create (args: User) [token required]: `POST '/api/users/'`
- Delete [token required]: `DELETE '/api/users/:id'`

#### Orders
- Index [token required]: `GET '/api/orders/:user_id'`
- Current Order by user [token required]: `GET '/api/orders/current/:user_id'`
- Active Orders by user [token required]: `GET '/api/orders/active/:user_id'`
- Update order's status [token required]: `PATCH '/api/orders?status=<status>&orderId=<order id>`
- Delete [token required]: `DELETE '/api/orders/:id`
- [OPTIONAL] Completed Orders by user [token required]: `GET '/api/orders/completed/:user_id'`

## Data Shapes
#### Product
- id `SERIAL [PRIMARY KEY]`
- name `VARCHAR(150) [NOT NULL]`
- price `SERIAL NUMERIC [NOT NULL]`
- category `VARCHAR(70)`

#### User
- id `SERIAL [PRIMARY KEY]`
- firstName `VARCHAR(100) [NOT NULL]`
- lastName `VARCHAR(100) [NOT NULL]`
- password `VARCHAR(150) [NOT NULL]`

#### Orders
- id `SERIAL [PRIMARY KEY]`
- user_id `INTEGER [REFERENCES users(id)]`
- status of order (active or complete) `VARCHAR(100) [CHECK (status IN ('active', 'complete'))]`
- 
#### Order Products
- id of the order `INTEGER [REFERENCES orders(id)]`
- id of product in the order `INTEGER [REFERENCES products(id)]`
- quantity of each product in the order `INTEGER [DEFAULT 1]`
