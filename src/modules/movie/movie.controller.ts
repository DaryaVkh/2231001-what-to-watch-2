import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {COMPONENT} from '../../types/component.type.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common-functions.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import UpdateMovieDto from './dto/update-movie.dto.js';
import {MovieServiceInterface} from './movie-service.interface.js';
import {MovieRoute} from './movie.models.js';
import MovieResponse from './response/movie.response.js';

@injectable()
export default class MovieController extends Controller {
  constructor(@inject(COMPONENT.LoggerInterface) logger: LoggerInterface,
              @inject(COMPONENT.MovieServiceInterface) private readonly movieService: MovieServiceInterface) {
    super(logger);

    this.logger.info('Register routes for MovieController.');

    this.addRoute<MovieRoute>({path: MovieRoute.ROOT, method: HttpMethod.Get, handler: this.index});
    this.addRoute<MovieRoute>({path: MovieRoute.CREATE, method: HttpMethod.Post, handler: this.create});
    this.addRoute<MovieRoute>({path: MovieRoute.MOVIE, method: HttpMethod.Get, handler: this.getFilm});
    this.addRoute<MovieRoute>({path: MovieRoute.MOVIE, method: HttpMethod.Patch, handler: this.updateFilm});
    this.addRoute<MovieRoute>({path: MovieRoute.MOVIE, method: HttpMethod.Delete, handler: this.deleteFilm});
    this.addRoute<MovieRoute>({path: MovieRoute.PROMO, method: HttpMethod.Get, handler: this.getPromo});
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

  async getFilm({params}: Request<Record<string, unknown>>, res: Response): Promise<void> {
    const result = await this.movieService.findById(`${params.movieId}`);
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async updateFilm({params, body}: Request<Record<string, string>, Record<string, unknown>, UpdateMovieDto>, res: Response): Promise<void> {
    const film = await this.movieService.findById(params.movieId);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Фильма с id «${params.movieId}» не существует.`, 'MovieController');
    }

    const result = await this.movieService.updateById(params.movieId, body);
    this.ok(res, fillDTO(MovieResponse, result));
  }

  async deleteFilm({params}: Request<Record<string, string>>, res: Response): Promise<void> {
    const film = await this.movieService.findById(`${params.movieId}`);

    if (!film) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Фильма с id «${params.movieId}» не существует.`, 'MovieController');
    }

    await this.movieService.deleteById(`${params.movieId}`);
    this.noContent(res, {message: 'Фильм успешно удален.'});
  }

  async getPromo(_: Request, res: Response): Promise<void> {
    const result = await this.movieService.findPromo();
    this.ok(res, fillDTO(MovieResponse, result));
  }
}
