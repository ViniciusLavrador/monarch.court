import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';

import * as PropertyTypeDTO from 'src/property/dto/property-type.dto';

import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';
import { FindOnePropertyTypeOptions } from 'src/property/interfaces/property-type/service-methos-options';
import { hardRemoveEntity } from 'src/common/helpers/entity.helpers';

@Injectable()
export class PropertyTypeService {
  constructor(@InjectModel(PropertyType.name) private readonly model: Model<PropertyType>) {}

  /**
   * Creates a new property type.
   *
   * Property Type Contraints:
   * - unique
   * - uppercase
   */
  async create(payload: PropertyTypeDTO.CreatePropertyTypeRequestDto): Promise<PropertyType> {
    return this.model.create(payload);
  }

  /**
   * Finds a single Property Type
   */
  async findOne<T>(value: T, options?: FindOnePropertyTypeOptions): Promise<PropertyType> {
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

  /**
   * Finds all Property Types
   */
  async findAll(payload: PropertyTypeDTO.FindAllPropertyTypesRequestDto): Promise<PropertyType[]> {
    return await this.model.find(payload.filter);
  }

  /**
   * Activate a Property Type
   */
  async activate(payload: PropertyTypeDTO.ActivatePropertyTypeRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.ACTIVE);
  }

  /**
   * Deactivate a Property Type
   */
  async deactivate(payload: PropertyTypeDTO.DeactivatePropertyTypeRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.INACTIVE);
  }

  /**
   * Deactivate a Property Type
   */
  async remove(payload: PropertyTypeDTO.RemovePropertyTypeRequestDto): Promise<void> {
    if (payload.options?.hardRemove) {
      hardRemoveEntity(await this.model.findById(payload.id));
    } else {
      updateStatus<Property>(await this.model.findById(payload.id), Status.DELETED);
    }
  }
}
