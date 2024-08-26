export class DueDate {
  private readonly date: Date;

  constructor(date: Date) {
    if (date < new Date()) {
      throw new Error('Due date must be in the future');
    }
    this.date = date;
  }

  public getDate(): Date {
    return this.date;
  }
}
