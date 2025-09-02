import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../enums/roles.enum';
import { Transform } from 'class-transformer';

export class UpdateRoleDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
