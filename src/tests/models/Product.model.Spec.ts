import database from "../../configs/db.config";
import ProductModel from "../../models/Product.model";
import { Product } from '../../types/Product.interface';

const PRODUCT = new ProductModel();

describe('Test Product Model', () => {
  it('getProducts method should be exists', () => {
    expect(PRODUCT.getProducts).toBeDefined();
  });

  it('getProductById method should be exists', () => {
    expect(PRODUCT.getProductById).toBeDefined();
  });

  it('getProductByCat method should be exists', () => {
    expect(PRODUCT.getProductsByCategory).toBeDefined();
  });

  it('createProduct  method should be exists', () => {
    expect(PRODUCT.createProduct).toBeDefined();
  });

  it('deleteProduct method should be exists', () => {
    expect(PRODUCT.deleteProduct).toBeDefined();
  });

  it('test create a Product using createProduct method', async () => {
    const product: Product = await PRODUCT.createProduct({
      name: 'Lenovo Ideapad Intel Core i7 10800H',
      price: '1500',
      category: 'laptop'
    });

    expect(product).toEqual({
      id: 1,
      name: 'Lenovo Ideapad Intel Core i7 10800H',
      price: '1500',
      category: 'laptop'
    });
  });

  it('test get products using getProducts', async () => {
    const products: Product[] = await PRODUCT.getProducts();

    expect(products).toHaveSize(1);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Lenovo Ideapad Intel Core i7 10800H');
    expect(products[0].price).toBe('1500');
    expect(products[0].category).toBe('laptop');
  });

  it('test get product using getProductById', async () => {
    const id = 1;
    const product: Product = await PRODUCT.getProductById(id);
    
    expect(product.id).toBe(id);
    expect(product.name).toBe('Lenovo Ideapad Intel Core i7 10800H');
    expect(product.price).toBe('1500');
    expect(product.category).toBe('laptop');
  });

  it('test get product using getProductsByCategory', async () => {
    const products: Product[] = await PRODUCT.getProductsByCategory('laptop');
    
    expect(products).toHaveSize(1);
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe('Lenovo Ideapad Intel Core i7 10800H');
    expect(products[0].price).toBe('1500');
    expect(products[0].category).toBe('laptop');
  });

  it('test delete product using deleteProduct', async () => {
    const id = 1;
    const product: Product = await PRODUCT.deleteProduct(id);

    expect(product.id).toBe(id);
    expect(product.name).toBe('Lenovo Ideapad Intel Core i7 10800H');
    expect(product.price).toBe('1500');
    expect(product.category).toBe('laptop');
  });

  afterAll(async () => {
    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'

    await connection.query(sql);

    connection.release();
  });
});
