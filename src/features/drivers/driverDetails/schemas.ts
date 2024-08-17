import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { isValid } from 'date-fns';
import mapValues from 'lodash/mapValues';
import { ReplaceUndefinedWithNull } from '@/types/utils';

export const updateDriverDetailsSchema = z.object({
  name: z
    .string({ required_error: 'First name required' })
    .min(1, 'Name required'),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('')),
  phone_number: z
    .string()
    .refine((val) => isMobilePhone(val), 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  national_insurance_number: z
    .string()
    .min(1, 'Invalid national insurance number')
    .optional()
    .or(z.literal('')),
  date_of_birth: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date of birth' })
    .optional()
    .or(z.literal('')),
  is_retired: z
    .boolean(),
  created_at: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date' })
    .optional(),
});

export const updateDriverTransformer = (data: UpdateDriverDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateDriverDetailsSchema>
);

export type UpdateDriverDetailsSchema = z.infer<typeof updateDriverDetailsSchema>;
