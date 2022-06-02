import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import * as PropertyTypeDto from 'src/property/dto/property-type.dto';
import { PropertyType } from 'src/property/entities/property-type.entity';

import { PropertyTypeService } from '../services/property-type.service';

@Controller()
export class PropertyTypeController {
  constructor(private readonly service: PropertyTypeService) {}

  @Post('property-types')
  public async createPropertyType(
    @Body() payload: PropertyTypeDto.CreatePropertyTypeRequestDto,
  ): Promise<PropertyType> {
    return this.service.create(payload);
  }

  @Get('property-types')
  public async findAll(@Query() filter: PropertyTypeDto.PropertyTypeFilterDto): Promise<PropertyType[]> {
    return this.service.findAll({ filter });
  }

  @Get('property-type/:id')
  public async findOneById(
    @Param('id') id: PropertyTypeDto.FindOnePropertyTypeRequestDto['id'],
  ): Promise<PropertyType> {
    return this.service.findOne(id);
  }

  @Delete('property-type/:id')
  public async remove(
    @Param('id') id: PropertyTypeDto.RemovePropertyTypeRequestDto['id'],
    @Body() options: PropertyTypeDto.RemovePropertyTypeRequestDto['options'],
  ): Promise<void> {
    return this.service.remove({ id, options });
  }

  @Put('property-type/:id/activate')
  public async activatePropertyType(
    @Param('id') id: PropertyTypeDto.ActivatePropertyTypeRequestDto['id'],
  ): Promise<void> {
    return this.service.activate({ id });
  }

  @Put('property-type/:id/deactivate')
  public async deactivatePropertyType(
    @Param('id') id: PropertyTypeDto.ActivatePropertyTypeRequestDto['id'],
  ): Promise<void> {
    return this.service.deactivate({ id });
  }
}
