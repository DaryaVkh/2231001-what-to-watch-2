export enum UserRoute {
  REGISTER = '/register',
  LOGIN = '/login',
  TO_WATCH = '/to_watch',
  AVATAR = '/:userId/avatar'
}

export const JWT_ALGORITHM = 'HS256';

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.png';
