export const GENRE_ARRAY = ['comedy', 'crime', 'documentary', 'drama', 'horror', 'family', 'romance', 'scifi', 'thriller'];

export type TGenre = typeof GENRE_ARRAY[number];

export default class CreateMovieDto {
  public title!: string;

  public description!: string;

  public publishingDate!: Date;

  public genre!: TGenre;

  public releaseYear!: number;

  public previewPath!: string;

  public moviePath!: string;

  public actors!: string[];

  public director!: string;

  public durationInMinutes!: number;

  public posterPath!: string;

  public backgroundImagePath!: string;

  public backgroundColor!: string;

  public isPromo?: boolean;
}
