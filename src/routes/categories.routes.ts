import { Router } from "express";

import { listCategoryController } from "../modules/cars/useCases/listCategory";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

export { categoriesRoutes };
