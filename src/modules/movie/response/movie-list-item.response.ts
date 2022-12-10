import {Expose} from 'class-transformer';
import {TGenre} from '../../../types/genre.type';

export default class MovieListItemResponse {
  @Expose()
  public title!: string;

  @Expose()
  public publishingDate!: number;

  @Expose()
  public genre!: TGenre;

  @Expose()
  public previewPath!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public posterPath!: string;

  @Expose()
  public commentsCount!: number;
}
