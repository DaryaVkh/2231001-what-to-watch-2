import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentExistsMiddleware} from '../../middlewares/document-exists.middleware.js';
import {ValidateDtoMiddleware} from '../../middlewares/validate-dto.middleware.js';
import {ValidateObjectIdMiddleware} from '../../middlewares/validate-objectid.middleware.js';
import {COMPONENT} from '../../types/component.type.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common-functions.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import UpdateMovieDto from './dto/update-movie.dto.js';
import {MovieServiceInterface} from './movie-service.interface.js';
import {MovieRoute} from './movie.models.js';
import MovieResponse from './response/movie.response.js';

type ParamsGetMovie = {
  movieId: string;
}

@injectable()
export default class MovieController extends Controller {
  constructor(@inject(COMPONENT.LoggerInterface) logger: LoggerInterface,
              @inject(COMPONENT.MovieServiceInterface) private readonly movieService: MovieServiceInterface,
              @inject(COMPONENT.CommentServiceInterface) private readonly commentService: CommentServiceInterface) {
    super(logger);

    this.logger.info('Register routes for MovieController.');

    this.addRoute<MovieRoute>({path: MovieRoute.ROOT, method: HttpMethod.Get, handler: this.index});
    this.addRoute<MovieRoute>({
      path: MovieRoute.CREATE,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateMovieDto)]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.MOVIE,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.MOVIE,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new ValidateDtoMiddleware(UpdateMovieDto),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({
      path: MovieRoute.MOVIE,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute<MovieRoute>({path: MovieRoute.PROMO, method: HttpMethod.Get, handler: this.showPromo});
    this.addRoute<MovieRoute>({
      path: MovieRoute.COMMENTS,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId'),
      ]
    });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const movies = await this.movieService.find();
    const movieResponse = fillDTO(MovieResponse, movies);
    this.ok(res, movieResponse);
  }

  async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieDto>, res: Response): Promise<void> {
    const result = await this.movieService.create(body);
    this.created(res, fillDTO(MovieResponse, result));
  }

  async show({params}: Request<core.ParamsDictionary | ParamsGetMovie>, res: Response): Promise<void> {
    const result = await this.movieService.findById(params.movieId);
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async update({params, body}: Request<core.ParamsDictionary | ParamsGetMovie, Record<string, unknown>, UpdateMovieDto>, res: Response): Promise<void> {
    const result = await this.movieService.updateById(params.movieId, body);
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async delete({params}: Request<core.ParamsDictionary | ParamsGetMovie>, res: Response): Promise<void> {
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
