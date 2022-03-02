import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { authenticateRoutes } from './authenticate.routes';
import {
  createCarRoute,
  listCarsRoute,
  carSpecificationsRoute,
  carsImagesRoute,
} from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalsRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/cars', listCarsRoute);

router.use(ensureAuthenticated);

router.use('/cars', ensureAdmin, createCarRoute);
router.use('/cars', ensureAdmin, carSpecificationsRoute);
router.use('/cars', ensureAdmin, carsImagesRoute);

router.use('/rentals', rentalsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
