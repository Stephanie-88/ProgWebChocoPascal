export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: string,
    public isActive: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) { }
}


