// import {
//   FormProvider,
//   Form,
//   FormTitle,
//   FormField,
//   FormGroup,
//   useZodForm,
// } from '@/ui/form/Form';
// import { Input } from '@/ui/form/Input';
// import { Button } from '@/ui/Button';
// import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
// import { addNewTaxiDetailsSchema, AddNewTaxiDetailsSchema } from '@/features/taxis/addNewTaxi/schemas';

// export function AddNewTaxiDetailsForm() {
//   const {
//     formState,
//     nextStep,
//     updateFormState,
//   } = useMultiStepFormContext<AddNewTaxiDetailsSchema>();

//   const form = useZodForm({
//     schema: addNewTaxiDetailsSchema,
//     defaultValues: formState,
//   });

//   // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
//   const pictureField = form.registerFileList('picture_path');
//   const logbookDocumentField = form.registerFileList('logbook_document_path');

//   const handleSubmit = form.handleSubmit((data) => {
//     updateFormState(data);
//     nextStep();
//     window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
//   });

//   return (
//     <FormProvider {...form}>
//       <Form
//         onSubmit={handleSubmit}
//         className="w-full max-w-[32rem] space-y-4"
//       >
//         <FormTitle>Taxi</FormTitle>

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormGroup label="* Name">
//               <Input placeholder="Name" {...field} />
//             </FormGroup>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormGroup label="Email">
//               <Input placeholder="Email" type="email" {...field} />
//             </FormGroup>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="phone_number"
//           render={({ field }) => (
//             <FormGroup label="Phone Number">
//               <Input placeholder="Phone Number" type="tel" {...field} />
//             </FormGroup>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="national_insurance_number"
//           render={({ field }) => (
//             <FormGroup label="National Insurance Number">
//               <Input placeholder="National Insurance Number" {...field} />
//             </FormGroup>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="date_of_birth"
//           render={({ field }) => (
//             <FormGroup label="Date of Birth">
//               <Input
//                 placeholder="Date of Birth"
//                 type="date"
//                 onFocus={(event) => event.target.showPicker()}
//                 {...field}
//               />
//             </FormGroup>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="picture"
//           render={() => (
//             <FormGroup label="Picture">
//               <Input type="file" placeholder="Picture" accept="image/*" {...pictureField} />
//               <Input type="file" placeholder="Picture" accept="image/*" {...pictureField} />
//             </FormGroup>
//           )}
//         />

//         <div className="pt-3 flex justify-end gap-3">
//           <Button type="submit" variant="primary">Next</Button>
//         </div>
//       </Form>
//     </FormProvider>
//   );
// }
