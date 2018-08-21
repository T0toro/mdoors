/**
 * Models
 */

interface IUser {
  name: string;
  lastname: string;
  login: string;
  telephone: string;
  password: string;
  departament: string;
  group: string;

  add(): boolean;
}
