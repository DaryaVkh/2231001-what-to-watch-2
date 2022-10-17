export default class CreateUserDto {
  public email!: string;
  public name!: string;
  public password!: string;
  public avatarPath?: string;
}
