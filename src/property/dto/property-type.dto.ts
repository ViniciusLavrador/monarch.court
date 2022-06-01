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
