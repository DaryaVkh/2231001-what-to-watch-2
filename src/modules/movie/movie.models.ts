export const MAX_MOVIES_COUNT = 60;

export enum MovieRoute {
  ROOT = '/',
  CREATE = '/create',
  MOVIE = '/:movieId',
  PROMO = '/promo',
  COMMENTS = '/:movieId/comments'
}

export const DEFAULT_MOVIE_POSTER_IMAGES = [
  'aviator.jpg',
  'bohemian-rhapsody.jpg',
  'dardjeeling-limited.jpg',
  'fantastic-beasts-the-crimes-of-grindelwald.jpg',
  'johnny-english.jpg',
  'macbeth.jpg',
  'midnight-special.jpg',
  'mindhunter.jpg',
  'moonrise-kingdom.jpg',
  'no-country-for-old-men.jpg',
  'orlando.jpg',
  'pulp-fiction.jpg',
  'revenant.jpg',
  'seven-years-in-tibet.jpg',
  'shutter-island.jpg',
  'snatch.jpg',
  'the-grand-budapest-hotel-poster.jpg',
  'war-of-the-worlds.jpg',
  'we-need-to-talk-about-kevin.jpg',
  'what-we-do-in-the-shadows.jpg'
];

export const DEFAULT_MOVIE_BACKGROUND_IMAGES = [
  'bg-the-grand-budapest-hotel.jpg'
];
