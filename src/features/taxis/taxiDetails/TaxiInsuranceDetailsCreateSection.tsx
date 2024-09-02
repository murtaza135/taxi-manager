import { Button } from '@/ui/Button';

export function TaxiInsuranceDetailsCreateSection() {
  return (
    <div className="flex flex-col gap-2 items-start py-2">
      {/* <p className="font-bold text-2xl">No Insurance</p> */}
      <p className="">You have not added any insurance details to this taxi.</p>
      <span className="pt-1">
        <Button>Add Insurance</Button>
      </span>
    </div>
  );
}
