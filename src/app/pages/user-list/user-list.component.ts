import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsersAndRoles();
  }

  loadUsersAndRoles(): void {
    this.apiService.getUsers().subscribe({
      next: users => {
        this.apiService.getRoles().subscribe({
          next: roles => {
            this.users = users
              .filter(user => user.roleId !== 1)
              .map(user => {
                const role = roles.find(r => r.id === user.roleId);
                if (role) {
                  user.roleName = role.roleName;
                }
                return user;
              });
          },
          error: error => {
            console.error('Error fetching roles:', error);
          }
        });
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }

  isRoleIdZero(user: User): boolean {
    return user.roleId === 0;
  }

  selectUser(user: User): void {
    this.router.navigate(['/profile', user.id]);
  }
}