import {Expose} from 'class-transformer';
import {TGenre} from '../../../types/genre.type';

export default class MovieResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publishingDate!: number;

  @Expose()
  public genre!: TGenre;

  @Expose()
  public releaseYear!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public previewPath!: string;

  @Expose()
  public moviePath!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public durationInMinutes!: number;

  @Expose()
  public userId!: string;

  @Expose()
  public posterPath!: string;

  @Expose()
  public backgroundImagePath!: string;

  @Expose()
  public backgroundColor!: string;
}
