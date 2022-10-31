import {TGenre} from '../../../types/genre.type';

export default class UpdateMovieDto {
  public title!: string;
  public description!: string;
  public publishingDate!: Date;
  public genre!: TGenre;
  public releaseYear!: number;
  public rating!: number;
  public previewPath!: string;
  public moviePath!: string;
  public actors!: string[];
  public director!: string;
  public durationInMinutes!: number;
  public userId!: string;
  public posterPath!: string;
  public backgroundImagePath!: string;
  public backgroundColor!: string;
}
