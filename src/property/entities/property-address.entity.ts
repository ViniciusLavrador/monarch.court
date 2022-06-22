import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

enum PointType {
  POINT = 'Point',
}

@Schema()
class Point extends mongoose.Document {
  @Prop({ enum: PointType, required: true })
  type: PointType;

  @Prop({ required: true })
  coordinates: number[];
}

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

  // @Prop({ type: Point, index: '2dsphere' })
  // location: Point;
}

export const PropertySchema = SchemaFactory.createForClass(PropertyAddress);
