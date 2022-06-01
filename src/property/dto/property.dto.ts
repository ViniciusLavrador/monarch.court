import { IsMongoId, IsString, IsUppercase } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  @IsUppercase()
  propertyType: string;
}

export class ActivatePropertyDto {
  @IsMongoId()
  id: string;
}

export class DeactivatePropertyDto {
  @IsMongoId()
  id: string;
}
