import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {COMPONENT} from '../../types/component.type.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import UpdateMovieDto from './dto/update-movie.dto.js';
import {MovieServiceInterface} from './movie-service.interface.js';
import {MovieEntity} from './movie.entity.js';
import {MAX_MOVIES_COUNT} from './movie.models.js';

@injectable()
export default class MovieService implements MovieServiceInterface {
  constructor(@inject(COMPONENT.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(COMPONENT.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>) {}

  async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>> {
    const movie = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.title}`);

    return movie;
  }

  async findById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findById(movieId).populate('userId');
  }

  async find(limit?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel.aggregate([
      {
        $addFields: {
          id: {$toString: '$_id'}
        }
      },
      {$limit: limit || MAX_MOVIES_COUNT}
    ]);
  }

  async updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findByIdAndUpdate(movieId, dto).populate('userId');
  }

  async deleteById(movieId: string): Promise<void | null> {
    return this.movieModel.findByIdAndDelete(movieId);
  }

  async findByGenre(genre: string, limit?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel.find({genre}, {}, {limit}).populate('userId');
  }

  async findPromo(): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findOne({isPromo: true}).populate('userId');
  }

  async incCommentsCount(movieId: string): Promise<void | null> {
    return this.movieModel.findByIdAndUpdate(movieId, {$inc: {commentsCount: 1}});
  }

  async updateMovieRating(movieId: string, newRating: number): Promise<void | null> {
    const oldValues = await this.movieModel.findById(movieId).select('rating commentsCount');
    const oldRating = oldValues?.['rating'] ?? 0;
    const oldCommentsCount = oldValues?.['commentsCount'] ?? 0;
    return this.movieModel.findByIdAndUpdate(movieId, {
      rating: (oldRating * oldCommentsCount + newRating) / (oldCommentsCount + 1)
    });
  }

  async exists(documentId: string): Promise<boolean> {
    return (this.movieModel.exists({_id: documentId})) !== null;
  }
}
