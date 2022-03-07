import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

const listCategoriesRoute = categoriesRoutes.get(
  '/',
  listCategoriesController.handle,
);

const createCategoryRoute = categoriesRoutes.post(
  '/',
  createCategoryController.handle,
);

const importCategoriesRoute = categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { listCategoriesRoute, createCategoryRoute, importCategoriesRoute };
