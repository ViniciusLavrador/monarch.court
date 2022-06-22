import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';
import { Property, PropertySchema } from './entities/property.entity';
import { PropertyType, PropertyTypeSchema } from './entities/property-type.entity';
import { PropertyTypeService } from './services/property-type.service';
import { PropertyTypeController } from './controllers/property-type.controller';
import { applyMiddlewareHooks } from 'src/common/helpers/entity.helpers';

@Module({
  controllers: [PropertyController, PropertyTypeController],
  providers: [PropertyService, PropertyTypeService],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Property.name, useFactory: () => applyMiddlewareHooks(PropertySchema) },
      { name: PropertyType.name, useFactory: () => PropertyTypeSchema },
    ]),
  ],
})
export class PropertyModule {}
