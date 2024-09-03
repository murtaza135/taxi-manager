import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import { isBefore, isValid } from 'date-fns';
import isCurrency from 'validator/es/lib/isCurrency';
import { MergeOverwrite } from '@/types/utils';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_DOCUMENT_MIME_TYPE = /image\/.+|application\/pdf/;

export const addTaxiToHireAgreementSchema = z.object({
  taxi_id: z
    .string({ required_error: 'Taxi required' })
    .trim()
    .min(1, 'Taxi required')
    .refine((val) => !Number.isNaN(Number(val))),
});

export const addDriverToHireAgreementSchema = z.object({
  driver_id: z
    .string({ required_error: 'Driver required' })
    .trim()
    .min(1, 'Driver required')
    .refine((val) => !Number.isNaN(Number(val))),
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
    .refine((val) => isCurrency(val))
    .optional()
    .default('0.00'),
  permission_letter_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
  contract_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
    .optional(),
  deposit_receipt_document_path: z
    .instanceof(FileList, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => fileList.length === 0 || fileList.length === 1, { message: 'Allowed file types: images or PDF' })
    .refine((fileList) => !fileList[0] || fileList[0].size <= MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
    .refine((fileList) => !fileList[0] || fileList[0].type.match(ACCEPTED_DOCUMENT_MIME_TYPE), 'Allowed file types: images or PDF')
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
  mapValues(data, (val) => {
    if (!val) return undefined;
    if (Number.isNaN(val)) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
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
}>;
