import { IsString, IsEmail } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  email: number;

  @IsString()
  password: string;
}
