import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarsImagesRepositoryInMemory implements ICarsImagesRepository {
  carsImages: CarImage[] = [];

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name,
    });

    this.carsImages.push(carImage);

    return carImage;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const images = this.carsImages.filter(image => image.car_id === car_id);
    return images;
  }

  async delete(image_name: string): Promise<void> {
    const image = this.carsImages.find(
      image => image.image_name === image_name,
    );

    const index = this.carsImages.indexOf(image);

    this.carsImages.splice(index, 1);
  }
}

export { CarsImagesRepositoryInMemory };
