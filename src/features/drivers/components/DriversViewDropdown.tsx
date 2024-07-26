import { IoFileTrayFull } from 'react-icons/io5';
import { capitalCase } from 'change-case';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/ui/DropdownMenu';
import { Button } from '@/ui/Button';
import { views, ViewState } from '@/features/drivers/types';

type DriversViewDropdownProps = {
  view: ViewState;
  onViewChange: (view: ViewState) => void;
};

export function DriversViewDropdown({ view, onViewChange }: DriversViewDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="auto"
          className="[font-size:1.4rem] [line-height:2rem] center"
        >
          <IoFileTrayFull />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Select View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={view}
          onValueChange={(value) => onViewChange(value as ViewState)}
        >
          {views.map((value) => (
            <DropdownMenuRadioItem
              key={value}
              className="capitalize"
              value={value}
            >
              {capitalCase(value)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
