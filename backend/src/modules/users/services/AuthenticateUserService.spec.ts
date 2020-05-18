import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('shoud be able to authenticateUser', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const authentcateUser = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(authentcateUser).toHaveProperty('token');
    expect(authentcateUser.user).toEqual(createUser);
  });

  it('shoud be able to authenticateUser whith non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to authenticateUser whith non existing password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
