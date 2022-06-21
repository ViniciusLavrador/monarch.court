import { DocumentBuilder } from '@nestjs/swagger';

export const applyDocTags = (doc: DocumentBuilder, tags: Record<string, string>) => {
  return Object.values(tags).reduce((aggr, tag) => {
    return aggr.addTag(tag);
  }, doc);
};
