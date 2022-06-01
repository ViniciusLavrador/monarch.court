import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Status } from 'src/common/enums/status.enum';

@Schema()
export class PropertyType extends mongoose.Document {
  @Prop()
  name: string;

  @Prop({ enum: Status, default: Status.INACTIVE })
  status: Status;
}

export const PropertyTypeSchema = SchemaFactory.createForClass(PropertyType);
