import { z } from 'zod';
import { isBefore, isValid } from 'date-fns';
import isCurrency from 'validator/es/lib/isCurrency';
import { mapValues } from 'lodash';
import { MergeOverwrite } from '@/types/utils';

export const addNewRentHireSchema = z.object({
  hire_id: z
    .number({ required_error: 'Taxi required' })
    .positive('Taxi required'),
});

export const addNewRentDetailsSchema = z.object({
  start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' }),
  end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  amount: z
    .string({ required_error: 'Rent amount required' })
    .trim()
    .min(1, 'Rent amount required')
    .refine((val) => isCurrency(val)),
}).refine(
  ({ start_date, end_date }) => {
    if (end_date) {
      return isBefore(start_date, end_date);
    }
    return true;
  },
  {
    message: 'End date must come after start date',
    path: ['end_date'],
  },
);

export const addNewRentSchema = addNewRentHireSchema
  .merge(addNewRentDetailsSchema.innerType());

export const addNewRentTransformer = (data: AddNewRentSchema) => (
  mapValues(data, (val, key) => {
    if (!val) return undefined;
    if (Number.isNaN(val)) return undefined;
    if (key === 'amount') return Number(val);
    return val;
  }) as AddNewRentTransformedSchema
);

export type AddNewRentHireSchema = z.infer<typeof addNewRentHireSchema>;
export type AddNewRentDetailsSchema = z.infer<typeof addNewRentDetailsSchema>;
export type AddNewRentSchema = z.infer<typeof addNewRentSchema>;

export type AddNewRentTransformedSchema = MergeOverwrite<AddNewRentSchema, {
  amount: number;
}>;