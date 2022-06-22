import { IsEmail, IsEnum, IsMongoId, IsString, MinLength } from 'class-validator';

import { Role } from 'src/auth/entities/role.enum';

export class LoginRequestDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class RegisterRequestDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class ValidateRequestDto {
  @IsString()
  public readonly token: string;
}

export class FindUserByIdRequestDto {
  @IsMongoId()
  public readonly id: string;
}

export class FindUserByEmailRequestDto {
  @IsEmail()
  public readonly email: string;
}

export class FindAllUsersRequestDto {}

export class FindAllUsersForRolesRequestDto {
  @IsEnum(Role, { message: `role must be a valid Role (${Object.keys(Role).join(', ')})`, each: true })
  public readonly roles: Role[];
}

export class ActivateUserByIdRequestDto {
  @IsMongoId()
  public readonly id: string;
}

export class DeactivateUserByIdRequestDto {
  @IsMongoId()
  public readonly id: string;
}

export class RemoveUserByIdRequestDto {
  @IsMongoId()
  public readonly id: string;
}

export class AddRoleToUserRequestParamsDto {
  @IsMongoId()
  public readonly id: string;
}

export class AddRoleToUserRequestBodyDto {
  @IsEnum(Role, { message: `role must be a valid Role (${Object.keys(Role).join(', ')})` })
  public readonly role: Role;
}

export type AddRoleToUserRequestDto = AddRoleToUserRequestParamsDto & AddRoleToUserRequestBodyDto;

export class RemoveRoleFromUserRequestParamsDto {
  @IsMongoId()
  public readonly id: string;
}

export class RemoveRoleFromUserRequestBodyDto {
  @IsEnum(Role, { message: `role must be a valid Role (${Object.keys(Role).join(', ')})` })
  public readonly role: Role;
}

export type RemoveRoleFromUserRequestDto = RemoveRoleFromUserRequestParamsDto & RemoveRoleFromUserRequestBodyDto;
