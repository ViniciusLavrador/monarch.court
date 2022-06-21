import { Document } from 'mongoose';
import { Status } from 'src/common/enums/status.enum';

export interface BaseEntity extends Document {
  status: Status;
}

export default BaseEntity;
