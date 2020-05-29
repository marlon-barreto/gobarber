import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';


let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

  });

  it('shoud be able to create a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('shoud not be able to update from non existing user', async () => {


    expect(
      updateUserAvatarService.execute({
        user_id: '',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud delete old avatar when upating new one', async () => {
    const deletefile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deletefile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
