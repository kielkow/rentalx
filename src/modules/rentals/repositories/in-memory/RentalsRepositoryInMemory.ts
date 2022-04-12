import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id,
      user_id,
      car_id,
      end_date,
      expected_return_date,
      start_date: new Date(),
      total,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };
