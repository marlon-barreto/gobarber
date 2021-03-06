import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
// import User from '../infra/typeorm/entities/User';

import path from 'path';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const {token} = await this.userTokensRepository.generate(user.id);


    const forgotPassWordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
      );


    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperacao de senha',
      templateData:{
        file: forgotPassWordTemplate,
        vaiables: {
          name: user.name,
          token,
          link:`http://localhost:3000/reset_password?token${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
