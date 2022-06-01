import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Status } from 'src/common/enums/status.enum';
import { PropertyType } from 'src/property/entities/property-type.entity';

@Schema()
export class Property extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PropertyType.name, required: true })
  propertyType: PropertyType;

  @Prop()
  name: string;

  @Prop({ enum: Status, default: Status.INACTIVE })
  status: Status;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
