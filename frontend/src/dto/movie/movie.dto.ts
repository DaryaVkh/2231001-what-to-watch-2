import UserDto from '../user/user.dto';
import {TGenre} from './create-movie.dto';

export default class MovieDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public publishingDate!: number;

  public genre!: TGenre;

  public releaseYear!: number;

  public rating!: number;

  public previewPath!: string;

  public moviePath!: string;

  public actors!: string[];

  public director!: string;

  public durationInMinutes!: number;

  public user!: UserDto;

  public posterPath!: string;

  public backgroundImagePath!: string;

  public backgroundColor!: string;
}
