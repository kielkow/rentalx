import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { ProfileUserUseCase } from './ProfileUserUseCase';

let profileUserUseCase: ProfileUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Profile User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to get user profile info', async () => {
    await usersRepositoryInMemory.create({
      name: 'jonh doe',
      email: 'jonhdoe@email.com',
      password: '123456',
      driver_license: '000123',
    });

    const user = await usersRepositoryInMemory.findByEmail('jonhdoe@email.com');

    const profile = await profileUserUseCase.execute(user.id);

    expect(profile.id).toEqual(user.id);
    expect(profile.name).toEqual(user.name);
    expect(profile.email).toEqual(user.email);
    expect(profile.driver_license).toEqual(user.driver_license);
  });
});
