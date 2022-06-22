import BaseEntity, { BaseSchemaFactory } from 'src/common/interfaces/base.entity';

export const hardRemoveEntity = async <T extends BaseEntity>(entity: T): Promise<T> => {
  return await entity.remove();
};

export const applyMiddlewareHooks = <T extends BaseSchemaFactory<any>>(schemaFactory: T): T['schema'] => {
  const { schema, hooks } = schemaFactory;

  if (hooks.pre) {
    for (const hook of Object.keys(hooks.pre)) {
      schema.pre(hook, hooks.pre[hook]);
    }
  }

  if (hooks.post) {
    for (const hook of Object.keys(hooks.post)) {
      schema.post(hook, hooks.post[hook]);
    }
  }

  return schema;
};
