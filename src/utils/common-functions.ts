import {getGenre} from '../types/genre.type.js';
import {Movie} from '../types/movie.type.js';

export const createMovie = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    publishingDate,
    genre,
    releaseYear,
    rating,
    previewPath,
    moviePath,
    actors,
    director,
    durationInMinutes,
    userName,
    email,
    avatarPath,
    posterPath,
    backgroundImagePath,
    backgroundColor
  ] = tokens;
  return {
    title,
    description,
    publishingDate: new Date(publishingDate),
    genre: getGenre(genre),
    releaseYear: +releaseYear,
    rating: +rating,
    previewPath,
    moviePath,
    actors: actors.split(';'),
    director,
    durationInMinutes: +durationInMinutes,
    commentsCount: 0,
    user: {email, name: userName, avatarPath},
    posterPath,
    backgroundImagePath,
    backgroundColor
  } as Movie;
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
