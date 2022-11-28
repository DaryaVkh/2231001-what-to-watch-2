import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {Controller} from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {UploadFileMiddleware} from '../../middlewares/upload-file.middleware.js';
import {ValidateDtoMiddleware} from '../../middlewares/validate-dto.middleware.js';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectid.middleware.js';
import {COMPONENT} from '../../types/component.type.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common-functions.js';
import MovieResponse from '../movie/response/movie.response.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UserResponse from './response/user.response.js';
import {UserServiceInterface} from './user-service.interface.js';
import {UserRoute} from './user.models.js';

@injectable()
export default class UserController extends Controller {
  constructor(@inject(COMPONENT.LoggerInterface) logger: LoggerInterface,
              @inject(COMPONENT.UserServiceInterface) private readonly userService: UserServiceInterface,
              @inject(COMPONENT.ConfigInterface) private readonly configService: ConfigInterface) {
    super(logger);
    this.logger.info('Register routes for UserController.');

    this.addRoute<UserRoute>({
      path: UserRoute.REGISTER,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute<UserRoute>({
      path: UserRoute.LOGIN,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute<UserRoute>({path: UserRoute.LOGIN, method: HttpMethod.Get, handler: this.get});
    this.addRoute<UserRoute>({path: UserRoute.LOGOUT, method: HttpMethod.Delete, handler: this.logout});
    this.addRoute<UserRoute>({path: UserRoute.TO_WATCH, method: HttpMethod.Get, handler: this.getToWatch});
    this.addRoute<UserRoute>({path: UserRoute.TO_WATCH, method: HttpMethod.Post, handler: this.postToWatch});
    this.addRoute<UserRoute>({path: UserRoute.TO_WATCH, method: HttpMethod.Delete, handler: this.deleteToWatch});
    this.addRoute<UserRoute>({
      path: UserRoute.AVATAR,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, 'UserController');
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserResponse, result));
  }

  async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, _res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, `User with email ${body.email} not found.`, 'UserController',);
    }

    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController',);
  }

  async get(_: Request<Record<string, unknown>, Record<string, unknown>, Record<string, string>>, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController',);
  }

  async logout(_: Request<Record<string, unknown>, Record<string, unknown>, Record<string, string>>, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController',);
  }

  async getToWatch({body}: Request<Record<string, unknown>, Record<string, unknown>, {userId: string}>, _res: Response): Promise<void> {
    const result = this.userService.findToWatch(body.userId);
    this.ok(_res, fillDTO(MovieResponse, result));
  }

  async postToWatch({body}: Request<Record<string, unknown>, Record<string, unknown>, {userId: string, movieId: string}>, _res: Response): Promise<void> {
    await this.userService.addToWatch(body.userId, body.movieId);
    this.noContent(_res, {message: 'Успешно. Фильм добавлен в список "К просмотру".'});
  }

  async deleteToWatch({body}: Request<Record<string, unknown>, Record<string, unknown>, {userId: string, movieId: string}>, _res: Response): Promise<void> {
    await this.userService.deleteToWatch(body.userId, body.movieId);
    this.noContent(_res, {message: 'Успешно. Фильм удален из списка "К просмотру".'});
  }

  async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
