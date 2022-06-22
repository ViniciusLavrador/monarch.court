import { Injectable } from '@nestjs/common';

import { Client, LatLngLiteral, RequestParams } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from 'src/config';
import { PropertyAddress } from 'src/property/entities/property-address.entity';

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey: string;

  constructor(config: ConfigService<ConfigInterface>) {
    super();

    this.accessKey = config.get('GCM_API_KEY', { infer: true });
  }

  async getCoordinates(address: PropertyAddress): Promise<LatLngLiteral> {
    const googleResponse = await this.geocode({
      params: {
        key: this.accessKey,
        address: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.zipcode}`,
      },
    });

    const { lat, lng } = googleResponse.data.results[0].geometry.location;

    return { lat, lng };
  }
}
