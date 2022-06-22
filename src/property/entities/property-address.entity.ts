import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AddressPoint } from './address-point.entity';

@Schema()
export class PropertyAddress extends mongoose.Document {
  @Prop()
  street: string;

  @Prop()
  number: string;

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

  @Prop({ type: AddressPoint, required: true, index: '2dsphere' })
  location: AddressPoint;
}

export const PropertySchema = SchemaFactory.createForClass(PropertyAddress);
