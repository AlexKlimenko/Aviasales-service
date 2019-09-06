import { format } from 'date-fns';

export function formateDateFromString(string, formatType) {
  if (!string) return string;
  const date = new Date(string);
  return format(date, formatType);
}