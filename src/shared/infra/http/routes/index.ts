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
import {
  listCategoriesRoute,
  createCategoryRoute,
  importCategoriesRoute,
} from './categories.routes';
import { rentalsRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/cars', listCarsRoute);
router.use('/categories', listCategoriesRoute);

router.use(ensureAuthenticated);

router.use('/cars', ensureAdmin, createCarRoute);
router.use('/cars', ensureAdmin, carSpecificationsRoute);
router.use('/cars', ensureAdmin, carsImagesRoute);

router.use('/rentals', rentalsRoutes);
router.use('/categories', ensureAdmin, createCategoryRoute);
router.use('/categories', ensureAdmin, importCategoriesRoute);
router.use('/specifications', specificationsRoutes);

export { router };
