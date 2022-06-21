import { IsBoolean, IsMongoId, IsOptional, IsString, IsUppercase, ValidateNested } from 'class-validator';
import { BaseFilterDto, BaseRemoveOptionsDto } from 'src/common/interfaces/base-interfaces';

// Base
export class PropertyFilterDto extends BaseFilterDto {}

export class CreatePropertyRequestDto {
  @IsString()
  name: string;

  @IsMongoId()
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

export class RemovePropertyTypeRequestDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @ValidateNested()
  options?: BaseRemoveOptionsDto;
}
