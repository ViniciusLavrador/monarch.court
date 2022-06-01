import { IsEnum, IsMongoId, IsOptional, IsString, IsUppercase, ValidateNested } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

// Base
export class PropertyTypeFilterDto {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

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
