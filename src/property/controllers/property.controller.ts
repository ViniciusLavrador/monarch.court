import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import * as PropertyDto from 'src/property/dto/property.dto';

import { PropertyService } from 'src/property/services/property.service';
import { Property } from 'src/property/entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Post()
  public async createProperty(@Body() payload: PropertyDto.CreatePropertyDto): Promise<Property> {
    return this.service.create(payload);
  }

  @Put(':id/activate')
  public async activateProperty(@Param('id') id: PropertyDto.ActivatePropertyDto['id']): Promise<void> {
    return this.service.activate({ id });
  }

  @Put(':id/deactivate')
  public async deactivateProperty(@Param('id') id: PropertyDto.ActivatePropertyDto['id']): Promise<void> {
    return this.service.deactivate({ id });
  }
}
