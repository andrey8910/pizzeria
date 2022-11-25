import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public allUsers: Users[]
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.initialize()
  }

    private initialize(){
      this.usersService.getUsers().pipe(
        tap((users) => {
          this.allUsers = users
        }),

      ).subscribe()
    }

    public addClient(){

    this.usersService.addUser()
      .pipe(
        tap((data) => console.log(data))
      )
      .subscribe()
    }
}
