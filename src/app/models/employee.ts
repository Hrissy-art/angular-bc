export interface Employee {
  '@id'?: string;
  id?: any;
  empNumber: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: Date | undefined;
  adress: string;
  street_number: string;
  town: string;
  district: string;
  country: string;
}
