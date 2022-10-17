import {getGenre} from '../types/genre.type.js';
import crypto from 'crypto';

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
    releaseYear: Number(releaseYear),
    rating: Number(rating),
    previewPath,
    moviePath,
    actors: actors.split(';'),
    director,
    durationInMinutes: Number(durationInMinutes),
    commentsCount: 0,
    user: {email, name: userName, avatarPath},
    posterPath,
    backgroundImagePath,
    backgroundColor
  };
};

export const createSHA256 = (line: string, salt: string): string => crypto.createHmac('sha256', salt).update(line).digest('hex');
