import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import isCurrency from 'validator/es/lib/isCurrency';
import { ReplaceUndefinedWithNull } from '@/types/utils';

export const updateHireAgreementDetailsSchema = z.object({
  start_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  end_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  rent_amount: z
    .string({ required_error: 'Rent required' })
    .trim()
    .min(1, 'Rent required')
    .refine((val) => isCurrency(val)),
  deposit_amount: z
    .string()
    .trim()
    .refine((val) => isCurrency(val) || val === '')
    .transform((val) => (val === '' ? '0' : val))
    .optional()
    .default('0'),
  is_retired: z
    .boolean(),
  created_at: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date' })
    .optional(),
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

export const updateHireAgreementDetailsTransformer = (data: UpdateHireAgreementDetailsSchema) => (
  mapValues(data, (val, key) => {
    if (val === undefined || val === null || val === '') return null;
    if (key === 'rent_amount' || key === 'deposit_amount') return Number(val);
    return val;
  }) as ReplaceUndefinedWithNull<UpdateHireAgreementDetailsSchema>
);

export type UpdateHireAgreementDetailsSchema = z.infer<typeof updateHireAgreementDetailsSchema>;
