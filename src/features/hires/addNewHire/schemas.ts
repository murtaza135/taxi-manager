import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import isCurrency from 'validator/es/lib/isCurrency';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { MergeOverwrite } from '@/types/utils';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addTaxiToHireAgreementSchema = z.object({
  taxi_id: z
    .number({ required_error: 'Taxi required' })
    .positive('Taxi required'),
  number_plate: z
    .string({ required_error: 'Number plate required' })
    .trim()
    .toUpperCase()
    .min(1, 'Number plate required')
    .transform((val) => val.replace(/\s/g, '')),
  make: z
    .string({ required_error: 'Make required' })
    .trim()
    .min(1, 'Make required'),
  model: z
    .string({ required_error: 'Model required' })
    .trim()
    .min(1, 'Model required'),
  colour: z
    .string({ required_error: 'Colour required' })
    .trim()
    .min(1, 'Colour required'),
  phc_number: z
    .string()
    .trim()
    .toUpperCase()
    .optional()
    .or(z.literal('')),
});

export const addDriverToHireAgreementSchema = z.object({
  driver_id: z
    .number({ required_error: 'Driver required' })
    .positive('Driver required'),
  name: z
    .string({ required_error: 'Driver required' })
    .trim()
    .min(1, 'Driver required'),
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
});

export const addNewHireAgreementDetailsSchema = z.object({
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
  permission_letter_document_path: z
    .instanceof(File, { message: 'Allowed file types: images or PDF' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
  contract_document_path: z
    .instanceof(File, { message: 'Allowed file types: images or PDF' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
  deposit_receipt_document_path: z
    .instanceof(File, { message: 'Allowed file types: images or PDF' })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((file) => file.type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
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

export const addNewHireAgreementSchema = addTaxiToHireAgreementSchema
  .merge(addDriverToHireAgreementSchema)
  .merge(addNewHireAgreementDetailsSchema.innerType());

// convert nullish values to undefined and FileList objects to File objects
export const addNewHireAgreementTransformer = (data: AddNewHireAgreementSchema) => (
  mapValues(data, (val, key) => {
    if (!val) return undefined;
    if (Number.isNaN(val)) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
    if (key === 'rent_amount' || key === 'deposit_amount') return Number(val);
    return val;
  }) as AddNewHireAgreementTransformedSchema
);

export type AddTaxiToHireAgreementSchema = z.infer<typeof addTaxiToHireAgreementSchema>;
export type AddDriverToHireAgreementSchema = z.infer<typeof addDriverToHireAgreementSchema>;
export type AddNewHireAgreementDetailsSchema = z.infer<typeof addNewHireAgreementDetailsSchema>;
export type AddNewHireAgreementSchema = z.infer<typeof addNewHireAgreementSchema>;

// convert FileList objects to File Objects
export type AddNewHireAgreementTransformedSchema = MergeOverwrite<AddNewHireAgreementSchema, {
  permission_letter_document_path?: File | undefined;
  contract_document_path?: File | undefined;
  deposit_receipt_document_path?: File | undefined;
  rent_amount: number;
  deposit_amount: number;
}>;
