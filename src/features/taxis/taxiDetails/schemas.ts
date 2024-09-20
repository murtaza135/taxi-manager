import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import { ReplaceUndefinedWithNull } from '@/types/utils';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';

export const updateTaxiDetailsSchema = z.object({
  number_plate: z
    .string({ required_error: 'Number plate required' })
    .trim()
    .toUpperCase()
    .min(1, 'Number plate required')
    .transform((val) => val.replace(/\s/g, '')),
  make: z
    .string({ required_error: 'Make required' })
    .trim()
    .min(1, 'Make required')
    .transform((val) => capitalizeEachWord(val)),
  model: z
    .string({ required_error: 'Model required' })
    .trim()
    .min(1, 'Model required')
    .transform((val) => capitalizeEachWord(val)),
  colour: z
    .string({ required_error: 'Colour required' })
    .trim()
    .min(1, 'Colour required')
    .transform((val) => capitalizeEachWord(val)),
  chassis_number: z
    .string({ required_error: 'Chassis number required' })
    .trim()
    .toUpperCase()
    .min(1, 'Chassis number required'),
  registration_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid registration date' })
    .optional()
    .or(z.literal('')),
  expected_expiry_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid expected expiry date' })
    .optional()
    .or(z.literal('')),
  road_tax_expiry_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid road tax expiry date' })
    .optional()
    .or(z.literal('')),
  cc: z
    .coerce
    .number({ invalid_type_error: 'Invalid CC' })
    .max(32767, { message: 'CC is too big, please choose a smaller number' })
    .optional()
    .or(z.literal(0)),
  fuel_type: z
    .string()
    .trim()
    .min(1, 'Invalid fuel type')
    .optional()
    .or(z.literal('')),
  created_at: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid date' })
    .optional(),
});

export const updateTaxiDetailsTransformer = (data: UpdateTaxiDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateTaxiDetailsSchema>
);

export const updateTaxiLicenceDetailsSchema = z.object({
  compliance_certificate_licence_number: z
    .string({ required_error: 'Licence number required' })
    .trim()
    .min(1, 'Licence number required'),
  phc_number: z
    .string({ required_error: 'PHC number required' })
    .trim()
    .toUpperCase()
    .min(1, 'PHC number required'),
  start_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
}).refine(
  ({ start_date, end_date }) => {
    if (start_date) {
      return isBefore(start_date, end_date);
    }
    return true;
  },
  {
    message: 'End date must come after start date',
    path: ['taxi_licence_end_date'],
  },
);

export const updateTaxiLicenceDetailsTransformer = (data: UpdateTaxiLicenceDetailsSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateTaxiLicenceDetailsSchema>
);

export const updateTaxiInsuranceSchema = z.object({
  policy_number: z
    .string({ required_error: 'Policy number required' })
    .trim()
    .min(1, 'Policy number required'),
  is_any_driver: z
    .boolean()
    .default(true),
  start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' }),
  end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
})
  .refine(
    ({ start_date, end_date }) => {
      if (start_date) {
        return isBefore(start_date, end_date);
      }
      return true;
    },
    {
      message: 'End date must come after start date',
      path: ['insurance_end_date'],
    },
  );

export const updateTaxiInsuranceTransformer = (data: UpdateTaxiInsuranceSchema) => (
  mapValues(data, (val) => {
    if (val === undefined || val === null || val === '') return null;
    return val;
  }) as ReplaceUndefinedWithNull<UpdateTaxiInsuranceSchema>
);

export type UpdateTaxiDetailsSchema = z.infer<typeof updateTaxiDetailsSchema>;
export type UpdateTaxiLicenceDetailsSchema = z.infer<typeof updateTaxiLicenceDetailsSchema>;
export type UpdateTaxiInsuranceSchema = z.infer<typeof updateTaxiInsuranceSchema>;
