import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

class ListCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryService }
