import { Type } from 'class-transformer';
import { IsDefined, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BaseFilterDto, BaseRemoveOptionsDto } from 'src/common/interfaces/base.dto';
import { CreatePropertyAddressRequestDto } from './property-address.dto';

// Base
export class PropertyFilterDto extends BaseFilterDto {}

export class CreatePropertyRequestDto {
  @IsString()
  name: string;

  @IsMongoId()
  type: string;

  @Type(() => CreatePropertyAddressRequestDto)
  @ValidateNested()
  @IsDefined()
  address: CreatePropertyAddressRequestDto;
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

export class RemovePropertyTypeRequestParamsDto {
  @IsMongoId()
  id: string;
}

export class RemovePropertyTypeRequestBodyDto {
  @IsOptional()
  @ValidateNested()
  options?: BaseRemoveOptionsDto;
}

export type RemovePropertyTypeRequestDto = RemovePropertyTypeRequestParamsDto & RemovePropertyTypeRequestBodyDto;
