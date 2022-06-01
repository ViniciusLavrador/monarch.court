import { Status } from 'src/common/enums/status.enum';
import BaseEntity from 'src/common/interfaces/base-entity';

export const updateStatus = async <T extends BaseEntity>(entity: T, newStatus: Status): Promise<T> => {
  entity.status = newStatus;
  return await entity.save();
};
