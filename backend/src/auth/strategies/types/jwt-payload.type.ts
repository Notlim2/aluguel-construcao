import { User } from '../../../users/domain/user';

export type JwtPayloadType = Pick<User, 'id'> & {
  iat: number;
  exp: number;
};
