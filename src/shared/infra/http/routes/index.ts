import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { authenticateRoutes } from './authenticate.routes';
import { createCarRoute, listCarsRoute } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/cars', listCarsRoute);

router.use(ensureAuthenticated);

router.use('/cars', createCarRoute);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
