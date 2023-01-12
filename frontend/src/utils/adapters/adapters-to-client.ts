import CommentDto from '../../dto/comment/comment.dto';
import MovieListItemDto from '../../dto/movie/movie-list-item.dto';
import MovieDto from '../../dto/movie/movie.dto';
import UserDto from '../../dto/user/user.dto';
import {Film, FilmListItem} from '../../types/film';
import {Review} from '../../types/review';
import {User} from '../../types/user';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  avatarUrl: user.avatarPath,
  email: user.email,
  token: user.token || ''
});

export const adaptMovieToClient = (movie: MovieDto): Film => ({
  id: movie.id,
  name: movie.title,
  posterImage: movie.posterPath,
  backgroundImage: movie.backgroundImagePath,
  backgroundColor: movie.backgroundColor,
  videoLink: movie.moviePath,
  previewVideoLink: movie.previewPath,
  description: movie.description,
  rating: movie.rating,
  director: movie.director,
  starring: movie.actors,
  runTime: movie.durationInMinutes,
  genre: movie.genre,
  released: movie.releaseYear,
  isFavorite: false,
  user: adaptUserToClient(movie.user)
});

export const adaptMovieListItemToClient = (movie: MovieListItemDto): FilmListItem => ({
  id: movie.id,
  name: movie.title,
  genre: movie.genre,
  released: movie.publishingDate,
  user: adaptUserToClient(movie.user),
  posterImage: movie.posterPath,
  previewVideoLink: movie.previewPath
});

export const adaptCommentToClient = (comment: CommentDto): Review => ({
  comment: comment.text,
  rating: comment.rating,
  id: comment.id,
  date: comment.postDate,
  user: {
    name: comment.user.name
  }
});
