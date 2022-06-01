import { FindOneBaseOptions } from 'src/common/interfaces/service-method-base-options';

// This has to be a class so that it can implement the base interface
export class FindOneOptions implements FindOneBaseOptions {
  by?: 'id' | 'name';
}
