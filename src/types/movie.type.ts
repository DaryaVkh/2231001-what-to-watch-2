import {TGenre} from './genre.type.js';
import {User} from './user.type.js';

export type Movie = {
  title: string;
  description: string;
  publishingDate: Date;
  genre: TGenre;
  releaseYear: number;
  rating: number;
  previewPath: string;
  moviePath: string;
  actors: string[];
  director: string;
  durationInMinutes: number;
  commentsCount: number;
  user: User;
  posterPath: string;
  backgroundImagePath: string;
  backgroundColor: string;
};
