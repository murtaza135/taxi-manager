import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import isCurrency from 'validator/es/lib/isCurrency';
import { MergeOverwrite, ReplaceUndefinedWithNull } from '@/types/utils';

export const updateRentDetailsSchema = z.object({
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

export const updateRentDetailsTransformer = (data: UpdateRentDetailsSchema) => (
  mapValues(data, (val, key) => {
    if (val === undefined || val === null || val === '') return null;
    if (key === 'amount') return Number(val);
    return val;
  }) as UpdateRentDetailsTransformedSchema
);

export type UpdateRentDetailsSchema = z.infer<typeof updateRentDetailsSchema>;

export type UpdateRentDetailsTransformedSchema = MergeOverwrite<
  ReplaceUndefinedWithNull<UpdateRentDetailsSchema>, {
    amount: number;
  }
>;
