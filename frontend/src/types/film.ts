import {User} from './user';

export type Film = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
  user: User;
};

export type FilmListItem = {
  id: string;
  name: string;
  released: number;
  genre: string;
  previewVideoLink: string;
  user: User;
  posterImage: string;
};
