export function toDateInputString(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayString = `${day < 10 ? '0' : ''}${day}`;
  const monthString = `${month < 10 ? '0' : ''}${month}`;

  const dateString = `${year}-${monthString}-${dayString}`;
  return dateString;
}