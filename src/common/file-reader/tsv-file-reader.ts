import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Movie } from '../../types/movie.type.js';
import { Genre } from '../../types/genre-type.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  toArray(): Movie[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
        name,
        email,
        avatarPath,
        posterPath,
        backgroundImagePath,
        backgroundColor
      ]) => ({
        title,
        description,
        publishingDate: new Date(publishingDate),
        genre: Genre[genre as 'COMEDY' | 'CRIME' | 'DOCUMENTARY' | 'DRAMA' | 'HORROR' | 'FAMILY' | 'ROMANCE' | 'SCIFI' | 'THRILLER'],
        releaseYear: +releaseYear,
        rating: +rating,
        previewPath,
        moviePath,
        actors: actors.split(';'),
        director,
        durationInMinutes: +durationInMinutes,
        commentsCount: 0,
        user: {email, name, avatarPath},
        posterPath,
        backgroundImagePath,
        backgroundColor
      }));
  }
}
