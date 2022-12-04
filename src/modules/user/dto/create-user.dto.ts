import {IsEmail, IsString, Length, Matches} from 'class-validator';

export default class CreateUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'name is required'})
  public name!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @Matches(/[^\\s]+\.(jpg|png)$/, {message: 'avatarPath must be .jpg or .png format image'})
  public avatarPath?: string;

  public moviesToWatch: string[] = [];
}
