import { IsBoolean, IsMongoId, IsOptional, IsString, IsUppercase, ValidateNested } from 'class-validator';
import { BaseFilterDto, BaseRemoveOptionsDto } from 'src/common/interfaces/base-interfaces';

// Base
export class PropertyTypeFilterDto extends BaseFilterDto {}
export class PropertyTypeRemoveOptionsDto extends BaseRemoveOptionsDto {}

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

export class RemovePropertyTypeRequestDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsBoolean()
  @ValidateNested()
  options?: BaseRemoveOptionsDto;
}
