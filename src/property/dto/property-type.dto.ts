import { IsMongoId, IsString, IsUppercase } from 'class-validator';

export class CreatePropertyTypeDto {
  @IsString()
  @IsUppercase()
  name: string;
}

export class ActivatePropertyTypeDto {
  @IsMongoId()
  id: string;
}

export class DeactivatePropertyTypeDto {
  @IsMongoId()
  id: string;
}

export class FindAllPropertyTypesDto {}

export class FindOnePropertyTypeDto {
  @IsMongoId()
  id: string;
}
