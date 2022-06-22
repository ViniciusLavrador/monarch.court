import mongoose from 'mongoose';
import { Status } from 'src/common/enums/status.enum';

export interface BaseEntity extends mongoose.Document {
  status: Status;
}

export interface BaseSchemaFactory<T extends mongoose.Document> {
  schema: mongoose.Schema<T, mongoose.Model<T, any, any, any>, unknown, unknown>;
  hooks?: {
    pre?: {
      aggregate?: mongoose.PreMiddlewareFunction<mongoose.Query<any, any, unknown, any>>;
      deleteOne?: mongoose.PreMiddlewareFunction<T & { _id: any }>;
      init?: mongoose.PreMiddlewareFunction<T & { _id: any }>;
      insertMany?: mongoose.PreMiddlewareFunction<mongoose.Query<any, any, unknown, any>>;
      remove?: mongoose.PreMiddlewareFunction<T & { _id: any }>;
      save?: mongoose.PreSaveMiddlewareFunction<T & { _id: any }>;
      updateOne?: mongoose.PreMiddlewareFunction<T & { _id: any }>;
      validate?: mongoose.PreMiddlewareFunction<T & { _id: any }>;
    };
    post?: {
      aggregate?: mongoose.PostMiddlewareFunction<mongoose.Query<any, any, unknown, any>>;
      deleteOne?: mongoose.PostMiddlewareFunction<T & { _id: any }>;
      init?: mongoose.PostMiddlewareFunction<T & { _id: any }>;
      insertMany?: mongoose.PostMiddlewareFunction<mongoose.Query<any, any, unknown, any>>;
      remove?: mongoose.PostMiddlewareFunction<T & { _id: any }>;
      save?: mongoose.PostMiddlewareFunction<T & { _id: any }, any>;
      updateOne?: mongoose.PostMiddlewareFunction<T & { _id: any }>;
      validate?: mongoose.PostMiddlewareFunction<T & { _id: any }>;
    };
  };
}

export default BaseEntity;
