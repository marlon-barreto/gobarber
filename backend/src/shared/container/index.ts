import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmenstRepository from '@modules/appointments/repositories/IAppointmenstRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IAppointmenstRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
