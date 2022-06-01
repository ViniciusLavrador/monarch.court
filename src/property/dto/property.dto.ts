import { IsMongoId, IsOptional, IsString, IsUppercase, ValidateNested } from 'class-validator';
import { BaseFilterDto } from 'src/common/interfaces/base-filter';

// Base
export class PropertyFilterDto extends BaseFilterDto {}

export class CreatePropertyRequestDto {
  @IsString()
  name: string;

  @IsString()
  @IsUppercase()
  propertyType: string;
}

export class ActivatePropertyRequestDto {
  @IsMongoId()
  id: string;
}

export class DeactivatePropertyRequestDto {
  @IsMongoId()
  id: string;
}

export class FindAllPropertiesRequestDto {
  @ValidateNested()
  @IsOptional()
  filter?: PropertyFilterDto;
}

export class FindOnePropertyRequestDto {
  @IsMongoId()
  id: string;
}
