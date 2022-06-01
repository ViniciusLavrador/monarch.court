import { Body, Controller, Post } from '@nestjs/common';

import * as PropertyTypeDto from 'src/property/dto/property-type.dto';
import * as PropertyDto from 'src/property/dto/property.dto';

import { PropertyType } from 'src/property/entities/property-type.entity';

import { PropertyService } from 'src/property/property.service';
import { Property } from './entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('type')
  public async createPropertyType(@Body() payload: PropertyTypeDto.CreatePropertyTypeDto): Promise<PropertyType> {
    return this.propertyService.createPropertyType(payload);
  }

  @Post()
  public async createProperty(@Body() payload: PropertyDto.CreatePropertyDto): Promise<Property> {
    return this.propertyService.createProperty(payload);
  }
}
