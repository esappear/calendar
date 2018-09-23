export default {
  TOTAL_GRIDS: 42,
  DATE_REG: /^\d{4}-\d{2}-\d{2}$/,
  _getDaysOfMonth (year: number, month: number): number {
    const _monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    while (month <= 0) {
      month += 12;
      year -= 1;
    }
    while (month > 12) {
      month -= 12;
      year += 1;
    }
    if (month !== 2) return _monthArr[month - 1];
    return year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0) ? 28 : 29;
  },
  _getDaysOfPrevMonth (year: number, month: number): number {
    return new Date(year, month - 1).getDay();
  },
  _getDaysOfNextMonth (year: number, month: number): number {
    return this.TOTAL_GRIDS - this._getDaysOfPrevMonth(year, month) - this._getDaysOfMonth(year, month);
  },
  getToday (): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  },
  _getMonthData (year: number, month: number): Date[] {
    let total = this._getDaysOfMonth(year, month);
    const arr: Date[] = [];
    while (total > 0) {
      arr.unshift(new Date(year, month - 1, total--));
    }
    return arr;
  },
  _getPrevMonthData (year: number, month: number): Date[] {
    let total = this._getDaysOfPrevMonth(year, month);
    const arr: Date[] = [];
    while (total > 0) {
      arr.push(new Date(year, month - 1, 1 - total--));
    }
    return arr;
  },

  _getNextMonthData (year: number, month: number): Date[] {
    let total = this._getDaysOfNextMonth(year, month);
    const arr: Date[] = [];
    while (total > 0) {
      arr.unshift(new Date(year, month, total--)); // 下个月第X天
    }
    return arr;
  },

  isSameMonth(date1: Date, date2: Date): Boolean {
    return date1 && date2 && date1.getMonth() === date2.getMonth();
  },

  getTableData (date?: Date|string): {
    today: Date,
    current: Date[],
    prev: Date[],
    next: Date[],
  } {
    let _date: Date;
    if (date && date instanceof Date) {
      _date = date;
    } else if (date && this.DATE_REG.test(date)) {
      _date = date instanceof Date ? date : new Date(date);
    } else {
      _date = this.getToday();
    }
    if (this.isSameMonth(date, this._lastDate) && this._tableData) return this._tableData;
    const _year = _date.getFullYear();
    const _month = _date.getMonth() + 1;
    this._tableData = {
      today: this.getToday(),
      current: this._getMonthData(_year, _month),
      prev: this._getPrevMonthData(_year, _month),
      next: this._getNextMonthData(_year, _month),
    };
    this._lastDate = date;
    return this._tableData;
  },
}