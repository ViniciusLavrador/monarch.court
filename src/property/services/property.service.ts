import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import * as PropertyDTO from 'src/property/dto/property.dto';
import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';
import { PropertyTypeService } from './property-type.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
    private readonly propertyTypeService: PropertyTypeService,
  ) {}

  async create(payload: PropertyDTO.CreatePropertyDto): Promise<Property> {
    const propertyType = await this.propertyTypeService.findOne<typeof payload.propertyType>(payload.propertyType, {
      by: 'name',
    });

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
