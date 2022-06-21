import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import * as PropertyDto from 'src/property/dto/property.dto';

import { PropertyService } from 'src/property/services/property.service';
import { Property } from 'src/property/entities/property.entity';
import { ApiTags } from '@nestjs/swagger';
import { DOC_TAGS } from 'src/common/contants/doc-tags.constants';

@ApiTags(DOC_TAGS.PROPERTIES)
@Controller()
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Post('properties')
  public async createProperty(@Body() payload: PropertyDto.CreatePropertyRequestDto): Promise<Property> {
    return this.service.create(payload);
  }

  @Get('properties')
  public async findAll(@Query() filter: PropertyDto.PropertyFilterDto): Promise<Property[]> {
    return this.service.findAll({ filter });
  }

  @Get('property/:id')
  public async findOneById(@Param() { id }: PropertyDto.FindOnePropertyRequestDto): Promise<Property> {
    return this.service.findOne(id);
  }

  @Delete('property/:id')
  public async remove(
    @Param() { id }: PropertyDto.RemovePropertyTypeRequestParamsDto,
    @Body() { options }: PropertyDto.RemovePropertyTypeRequestBodyDto,
  ): Promise<void> {
    return this.service.remove({ id, options });
  }

  @Put('property/:id/activate')
  public async activateProperty(@Param() { id }: PropertyDto.ActivatePropertyRequestDto): Promise<void> {
    return this.service.activate({ id });
  }

  @Put('property/:id/deactivate')
  public async deactivateProperty(@Param() { id }: PropertyDto.ActivatePropertyRequestDto): Promise<void> {
    return this.service.deactivate({ id });
  }
}
