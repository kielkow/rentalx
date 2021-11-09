import { ListCategoryUseCase } from "./ListCategoryUseCase";
import { ListCategoryController } from "./ListCategoryController";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

const categoriesRepository = new CategoriesRepository();
const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export {
    listCategoryUseCase,
    listCategoryController
}
