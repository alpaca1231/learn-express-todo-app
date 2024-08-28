export class DueDate {
  private readonly date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  public getDate(): Date {
    return this.date;
  }

  // 未来日じゃない場合はエラーを投げる
  public validate(): void {
    if (this.date < new Date()) {
      throw new Error('Due date must be in the future');
    }
  }
}
