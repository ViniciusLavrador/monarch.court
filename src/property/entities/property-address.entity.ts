import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class PropertyAddress extends mongoose.Document {
  @Prop()
  street: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ required: false })
  additionalAddressLine1?: string;

  @Prop({ required: false })
  additionalAddressLine2?: string;
}

export const PropertySchema = SchemaFactory.createForClass(PropertyAddress);
