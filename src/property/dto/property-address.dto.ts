import { IsOptional, IsString, IsUppercase, Length } from 'class-validator';

export class CreatePropertyAddressRequestDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  zipcode: string;

  @IsString()
  city: string;

  @IsString()
  @Length(2, 2)
  @IsUppercase()
  state: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  additionalAddressLine1?: string;

  @IsString()
  @IsOptional()
  additionalAddressLine2?: string;
}
