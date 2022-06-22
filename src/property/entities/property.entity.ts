import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Status } from 'src/common/enums/status.enum';
import { BaseSchemaFactory } from 'src/common/interfaces/base.entity';
import { PropertyType } from 'src/property/entities/property-type.entity';
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
      save: () => {
        console.log('Pre Save Hook on Property Schema Called');
      },
    },
  },
};
