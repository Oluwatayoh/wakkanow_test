import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../helper/shared.module";
import { User } from '../../interface/user';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  roles: any[] = [];
  selectedRoleId: number | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, public authService: AuthService) { }

  ngOnInit(): void {

    console.log(this.authService.isUserAdmin())
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.loadUser(userId);
    });
  }

  loadUser(userId: number): void {
    this.apiService.getUsers().subscribe({
      next: users => {
        this.user = users.find(user => user.id === userId.toString());
        console.log(">>>>>", this.user);
        if (this.user && this.user.status === 'inactive') {
          this.loadRoles();
        }
      },
      error: error => {
        console.error('Error fetching user:', error);
      }
    });
  }

  loadRoles(): void {
    this.apiService.getRoles().subscribe({
      next: roles => {
        this.roles = roles.filter(role => role.id !== 1);
      },
      error: error => {
        console.error('Error fetching roles:', error);
      }
    });
  }

  updateUser(): void {
    if (this.user) {
      this.user.roleId = this.selectedRoleId || this.user.roleId;
      this.user.status = 'active';
      if (this.authService.isUserAdmin() === true) {
        this.user.loginToken = this.generateRandomToken(16);
      }
      this.apiService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
        },
        error: error => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

  generateRandomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

}