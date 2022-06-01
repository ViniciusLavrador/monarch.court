import { IsString, IsUppercase } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  @IsUppercase()
  propertyType: string;
}
