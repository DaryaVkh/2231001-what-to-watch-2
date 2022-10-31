import {inject, injectable} from 'inversify';
import {types} from '@typegoose/typegoose';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {UserEntity} from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {COMPONENT} from '../../types/component.type.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {MovieEntity} from '../movie/movie.entity.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(@inject(COMPONENT.LoggerInterface) private logger: LoggerInterface,
              @inject(COMPONENT.UserModel) private readonly userModel: types.ModelType<UserEntity>,
              @inject(COMPONENT.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>) {}

  async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  async findToWatch(userId: string): Promise<DocumentType<MovieEntity>[]> {
    const moviesToWatch = await this.userModel.findById(userId).select('moviesToWatch');
    return this.movieModel.find({_id: { $in: moviesToWatch }});
  }

  async addToWatch(movieId: string, userId: string): Promise<void | null> {
    return this.userModel.findByIdAndUpdate(userId, {
      $push: {moviesToWatch: movieId}
    });
  }

  async deleteToWatch(movieId: string, userId: string): Promise<void | null> {
    return this.userModel.findByIdAndUpdate(userId, {
      $pull: {moviesToWatch: movieId}
    });
  }
}
