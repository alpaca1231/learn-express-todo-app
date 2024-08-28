import { DueDate } from '@valueObjects/DueDate';

export class Todo {
  private id: string;
  private title: string;
  private isCompleted: boolean;
  private dueDate: DueDate;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    title: string,
    isCompleted: boolean,
    dueDate: DueDate,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
  ) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  // getter methods
  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  public getDueDate(): DueDate {
    return this.dueDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  public complete(): void {
    this.isCompleted = true;
    this.updatedAt = new Date();
  }

  public updateTitle(title: string): void {
    this.title = title;
    this.updatedAt = new Date();
  }

  public updateDueDate(dueDate: DueDate): void {
    this.dueDate = dueDate;
    this.updatedAt = new Date();
  }
}
