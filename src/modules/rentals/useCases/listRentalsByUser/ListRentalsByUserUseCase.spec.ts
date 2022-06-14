import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

let listRentalsByUserUseCase: ListRentalsByUserUseCase;

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe('Devolution Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();

    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      rentalsRepositoryInMemory,
    );
  });

  it('should be able to list a rental from an user', async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: 'car name',
      description: 'car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car brand',
      category_id: 'category_id',
    });

    await rentalsRepositoryInMemory.create({
      user_id: 'user_id',
      car_id,
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    const listRentalsByUser = await listRentalsByUserUseCase.execute('user_id');

    expect(listRentalsByUser).toHaveProperty('length');
    expect(listRentalsByUser.length).toEqual(1);
  });
});
