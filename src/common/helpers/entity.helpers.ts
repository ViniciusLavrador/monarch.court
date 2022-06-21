import BaseEntity from 'src/common/interfaces/base.entity';

export const hardRemoveEntity = async <T extends BaseEntity>(entity: T): Promise<T> => {
  return await entity.remove();
};
