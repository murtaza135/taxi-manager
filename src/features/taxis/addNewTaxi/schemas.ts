import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import { MergeOverwrite } from '@/types/utils';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPE = /image\/.+/;
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addNewTaxiDetailsSchema = z.object({
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
  picture_path: z
    .instanceof(FileList, { message: 'Allowed file types: images' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_IMAGE_MIME_TYPE), 'Allowed file types: images')
    .optional(),
  logbook_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
});

export const addNewTaxiLicenceDetailsSchema = z.object({
  compliance_certificate_licence_number: z
    .string({ required_error: 'Licence number required' })
    .trim()
    .min(1, 'Licence number required'),
  phc_number: z
    .string({ required_error: 'PHC number required' })
    .trim()
    .toUpperCase()
    .min(1, 'PHC number required'),
  taxi_licence_start_date: z
    .string()
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
    .optional()
    .or(z.literal('')),
  taxi_licence_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  compliance_certificate_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
  phc_licence_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
}).refine(
  ({ taxi_licence_start_date, taxi_licence_end_date }) => {
    if (taxi_licence_start_date) {
      return isBefore(taxi_licence_start_date, taxi_licence_end_date);
    }
    return true;
  },
  {
    message: 'End date must come after start date',
    path: ['taxi_licence_end_date'],
  },
);

export const addNewTaxiInsuranceSchema = z.object({
  policy_number: z
    .string({ required_error: 'Policy number required' })
    .trim()
    .min(1, 'Policy number required'),
  is_any_driver: z
    .boolean()
    .default(true),
  insurance_start_date: z
    .string({ required_error: 'Start date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' }),
  insurance_end_date: z
    .string({ required_error: 'End date required' })
    .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' }),
  insurance_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
})
  .refine(
    ({ insurance_start_date, insurance_end_date }) => {
      if (insurance_start_date) {
        return isBefore(insurance_start_date, insurance_end_date);
      }
      return true;
    },
    {
      message: 'End date must come after start date',
      path: ['insurance_end_date'],
    },
  );

export const addNewTaxiSchema = addNewTaxiDetailsSchema
  .merge(addNewTaxiLicenceDetailsSchema.innerType())
  .merge(addNewTaxiInsuranceSchema.innerType())
  .extend({
    compliance_certificate_licence_number: z
      .string()
      .trim()
      .min(1, 'Licence number required')
      .transform((val) => val.replace(/\s/g, ''))
      .optional()
      .or(z.literal('')),
    phc_number: z
      .string()
      .trim()
      .toUpperCase()
      .min(1, 'PHC number required')
      .optional()
      .or(z.literal('')),
    taxi_licence_end_date: z
      .string({ required_error: 'End date required' })
      .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' })
      .optional()
      .or(z.literal('')),
  })
  .extend({
    policy_number: z
      .string()
      .trim()
      .min(1, 'Policy number required')
      .optional()
      .or(z.literal('')),
    is_any_driver: z
      .boolean()
      .default(true),
    insurance_start_date: z
      .string()
      .refine((val) => isValid(new Date(val)), { message: 'Invalid start date' })
      .optional()
      .or(z.literal('')),
    insurance_end_date: z
      .string()
      .refine((val) => isValid(new Date(val)), { message: 'Invalid end date' })
      .optional()
      .or(z.literal('')),
  });

// convert nullish values to undefined and FileList objects to File objects
export const addNewTaxiTransformer = (data: AddNewTaxiSchema) => (
  mapValues(data, (val) => {
    if (!val) return undefined;
    if (Number.isNaN(val)) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
    return val;
  }) as AddNewTaxiTransformedSchema
);

export type AddNewTaxiDetailsSchema = z.infer<typeof addNewTaxiDetailsSchema>;
export type AddNewTaxiLicenceDetailsSchema = z.infer<typeof addNewTaxiLicenceDetailsSchema>;
export type AddNewTaxiInsuranceSchema = z.infer<typeof addNewTaxiInsuranceSchema>;
export type AddNewTaxiSchema = z.infer<typeof addNewTaxiSchema>;

// convert FileList objects to File Objects
export type AddNewTaxiTransformedSchema = MergeOverwrite<AddNewTaxiSchema, {
  picture_path?: File | undefined;
  logbook_document_path?: File | undefined;
  compliance_certificate_document_path?: File | undefined;
  phc_licence_document_path?: File | undefined;
  insurance_document_path?: File | undefined;
}>;
