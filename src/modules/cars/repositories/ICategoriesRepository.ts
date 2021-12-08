import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
