import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private reprository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.reprository = getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  async list(): Promise<Category[]> {
    const categories = await this.reprository.find();
    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.reprository.create({
      name,
      description,
    });

    await this.reprository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.reprository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
