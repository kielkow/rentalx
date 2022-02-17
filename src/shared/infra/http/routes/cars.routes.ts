import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const createCarRoute = carsRoutes.post('/', createCarController.handle);

const listCarsRoute = carsRoutes.get(
  '/available',
  listAvailableCarsController.handle,
);

const carSpecificationsRoute = carsRoutes.post(
  '/specifications/:id',
  createCarSpecificationController.handle,
);

export { createCarRoute, listCarsRoute, carSpecificationsRoute };
