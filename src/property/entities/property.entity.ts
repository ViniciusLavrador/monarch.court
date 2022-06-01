import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { PropertyType } from './property-type.entity';

@Schema()
export class Property extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PropertyType.name, required: true })
  propertyType: PropertyType;

  @Prop()
  name: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
