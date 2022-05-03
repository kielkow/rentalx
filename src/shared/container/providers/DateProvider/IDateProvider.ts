interface IDateProvider {
  dateNow(): Date;
  dateTomorrow(): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}

export { IDateProvider };
