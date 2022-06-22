import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Status } from 'src/common/enums/status.enum';
import { BaseSchemaFactory } from 'src/common/interfaces/base.entity';
import { ConfigInterface } from 'src/config';
import { PropertyType } from 'src/property/entities/property-type.entity';
import { GoogleMapsService } from '../services/google-maps.service';
import { AddressPointType } from './address-point.entity';
import { PropertyAddress } from './property-address.entity';

@Schema()
export class Property extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PropertyType.name, required: true })
  propertyType: PropertyType;

  @Prop()
  name: string;

  @Prop({ enum: Status, default: Status.INACTIVE })
  status: Status;

  @Prop({ type: PropertyAddress, required: true })
  address: PropertyAddress;
}

export const PropertySchema: BaseSchemaFactory<Property> = {
  schema: SchemaFactory.createForClass(Property),
  hooks: {
    pre: {
      // This must run before validation (pre-validation) because `location` is required in the Address Entity
      validate: async function () {
        const config = new ConfigService<ConfigInterface>();
        const googleMapsService = new GoogleMapsService(config);

        const { lat, lng } = await googleMapsService.getCoordinates(this.address);

        this.address.location = {
          type: AddressPointType.POINT,
          coordinates: [lat, lng],
        };
      },
    },
  },
};
