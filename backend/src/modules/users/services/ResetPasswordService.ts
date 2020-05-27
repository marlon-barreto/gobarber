import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns'

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { AdvancedConsoleLogger } from 'typeorm';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) {}

  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user){
      throw new AppError('User does not exists');
    }

    const tokenCreateAt= userToken.created_at;
    const compareDate = addHours(tokenCreateAt,2);

    //Verifica se hora tem diferença de 2 horas.
    if (isAfter(Date.now(),compareDate)) {
      throw new AppError('token expired.');
    }


    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

  }
}

export default ResetPasswordService;
