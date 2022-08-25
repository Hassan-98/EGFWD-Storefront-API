CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  status VARCHAR(100) CHECK (status IN ('active', 'complete'))
);