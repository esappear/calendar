const MONTH_MAP = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
export default function month (input: Date|string):string {
  if (typeof input === 'string') return input;
  if (!(input instanceof Date)) return String(input);
  return MONTH_MAP[input.getMonth()] + '月';
}