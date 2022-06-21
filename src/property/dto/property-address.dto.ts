import { IsString, IsUppercase, Length } from 'class-validator';

export class CreatePropertyAddressRequestDto {
  @IsString()
  street: string;

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
  additionalAddressLine1?: string;

  @IsString()
  additionalAddressLine2?: string;
}
