import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  image_name: string;
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<void> {
    console.log(car_id, image_name);
  }
}

export { UploadCarImageUseCase };
