import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  let user_id: string;
  try {
    const { sub } = verify(
      token,
      'd2e3a40eae0ed07a8a26c51cbf0d3d34',
    ) as IPayload;

    user_id = sub;
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (!user) {
    throw new AppError('User does not exists', 401);
  }

  request.user = {
    id: user_id,
  };

  return next();
}
