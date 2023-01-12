export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = 'review',
  Player = '/player',
  Register = '/register',
  EditFilm = 'edit',
  AddFilm = '/create',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const GENRES = ['comedy', 'crime', 'documentary', 'drama', 'horror', 'family', 'romance', 'scifi', 'thriller'];

export const DEFAULT_GENRE = 'All genres';

export enum APIRoute {
  Films = '/movies',
  Similar = '/similar',
  Promo = '/movies/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/users/login',
  Logout = '/logout',
  Register = '/users/register',
  Add = '/create',
  Genre = '/films/genre',
  SetAvatar = '/avatar',
  Users = '/users'
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  SimilarFilms = 'SIMILAR FILMS',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  User = 'USER',
  FavoriteFilms = 'FAVORITE FILMS',
  Genre = 'GENRE',
}
