import { z } from 'zod';

export const FormSchema1 = z.object({
  username1: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export const FormSchema2 = z.object({
  username2: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export const FormSchema3 = z.object({
  username3: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export const FormSchema = FormSchema1.merge(FormSchema2).merge(FormSchema3);

export type FormSchemaType1 = z.infer<typeof FormSchema1>;
export type FormSchemaType2 = z.infer<typeof FormSchema2>;
export type FormSchemaType3 = z.infer<typeof FormSchema3>;
export type FormSchemaType = z.infer<typeof FormSchema>;
