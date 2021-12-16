import { Router } from 'express';

import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
