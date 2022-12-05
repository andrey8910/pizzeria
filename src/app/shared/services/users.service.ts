import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Users } from '../interfaces/users'

import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<Users[]>(environment.urlUsersAll)
  }

  addUser(user: Users){
    return this.httpClient.post<Users>('http://localhost:3001/users', user)

  }
}
