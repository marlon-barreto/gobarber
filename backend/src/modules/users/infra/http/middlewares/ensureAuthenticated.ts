import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // VAlidação do token
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = autHeader.split(' ');

  try {
    // valida token
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };

    console.log(decoded);

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
