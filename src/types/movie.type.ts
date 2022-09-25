import { Genre } from './genre-type.enum.js';
import { User } from './user.type.js';

export type Movie = {
  title: string;
  description: string;
  publishingDate: Date;
  genre: Genre;
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
