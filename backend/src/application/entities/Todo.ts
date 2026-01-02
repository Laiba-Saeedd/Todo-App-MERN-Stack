export class Todo {
  constructor(
    public title: string,
    public userId: number,
    public completed: boolean = false
  ) {}
}
