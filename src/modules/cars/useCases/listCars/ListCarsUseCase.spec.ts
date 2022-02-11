import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const carAvailable = await carsRepositoryInMemory.create({
      name: 'car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([carAvailable]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'another car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      name: 'car available',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'another car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'another car brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'car brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'another car available',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'another car brand',
      category_id: 'another_category_id',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
