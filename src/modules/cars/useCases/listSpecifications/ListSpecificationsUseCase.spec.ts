import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

let listSpecificationsUseCase: ListSpecificationsUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('List Specifications', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    listSpecificationsUseCase = new ListSpecificationsUseCase(
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to list specifications', async () => {
    const specification_1 = {
      name: 'specification_1',
      description: 'specification_1',
    };
    const specification_2 = {
      name: 'specification_2',
      description: 'specification_2',
    };

    await specificationsRepositoryInMemory.create(specification_1);
    await specificationsRepositoryInMemory.create(specification_2);

    const specifications = await listSpecificationsUseCase.execute();

    expect(specifications.length).toEqual(2);
    expect(specifications[0].name).toEqual('specification_1');
    expect(specifications[0].description).toEqual('specification_1');
    expect(specifications[1].name).toEqual('specification_2');
    expect(specifications[1].description).toEqual('specification_2');
  });
});
