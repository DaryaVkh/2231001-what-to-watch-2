import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {Controller} from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentExistsMiddleware} from '../../middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../middlewares/private-route.middleware.js';
import {ValidateDtoMiddleware} from '../../middlewares/validate-dto.middleware.js';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectid.middleware.js';
import {COMPONENT} from '../../types/component.type.js';
import {getGenre, TGenre} from '../../types/genre.type.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common-functions.js';
import {getRandomItem} from '../../utils/random.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import {UserServiceInterface} from '../user/user-service.interface';
import CreateMovieDto from './dto/create-movie.dto.js';
import UpdateMovieDto from './dto/update-movie.dto.js';
import {MovieServiceInterface} from './movie-service.interface.js';
import {MovieEntity} from './movie.entity.js';
import {DEFAULT_MOVIE_BACKGROUND_IMAGES, DEFAULT_MOVIE_POSTER_IMAGES, MovieRoute} from './movie.models.js';
import MovieListItemResponse from './response/movie-list-item.response.js';
import MovieResponse from './response/movie.response.js';

type ParamsGetMovie = {
  movieId: string;
};

type QueryParamsGetMovies = {
  limit?: string;
  genre?: TGenre;
};

@injectable()
export default class MovieController extends Controller {
  constructor(@inject(COMPONENT.LoggerInterface) logger: LoggerInterface,
    @inject(COMPONENT.ConfigInterface) configService: ConfigInterface,
    @inject(COMPONENT.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(COMPONENT.MovieServiceInterface) private readonly movieService: MovieServiceInterface,
    @inject(COMPONENT.CommentServiceInterface) private readonly commentService: CommentServiceInterface) {
    super(logger, configService);

    this.logger.info('Register routes for MovieController.');

    this.addRoute<MovieRoute>({path: MovieRoute.Promo, method: HttpMethod.Get, handler: this.showPromo});
    this.addRoute<MovieRoute>({path: MovieRoute.Root, method: HttpMethod.Get, handler: this.index});
    this.addRoute<MovieRoute>({
      path: MovieRoute.Create,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(this.userService),
        new ValidateDtoMiddleware(CreateMovieDto)
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.Movie,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.Movie,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(this.userService),
        new ValidateObjectIdMiddleware('movieId'),
        new ValidateDtoMiddleware(UpdateMovieDto),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.Movie,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(this.userService),
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.Comments,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId'),
      ]
    });
  }

  async index(req: Request<unknown, unknown, unknown, QueryParamsGetMovies>, res: Response): Promise<void> {
    const genre = req.query.genre;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    let movies: DocumentType<MovieEntity>[];
    if (genre) {
      movies = await this.movieService.findByGenre(getGenre(genre), limit);
    } else {
      movies = await this.movieService.find(limit);
    }
    this.ok(res, fillDTO(MovieListItemResponse, movies));
  }

  async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieDto>, res: Response): Promise<void> {
    const {body, user} = req;
    const randomPosterImage = getRandomItem(DEFAULT_MOVIE_POSTER_IMAGES);
    const randomBackgroundImagePath = getRandomItem(DEFAULT_MOVIE_BACKGROUND_IMAGES);
    const result = await this.movieService.create({
      ...body,
      posterPath: randomPosterImage,
      backgroundImagePath: randomBackgroundImagePath
    }, user.id);
    this.created(res, fillDTO(MovieResponse, result));
  }

  async show({params}: Request<core.ParamsDictionary | ParamsGetMovie>, res: Response): Promise<void> {
    const result = await this.movieService.findById(params.movieId);
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async update(req: Request<core.ParamsDictionary | ParamsGetMovie, Record<string, unknown>, UpdateMovieDto>, res: Response): Promise<void> {
    const {params, body, user} = req;
    const movie = await this.movieService.findById(params.movieId);
    if (movie?.user?.id !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with id ${user.id} doesn't own movie card with id ${movie?.id}, so can't edit it.`,
        'MovieController'
      );
    }
    const randomPosterImage = getRandomItem(DEFAULT_MOVIE_POSTER_IMAGES);
    const randomBackgroundImagePath = getRandomItem(DEFAULT_MOVIE_BACKGROUND_IMAGES);
    const result = await this.movieService.updateById(params.movieId, {
      ...body,
      posterPath: randomPosterImage,
      backgroundImagePath: randomBackgroundImagePath
    });
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async delete(req: Request<core.ParamsDictionary | ParamsGetMovie>, res: Response): Promise<void> {
    const {params, user} = req;
    const movie = await this.movieService.findById(params.movieId);
    if (movie?.user?.id !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with id ${user.id} doesn't own movie card with id ${movie?.id}, so can't delete it.`,
        'MovieController'
      );
    }
    await this.movieService.deleteById(`${params.movieId}`);
    this.noContent(res, {message: 'Фильм успешно удален.'});
  }

  async showPromo(_: Request, res: Response): Promise<void> {
    const result = await this.movieService.findPromo();
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async getComments({params}: Request<core.ParamsDictionary | ParamsGetMovie>, res: Response): Promise<void> {
    const comments = await this.commentService.findByMovieId(params.movieId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
