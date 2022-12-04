export const GENRE_ARRAY = ['comedy', 'crime', 'documentary', 'drama', 'horror', 'family', 'romance', 'scifi', 'thriller'];

export type TGenre = typeof GENRE_ARRAY[number];

export function getGenre(value: string): TGenre | never {
  if (!GENRE_ARRAY.includes(value)) {
    throw new Error(`Unrecognised genre: ${value}.`);
  }
  return value;
}

export enum GenreEnum {
  COMEDY = 'comedy',
  CRIME = 'crime',
  DOCUMENTARY = 'documentary',
  DRAMA = 'drama',
  HORROR = 'horror',
  FAMILY = 'family',
  ROMANCE = 'romance',
  SCIFI = 'scifi',
  THRILLER = 'thriller'
}
