import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

const createCarRoute = carsRoutes.post('/', createCarController.handle);

const listCarsRoute = carsRoutes.get(
  '/available',
  listAvailableCarsController.handle,
);

export { createCarRoute, listCarsRoute };
