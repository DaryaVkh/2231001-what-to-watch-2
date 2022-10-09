import {MockData} from '../../types/mock-data.type.js';
import {getRandomItem, getRandomItems, getRandomValue} from '../../utils/random.js';
import {MovieGeneratorInterface} from './movie-generator.interface.js';
import {GENRE_ARRAY} from '../../types/genre.type.js';
import dayjs from 'dayjs';

const MAX_RELEASE_YEAR = 2022;
const MIN_RELEASE_YEAR = 1990;
const MAX_DURATION = 180;
const MIN_DURATION = 70;
const MIN_RATING = 1;
const MAX_RATING = 5;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class MovieGenerator implements MovieGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishingDate = dayjs().subtract(getRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem(GENRE_ARRAY);
    const releaseYear = getRandomValue(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR);
    const rating = getRandomValue(MIN_RATING, MAX_RATING, 1);
    const previewPath = getRandomItem<string>(this.mockData.previewPaths);
    const moviePath = getRandomItem<string>(this.mockData.moviePaths);
    const actors = getRandomItems<string>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.directors);
    const durationInMinutes = getRandomValue(MIN_DURATION, MAX_DURATION);
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatarPaths);
    const posterPath = getRandomItem<string>(this.mockData.posterPaths);
    const backgroundImagePath = getRandomItem<string>(this.mockData.backgroundImagePaths);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);

    return [
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
      avatar,
      posterPath,
      backgroundImagePath,
      backgroundColor
    ].join('\t');
  }
}
