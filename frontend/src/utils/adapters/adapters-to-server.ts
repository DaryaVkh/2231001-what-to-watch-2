import CreateCommentDto from '../../dto/comment/create-comment.dto';
import CreateMovieDto from '../../dto/movie/create-movie.dto';
import MovieDto from '../../dto/movie/movie.dto';
import UserDto from '../../dto/user/user.dto';
import {Film} from '../../types/film';
import {NewFilm} from '../../types/new-film';
import {NewReview} from '../../types/new-review';
import {User} from '../../types/user';

export const adaptFilmToServer = (film: Film): MovieDto => ({
  title: film.name,
  description: film.description,
  backgroundImagePath: film.backgroundImage,
  posterPath: film.posterImage,
  backgroundColor: film.backgroundColor,
  actors: film.starring,
  director: film.director,
  durationInMinutes: film.runTime,
  genre: film.genre,
  moviePath: film.videoLink,
  previewPath: film.previewVideoLink,
  publishingDate: new Date().getTime(),
  releaseYear: film.released,
  user: adaptUserToServer(film.user),
  rating: film.rating,
  id: film.id
});

export const adaptUserToServer = (user: User): UserDto => ({
  name: user.name,
  email: user.email,
  avatarPath: user.avatarUrl,
  token: user.token
});

export const adaptNewFilmToServer = (newFilm: NewFilm): CreateMovieDto => ({
  title: newFilm.name,
  description: newFilm.description,
  backgroundImagePath: newFilm.backgroundImage,
  posterPath: newFilm.posterImage,
  backgroundColor: newFilm.backgroundColor,
  actors: newFilm.starring,
  director: newFilm.director,
  durationInMinutes: newFilm.runTime,
  genre: newFilm.genre,
  moviePath: newFilm.videoLink,
  previewPath: newFilm.previewVideoLink,
  publishingDate: new Date(),
  releaseYear: newFilm.released
});

export const adaptNewReviewToServer = (newReview: NewReview, movieId: string): CreateCommentDto => ({
  movieId,
  rating: newReview.rating,
  text: newReview.comment
});

export const adaptAvatarToServer = (file: File) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};
