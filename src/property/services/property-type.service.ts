import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';

import * as PropertyTypeDTO from 'src/property/dto/property-type.dto';

import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';
import { FindOneOptions } from 'src/property/interfaces/property-type/service-methos-options';

@Injectable()
export class PropertyTypeService {
  constructor(@InjectModel(PropertyType.name) private readonly model: Model<PropertyType>) {}

  async create(payload: PropertyTypeDTO.CreatePropertyTypeDto): Promise<PropertyType> {
    return this.model.create(payload);
  }

  async findOne<T>(value: T, options?: FindOneOptions): Promise<PropertyType> {
    let propertyType: PropertyType;

    if (options && options.by !== 'id') {
      propertyType = await this.model.findOne({ [options.by]: value });
    } else {
      propertyType = await this.model.findById(value);
    }

    if (!propertyType)
      throw new NotFoundException(`property type with '${options.by || 'id'}' equals to '${value}' was not found`);

    return propertyType;
  }

  async activate(payload: PropertyTypeDTO.ActivatePropertyTypeDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.ACTIVE);
  }

  async deactivate(payload: PropertyTypeDTO.DeactivatePropertyTypeDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.INACTIVE);
  }
}
