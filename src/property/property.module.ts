import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property, PropertySchema } from './entities/property.entity';
import { PropertyType, PropertyTypeSchema } from './entities/property-type.entity';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: PropertyType.name, schema: PropertyTypeSchema },
    ]),
  ],
})
export class PropertyModule {}
