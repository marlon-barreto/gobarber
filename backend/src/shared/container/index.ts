import { container } from 'tsyringe';

import IAppointmenstRepository from '@modules/appointments/repositories/IAppointmenstRepository';
import AppointmenstsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmenstRepository>(
  'AppointmenstsRepository',
  AppointmenstsRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
