import { nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday, nextSunday } from 'date-fns';

export const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type Day = typeof days[number];

export function isDay(value: unknown): value is Day {
  return days.includes(value as Day);
}

export function getPreviousDay(day: Day): Day {
  const index = days.findIndex((value) => value === day);
  if (index === -1) throw new Error('Invalid day');
  const previousDay = days.at(index - 1);
  if (!previousDay) throw new Error('Invalid day');
  return previousDay;
}

export function getNextDateFromDay(day: Day) {
  if (day === 'monday') return nextMonday(new Date());
  if (day === 'tuesday') return nextTuesday(new Date());
  if (day === 'wednesday') return nextWednesday(new Date());
  if (day === 'thursday') return nextThursday(new Date());
  if (day === 'friday') return nextFriday(new Date());
  if (day === 'saturday') return nextSaturday(new Date());
  if (day === 'sunday') return nextSunday(new Date());
  throw new Error('Invalid day');
}
