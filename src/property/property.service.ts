import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';

import * as PropertyTypeDTO from 'src/property/dto/property-type.dto';
import * as PropertyDTO from 'src/property/dto/property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
    @InjectModel(PropertyType.name) private readonly propertyTypeModel: Model<PropertyType>,
  ) {}

  async createPropertyType(payload: PropertyTypeDTO.CreatePropertyTypeDto): Promise<PropertyType> {
    return await this.propertyTypeModel.create(payload);
  }

  async createProperty(payload: PropertyDTO.CreatePropertyDto): Promise<Property> {
    const propertyType = await this.propertyTypeModel.findOne({ name: payload.propertyType });

    if (!propertyType) throw new BadRequestException('The specified property type does not exist');

    return await this.propertyModel.create({
      name: payload.name,
      propertyType,
    });
  }
}
