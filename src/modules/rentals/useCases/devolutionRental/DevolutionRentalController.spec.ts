import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Devolution Rental Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to devolution a rental', async () => {
    const {
      body: { token },
    } = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { body: category } = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const { body: car } = await request(app)
      .post('/cars')
      .send({
        name: 'name',
        description: 'description',
        daily_rate: 100,
        license_plate: 'license_plate',
        fine_amount: 100,
        brand: 'brand',
        category_id: category.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const tomorrow_timestamp = new Date(
      new Date().setDate(new Date().getDate() + 1),
    );

    const { body: rental } = await request(app)
      .post('/rentals')
      .send({
        car_id: car.id,
        expected_return_date: tomorrow_timestamp.toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post(`/rentals/devolution/${rental.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('end_date');
    expect(response.body).toHaveProperty('total');
    expect(response.body.end_date).toBeTruthy();
    expect(response.body.total).toEqual(200);
  });
});
