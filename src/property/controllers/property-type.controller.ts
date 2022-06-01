import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import * as PropertyTypeDto from 'src/property/dto/property-type.dto';
import { PropertyType } from 'src/property/entities/property-type.entity';

import { PropertyTypeService } from '../services/property-type.service';

@Controller('property/type')
export class PropertyTypeController {
  constructor(private readonly service: PropertyTypeService) {}

  @Post()
  public async createPropertyType(@Body() payload: PropertyTypeDto.CreatePropertyTypeDto): Promise<PropertyType> {
    return this.service.create(payload);
  }

  @Get()
  public async findAll(payload: PropertyTypeDto.FindAllPropertyTypesDto): Promise<PropertyType[]> {
    return this.service.findAll(payload);
  }

  @Get(':id')
  public async findOneById(@Param('id') id: PropertyTypeDto.FindOnePropertyTypeDto['id']): Promise<PropertyType> {
    return this.service.findOne({ id });
  }

  @Put(':id/activate')
  public async activatePropertyType(@Param('id') id: PropertyTypeDto.ActivatePropertyTypeDto['id']): Promise<void> {
    return this.service.activate({ id });
  }

  @Put(':id/deactivate')
  public async deactivatePropertyType(@Param('id') id: PropertyTypeDto.ActivatePropertyTypeDto['id']): Promise<void> {
    return this.service.deactivate({ id });
  }
}
