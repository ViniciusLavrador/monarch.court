import { IsMongoId, IsOptional, IsString, IsUppercase, ValidateNested } from 'class-validator';
import { BaseFilterDto } from 'src/common/interfaces/base-filter';

// Base
export class PropertyTypeFilterDto extends BaseFilterDto {}

// Request
export class CreatePropertyTypeRequestDto {
  @IsString()
  @IsUppercase()
  name: string;
}

export class ActivatePropertyTypeRequestDto {
  @IsMongoId()
  id: string;
}

export class DeactivatePropertyTypeRequestDto {
  @IsMongoId()
  id: string;
}

export class FindAllPropertyTypesRequestDto {
  @ValidateNested()
  @IsOptional()
  filter?: PropertyTypeFilterDto;
}

export class FindOnePropertyTypeRequestDto {
  @IsMongoId()
  id: string;
}
