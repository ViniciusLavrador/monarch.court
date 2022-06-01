import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import * as PropertyDTO from 'src/property/dto/property.dto';
import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';
import { PropertyTypeService } from './property-type.service';
import { FindOnePropertyOptions } from '../interfaces/property/service-methos-options';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly model: Model<Property>,
    private readonly propertyTypeService: PropertyTypeService,
  ) {}

  async create(payload: PropertyDTO.CreatePropertyRequestDto): Promise<Property> {
    const propertyType = await this.propertyTypeService.findOne<typeof payload.propertyType>(payload.propertyType, {
      by: 'name',
    });

    return await this.model.create({
      name: payload.name,
      propertyType,
    });
  }

  async findOne<T>(value: T, options?: FindOnePropertyOptions): Promise<Property> {
    let propertyType: Property;

    if (options && options.by !== 'id') {
      propertyType = await this.model.findOne({ [options.by]: value });
    } else {
      propertyType = await this.model.findById(value);
    }

    if (!propertyType)
      throw new NotFoundException(`property with '${options.by || 'id'}' equals to '${value}' was not found`);

    return propertyType;
  }

  async findAll(payload: PropertyDTO.FindAllPropertiesRequestDto): Promise<Property[]> {
    return await this.model.find(payload.filter);
  }

  async activate(payload: PropertyDTO.ActivatePropertyRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.ACTIVE);
  }

  async deactivate(payload: PropertyDTO.DeactivatePropertyRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.INACTIVE);
  }
}
