import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw { status: 400, message: 'Token missing' };
    }

    const [, token] = authHeader.split(' ');

    const { sub: user_id } = verify(
      token,
      'd2e3a40eae0ed07a8a26c51cbf0d3d34',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw { status: 400, message: 'User does not exists' };
    }

    return next();
  } catch (error) {
    return response
      .status(error.status || 400)
      .json({ message: error.message || 'Invalid token' });
  }
}
