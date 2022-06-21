import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import * as PropertyDto from 'src/property/dto/property.dto';

import { PropertyService } from 'src/property/services/property.service';
import { Property } from 'src/property/entities/property.entity';

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
  public async findOneById(@Param('id') id: PropertyDto.FindOnePropertyRequestDto['id']): Promise<Property> {
    return this.service.findOne(id);
  }

  @Delete('property-type/:id')
  public async remove(
    @Param('id') id: PropertyDto.RemovePropertyTypeRequestDto['id'],
    @Body() options: PropertyDto.RemovePropertyTypeRequestDto['options'],
  ): Promise<void> {
    return this.service.remove({ id, options });
  }

  @Put('property/:id/activate')
  public async activateProperty(@Param('id') id: PropertyDto.ActivatePropertyRequestDto['id']): Promise<void> {
    return this.service.activate({ id });
  }

  @Put('property/:id/deactivate')
  public async deactivateProperty(@Param('id') id: PropertyDto.ActivatePropertyRequestDto['id']): Promise<void> {
    return this.service.deactivate({ id });
  }
}
