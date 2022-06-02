import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class BaseFilterDto {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class BaseRemoveOptionsDto {
  @IsOptional()
  @IsBoolean()
  hardRemove?: boolean;
}
