import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import * as PropertyDto from 'src/property/dto/property.dto';

import { PropertyService } from 'src/property/services/property.service';
import { Property } from 'src/property/entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Post()
  public async createProperty(@Body() payload: PropertyDto.CreatePropertyRequestDto): Promise<Property> {
    return this.service.create(payload);
  }

  @Get()
  public async findAll(@Query() filter: PropertyDto.PropertyFilterDto): Promise<Property[]> {
    return this.service.findAll({ filter });
  }

  @Get(':id')
  public async findOneById(@Param('id') id: PropertyDto.FindOnePropertyRequestDto['id']): Promise<Property> {
    return this.service.findOne({ id });
  }

  @Put(':id/activate')
  public async activateProperty(@Param('id') id: PropertyDto.ActivatePropertyRequestDto['id']): Promise<void> {
    return this.service.activate({ id });
  }

  @Put(':id/deactivate')
  public async deactivateProperty(@Param('id') id: PropertyDto.ActivatePropertyRequestDto['id']): Promise<void> {
    return this.service.deactivate({ id });
  }
}
