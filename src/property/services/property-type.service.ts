import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';

import * as PropertyTypeDTO from 'src/property/dto/property-type.dto';

import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';

@Injectable()
export class PropertyTypeService {
  constructor(@InjectModel(PropertyType.name) private readonly model: Model<PropertyType>) {}

  async create(payload: PropertyTypeDTO.CreatePropertyTypeDto): Promise<PropertyType> {
    return await this.model.create(payload);
  }

  async activate(payload: PropertyTypeDTO.ActivatePropertyTypeDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.ACTIVE);
  }

  async deactivate(payload: PropertyTypeDTO.DeactivatePropertyTypeDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.INACTIVE);
  }
}
