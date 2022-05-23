import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe('Refresh Token User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
    );

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to generate a refresh token from an user', async () => {
    const user: ICreateUserDTO = {
      name: 'jonh doe',
      email: 'jonhdoe@email.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    const authenticationInfo = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const refreshTokenResponse = await refreshTokenUseCase.execute(
      authenticationInfo.refresh_token,
    );

    expect(refreshTokenResponse).toHaveProperty('token');
    expect(refreshTokenResponse).toHaveProperty('refresh_token');
  });

  it('should not be able to generate a refresh token with a nonexistent token', async () => {
    expect(async () => {
      await refreshTokenUseCase.execute('invalid-token');
    }).rejects.toBeInstanceOf(AppError);
  });
});
