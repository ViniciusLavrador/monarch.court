import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum AddressPointType {
  POINT = 'Point',
}

@Schema({ _id: false })
export class AddressPoint {
  @Prop({ enum: AddressPointType, required: true })
  type: AddressPointType;

  @Prop({ required: true })
  coordinates: number[];
}

export const AddressPointSchema = SchemaFactory.createForClass(AddressPoint);
