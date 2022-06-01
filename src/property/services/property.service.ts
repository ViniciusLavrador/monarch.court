import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';

import * as PropertyDTO from 'src/property/dto/property.dto';
import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
    @InjectModel(PropertyType.name) private readonly propertyTypeModel: Model<PropertyType>,
  ) {}

  async create(payload: PropertyDTO.CreatePropertyDto): Promise<Property> {
    const propertyType = await this.propertyTypeModel.findOne({ name: payload.propertyType });

    if (!propertyType) throw new BadRequestException('The specified property type does not exist');

    return await this.propertyModel.create({
      name: payload.name,
      propertyType,
    });
  }

  async activate(payload: PropertyDTO.ActivatePropertyDto): Promise<void> {
    updateStatus<Property>(await this.propertyModel.findById(payload.id), Status.ACTIVE);
  }

  async deactivate(payload: PropertyDTO.DeactivatePropertyDto): Promise<void> {
    updateStatus<Property>(await this.propertyModel.findById(payload.id), Status.INACTIVE);
  }
}
