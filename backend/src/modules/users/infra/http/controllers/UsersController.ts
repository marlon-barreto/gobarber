import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersService';

// index, show , create , update , delete

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Remove user password do retorno
    delete user.password;

    response.json(user);
  }
}
