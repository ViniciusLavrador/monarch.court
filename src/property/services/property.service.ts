import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Property } from 'src/property/entities/property.entity';
import * as PropertyDTO from 'src/property/dto/property.dto';
import { Status } from 'src/common/enums/status.enum';
import { updateStatus } from 'src/common/helpers/status.helpers';
import { PropertyTypeService } from './property-type.service';
import { hardRemoveEntity } from 'src/common/helpers/entity.helpers';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly model: Model<Property>,
    private readonly propertyTypeService: PropertyTypeService,
  ) {}

  private async _getById(id: string): Promise<Property> {
    const property = await this.model.findOne({ _id: id, status: { $ne: Status.DELETED } });

    if (!property) throw new NotFoundException(`property with id ${id} was not found`);

    return property;
  }

  private async _getByName(name: string): Promise<Property> {
    const property = await this.model.findOne({ name, status: { $ne: Status.DELETED } });

    if (!property) throw new NotFoundException(`property with name ${name} was not found`);

    return property;
  }

  /**
   * Creates a new property.
   *
   * Property Type Contraints:
   * - unique
   */
  async create(payload: PropertyDTO.CreatePropertyRequestDto): Promise<Property> {
    const propertyType = await this.propertyTypeService.findOne(payload.propertyType);

    return await this.model.create({
      name: payload.name,
      propertyType,
    });
  }

  /**
   * Finds a single Property by id
   */
  async findOne(id: string): Promise<Property> {
    return this._getById(id);
  }

  /**
   * Finds a single Property by name
   */
  async findOneByName(name: string): Promise<Property> {
    return this._getByName(name);
  }

  /**
   * Finds all Properties
   */
  async findAll(payload: PropertyDTO.FindAllPropertiesRequestDto): Promise<Property[]> {
    return await this.model.find(payload.filter);
  }

  /**
   * Activate a Property
   */
  async activate(payload: PropertyDTO.ActivatePropertyRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.ACTIVE);
  }

  /**
   * Deactivate a Property
   */
  async deactivate(payload: PropertyDTO.DeactivatePropertyRequestDto): Promise<void> {
    updateStatus<Property>(await this.model.findById(payload.id), Status.INACTIVE);
  }

  /**
   * Remove a Property
   */
  async remove(payload: PropertyDTO.RemovePropertyTypeRequestDto): Promise<void> {
    if (payload.options?.hardRemove) {
      hardRemoveEntity<Property>(await this.model.findById(payload.id));
    } else {
      updateStatus<Property>(await this.findOne(payload.id), Status.DELETED);
    }
  }
}
