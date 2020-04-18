import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    // Valida se usuario ja existe
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    // Grava no objeto
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Grava no banco de dados
    await userRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
