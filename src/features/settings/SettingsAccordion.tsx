import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
} from '@/ui/Accordion';
import { Separator } from '@/ui/Separator';
import { SettingsCompanyDetailsSection } from '@/features/settings/SettingsCompanyDetailsSection';
import { SettingsChangeEmailSection } from '@/features/settings/SettingsChangeEmailSection';
import { SettingsChangePasswordSection } from '@/features/settings/SettingsChangePasswordSection';
import { Spinner } from '@/ui/Spinner';

export function SettingsAccordion() {
  return (
    <Accordion type="multiple" defaultValue={['details']} className="!flex-grow-0">
      <AccordionItem value="details">
        <AccordionTrigger>Company Details</AccordionTrigger>
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <SettingsCompanyDetailsSection />
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="changeEmail">
        <AccordionTrigger>Change Email</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <SettingsChangeEmailSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="changePassword">
        <AccordionTrigger>Change Password</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <SettingsChangePasswordSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
