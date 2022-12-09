export interface AuthorizationDialogData {
  login: string;
  password: string;
  isPassedAuthentication: boolean;
  resultAuthentication: {
    id: number | null,
    name : string,
    login : string,
    password : string
  }
}
