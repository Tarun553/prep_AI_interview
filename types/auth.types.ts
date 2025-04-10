export enum FormType {
  LOGIN = 'login',
  REGISTER = 'register'
}

export interface SignUpParams {
  uid: string;
  name: string;
  email: string;

  password: string;

}

export interface SignInParams {
  email: string;
  idToken: string;
}
