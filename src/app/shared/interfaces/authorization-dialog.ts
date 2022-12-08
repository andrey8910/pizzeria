export interface AuthorizationDialogData {
  login: string;
  password: string;
  isPassedAuthentication: boolean;
  resultAuthentication: {
    id?: number
    name : string,
    login : string,
    password : string
  }
}
