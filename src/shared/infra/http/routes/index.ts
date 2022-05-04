import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalsRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/password', passwordRoutes);

export { router };
