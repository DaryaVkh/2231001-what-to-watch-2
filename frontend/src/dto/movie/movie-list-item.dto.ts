import UserDto from '../user/user.dto';
import {TGenre} from './create-movie.dto';

export default class MovieListItemDto {
  public id!: string;

  public title!: string;

  public publishingDate!: number;

  public genre!: TGenre;

  public previewPath!: string;

  public user!: UserDto;

  public posterPath!: string;

  public commentsCount!: number;
}
