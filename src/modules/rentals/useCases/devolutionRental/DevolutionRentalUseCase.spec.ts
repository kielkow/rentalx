import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

let devolutionRentalUseCase: DevolutionRentalUseCase;

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe('Devolution Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();

    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to devolution a rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    const rental = await rentalsRepositoryInMemory.create({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    const devolutionRental = await devolutionRentalUseCase.execute({
      id: rental.id,
    });

    const { available } = await carsRepositoryInMemory.findById(car.id);

    expect(devolutionRental).toHaveProperty('total');
    expect(devolutionRental).toHaveProperty('end_date');
    expect(devolutionRental.total).toEqual(160);
    expect(devolutionRental.end_date).toBeTruthy();
    expect(available).toEqual(true);
  });

  it('should not be able to devolution a rental that does not exists', async () => {
    expect(async () => {
      await devolutionRentalUseCase.execute({
        id: 'invalid-id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
