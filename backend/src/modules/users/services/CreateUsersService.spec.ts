import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUsers', () => {
  it('shoud be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shoud not be able to create a new user on the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

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
      createUsersService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
