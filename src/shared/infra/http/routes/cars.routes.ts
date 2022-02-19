import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const createCarRoute = carsRoutes.post('/', createCarController.handle);

const listCarsRoute = carsRoutes.get(
  '/available',
  listAvailableCarsController.handle,
);

const carSpecificationsRoute = carsRoutes.post(
  '/specifications/:id',
  createCarSpecificationController.handle,
);

const carsImagesRoute = carsRoutes.post(
  '/images',
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export {
  createCarRoute,
  listCarsRoute,
  carSpecificationsRoute,
  carsImagesRoute,
};
