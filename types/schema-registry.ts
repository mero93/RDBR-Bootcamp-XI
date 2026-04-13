import { z } from 'zod';

import {
  LoginFormSchema,
  RegisterStep1Schema,
  RegisterStep2Schema,
  RegisterStep3Schema,
  UserProfileSchema,
} from './authorization-schemas';

export type SchemaRegistry = {
  RegisterStep1Schema: typeof RegisterStep1Schema;
  RegisterStep2Schema: typeof RegisterStep2Schema;
  RegisterStep3Schema: typeof RegisterStep3Schema;
  UserProfileSchema: typeof UserProfileSchema;
  LoginFormSchema: typeof LoginFormSchema;
};

export const Schemas = {
  RegisterStep1Schema,
  RegisterStep2Schema,
  RegisterStep3Schema,
  UserProfileSchema,
  LoginFormSchema,
} satisfies SchemaRegistry;

export type CustomSchemaKey = keyof typeof Schemas;

export type SchemaData = z.infer<SchemaRegistry[keyof SchemaRegistry]>;

export type InferSchemaByKey<K extends CustomSchemaKey> = z.infer<(typeof Schemas)[K]>;

export function getSchema<K extends CustomSchemaKey>(key: K): SchemaRegistry[K] {
  return Schemas[key];
}
