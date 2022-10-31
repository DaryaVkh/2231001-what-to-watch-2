import {inject, injectable} from 'inversify';
import {types} from '@typegoose/typegoose';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {COMPONENT} from '../../types/component.type.js';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {MovieServiceInterface} from '../movie/movie-service.interface.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(@inject(COMPONENT.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
              @inject(COMPONENT.MovieServiceInterface) private readonly movieService: MovieServiceInterface) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.movieService.updateMovieRating(dto.movieId, dto.rating);
    await this.movieService.incCommentsCount(dto.movieId);
    return comment.populate('userId');
  }

  public async findByMovieId(movieId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({movieId}).populate('userId');
  }
}
