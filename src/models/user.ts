export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export class UserClass implements User {
  id: number;
  name: string;
  email: string;
  active: boolean;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }

  activate(): void {
    this.active = true;
  }
}