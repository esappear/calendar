export default function date (input: Date|string, format: string = 'YYYY-MM-DD'):string {
  if (typeof input === 'string') return input;
  if (!(input instanceof Date)) return String(input);
  return format.replace('YYYY', input.getFullYear() + '')
    .replace('MM', (input.getMonth() >= 10 ? '' : '0') + input.getMonth())
    .replace('M', input.getMonth() + '')
    .replace('DD', (input.getDate() >= 10 ? '' : '0') + input.getDate())
    .replace('D', input.getDate() + '');
}