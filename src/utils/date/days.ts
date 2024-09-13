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

export function getNextDateFromDay(day: Day) {
  if (day === 'monday') return nextMonday(new Date());
  if (day === 'tuesday') return nextTuesday(new Date());
  if (day === 'wednesday') return nextWednesday(new Date());
  if (day === 'thursday') return nextThursday(new Date());
  if (day === 'friday') return nextFriday(new Date());
  if (day === 'saturday') return nextSaturday(new Date());
  return nextSunday(new Date());
}
