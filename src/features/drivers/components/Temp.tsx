import { FormConfirmation, FormConfirmationHeader, FormConfirmationField } from '@/ui/form/FormConfirmation';

export function Temp() {
  return (
    <FormConfirmation>
      <div className="space-y-4">
        <FormConfirmationHeader title="Driver" onEdit={() => console.log('edit')} />
        <div className="space-y-2">
          <FormConfirmationField title="Name" value="John Doe" />
          <FormConfirmationField title="Date of Birth" value="01/01/1996" />
          <FormConfirmationField title="Picture" value="C://hehehe/nope/byeee" />
        </div>
      </div>
      <div className="space-y-4">
        <FormConfirmationHeader title="Driver" onEdit={() => console.log('edit')} />
        <div className="space-y-2">
          <FormConfirmationField title="Name" value="John Doe" />
          <FormConfirmationField title="Date of Birth" value="01/01/1996" />
          <FormConfirmationField title="Picture" value="C://hehehe/nope/byeee" />
        </div>
      </div>
      <div className="space-y-4">
        <FormConfirmationHeader title="Driver" onEdit={() => console.log('edit')} />
        <div className="space-y-2">
          <FormConfirmationField title="Name" value="John Doe" />
          <FormConfirmationField title="Date of Birth" value="01/01/1996" />
          <FormConfirmationField title="Picture" value="C://hehehe/nope/byeee" />
        </div>
      </div>
    </FormConfirmation>
  );
}
