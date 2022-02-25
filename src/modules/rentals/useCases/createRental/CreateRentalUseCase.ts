import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );
    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }

    const dateNowToUTC = dayjs(new Date()).utc().local().format();
    const expectedReturnDateToUTC = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const rentalHours = dayjs(expectedReturnDateToUTC).diff(
      dateNowToUTC,
      'hours',
    );
    if (rentalHours < 24) {
      throw new AppError('The rental must have an minimun of 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
