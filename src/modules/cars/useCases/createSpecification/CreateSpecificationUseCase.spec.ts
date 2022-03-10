import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to create a new specification', async () => {
    const specification = {
      name: 'specification name test',
      description: 'specification description test',
    };

    await createSpecificationUseCase.execute(specification);

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty('id');
  });

  it('should not be able to create a specification with the same name', async () => {
    const specification = {
      name: 'specification name test',
      description: 'specification description test',
    };

    await createSpecificationUseCase.execute(specification);

    expect(async () => {
      await createSpecificationUseCase.execute(specification);
    }).rejects.toBeInstanceOf(AppError);
  });
});
