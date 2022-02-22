import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    const carImages = await this.carsImagesRepository.findByCarId(car_id);

    images_name.map(async image => {
      // TODO: Delete duplicate images
      for (const carImage of carImages) {
        const imageNotExists = image.split('-')[1];
        const imageExists = carImage.image_name.split('-')[1];

        if (imageNotExists === imageExists) {
          // TODO: Delete from tmp and database
          deleteFile(`./tmp/cars/${carImage.image_name}`);
        }
      }

      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
