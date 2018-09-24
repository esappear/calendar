const MONTH_MAP = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
export default function month (input: Date|string|Number):string {
  if (typeof input === 'string') return input;
  if (typeof input === 'number') return MONTH_MAP[input - 1] + '月';
  if (!(input instanceof Date)) return String(input);
  return MONTH_MAP[input.getMonth()] + '月';
}