import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create an new user', async () => {
    const user: ICreateUserDTO = {
      name: 'jonh doe',
      email: 'jonhdoe@email.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(
      'jonhdoe@email.com',
    );

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual('jonh doe');
    expect(userCreated.driver_license).toEqual('000123');
  });
});
