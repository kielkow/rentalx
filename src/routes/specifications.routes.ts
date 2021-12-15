import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import listSpecificationsController from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.get('/', (request, response) => {
  return listSpecificationsController().handle(request, response);
});

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
