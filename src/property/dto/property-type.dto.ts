import { IsString, IsUppercase } from 'class-validator';

export class CreatePropertyTypeDto {
  @IsString()
  @IsUppercase()
  name: string;
}
