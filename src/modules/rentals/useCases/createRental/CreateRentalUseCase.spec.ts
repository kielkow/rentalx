import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const first_car = await carsRepositoryInMemory.create({
      name: 'first car',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const second_car = await carsRepositoryInMemory.create({
      name: 'second car',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: first_car.id,
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: second_car.id,
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await createRentalUseCase.execute({
      user_id: 'user_id_1',
      car_id: car.id,
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id_2',
        car_id: car.id,
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if the rental time is less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: 'car_id',
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
