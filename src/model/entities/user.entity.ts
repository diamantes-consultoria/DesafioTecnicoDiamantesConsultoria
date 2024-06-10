import { generateId } from '../../utils/id.util';

export type UserProps = {
  id: string;
  email: string;
  password: string;
};

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(email: string, password: string) {
    return new User({ id: generateId(5), email, password });
  }

  public static with(id: string, email: string, password: string) {
    return new User({ id, email, password });
  }
}
