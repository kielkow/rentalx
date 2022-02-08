import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.post(
  '/',
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoutes };
