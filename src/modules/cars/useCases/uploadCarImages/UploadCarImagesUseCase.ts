import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    const carImages = await this.carsImagesRepository.findByCarId(car_id);

    images_name.map(async image => {
      for (const carImage of carImages) {
        const imageNotExists = image.split('-')[1];
        const imageExists = carImage.image_name.split('-')[1];

        if (imageNotExists === imageExists) {
          this.carsImagesRepository.delete(carImage.image_name);
          this.storageProvider.delete(carImage.image_name, 'cars');
        }
      }

      await this.carsImagesRepository.create(car_id, image);
      this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };
