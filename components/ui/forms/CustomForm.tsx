'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { CustomSchemaKey, getSchema, SchemaData, SchemaRegistry } from '@/types/schema-registry';

export type FormProperties = {
  id: string;
  schemaKey: CustomSchemaKey;
  children: ReactNode;
  onSubmit: (data: z.infer<SchemaRegistry[CustomSchemaKey]>) => void;
  onValidationChange?: (isValid: boolean) => void;
  defaultValues?: DefaultValues<z.infer<SchemaRegistry[CustomSchemaKey]>>;
  className?: string;
};

export const CustomForm = ({
  id,
  schemaKey,
  children,
  onSubmit,
  defaultValues,
  onValidationChange,
  className,
}: FormProperties) => {
  const schema = getSchema(schemaKey);

  const methods = useForm<SchemaData>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const {
    formState: { isValid },
  } = methods;

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id} className="mt-6 mb-3 w-full">
        <div className={cn('grid w-full grid-cols-1 gap-x-6 gap-y-0 md:grid-cols-2', className)}>{children}</div>
      </form>
    </FormProvider>
  );
};
