export interface User {
  id?: any;

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
