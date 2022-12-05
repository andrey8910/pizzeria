export interface AuthorizationDialogData {
  login: string;
  password: string;
  isPassedAuthentication: boolean;
  resultAuthentication: {
    name : string,
    login : string,
    password : string
  }
}
