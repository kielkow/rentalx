import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to list categories', async () => {
    const category_1 = {
      name: 'category_1',
      description: 'category_1',
    };
    const category_2 = {
      name: 'category_2',
      description: 'category_2',
    };

    await categoriesRepositoryInMemory.create(category_1);
    await categoriesRepositoryInMemory.create(category_2);

    const categories = await listCategoriesUseCase.execute();

    expect(categories.length).toEqual(2);
    expect(categories[0].name).toEqual('category_1');
    expect(categories[0].description).toEqual('category_1');
    expect(categories[1].name).toEqual('category_2');
    expect(categories[1].description).toEqual('category_2');
  });
});
