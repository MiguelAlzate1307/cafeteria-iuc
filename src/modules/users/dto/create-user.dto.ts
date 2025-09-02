import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @MaxLength(30)
  lastname: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
