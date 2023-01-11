import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Users } from '../interfaces/users'
import {environment} from "../../../environments/environment";
import {RegistrationData} from "../interfaces/registration-data";

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<Users[]>(environment.urlUsersAll)
  }

  getUserById(id: number){
    return this.httpClient.get<Users>(`${environment.urlUsersAll}/${id}`)
  }

  addUser(user: Users){
    return this.httpClient.post<Users>('http://localhost:3001/users', user)
  }

  editUser(userData: RegistrationData, id: number){
    return this.httpClient.put<Users>(`http://localhost:3001/users/${id}`, userData)
  }

  deleteUser(id: number){
    return this.httpClient.delete<Users>(`http://localhost:3001/users/${id}`)
  }
}
