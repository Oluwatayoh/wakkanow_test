import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UtilityService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(
    private apiService: ApiService,
    private utilService: UtilityService,
    private router: Router
  ) {
    this.loggedIn = !!localStorage.getItem('loggedInUser');
  }

  login(username: string, password: string): Observable<boolean> {
    this.utilService.showLoading();
    return this.apiService.getUsers().pipe(
      switchMap(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          if (user.loginToken == '') {
            this.utilService.hideLoading();
            this.utilService.showError('Oops', 'Account not approved, kindly notify the Admin');
            return of(false);
          }
          if (user.firstLogin) {
            return this.apiService.getRoles().pipe(
              map(roles => {
                const role = roles.find(r => r.id === user.roleId);
                if (role) {
                  user.roleName = role.roleName; // Add roleName to the user object
                  this.loggedIn = true;
                  sessionStorage.setItem('currentUser', JSON.stringify(user));
                  localStorage.setItem('loggedInUser', JSON.stringify({ username, roleId: user.roleId }));
                  this.utilService.hideLoading();
                  this.utilService.showSuccess('', 'Login Successful');
                  if (user.roleId === "1") {
                    this.router.navigate(['/users']);
                  } else {
                    this.router.navigate(['/profile', user.id]);
                  }
                  return true;
                } else {
                  this.utilService.hideLoading();
                  this.utilService.showError('Oops', 'Role not found');
                  return false;
                }
              }),
              catchError(error => {
                this.utilService.hideLoading();
                this.utilService.showError('Oops', 'Error fetching roles');
                console.error('Error fetching roles:', error);
                return of(false);
              })
            );
          } else {
            return this.promptForLoginToken(user);
          }

        } else {
          this.utilService.hideLoading();
          this.utilService.showError('Login Failed', 'Invalid Username or Password');
          return of(false);
        }
      }),
      catchError(error => {
        this.utilService.hideLoading();
        this.utilService.showError('Login Failed', 'Error fetching users');
        console.error('Error fetching users:', error);
        return of(false);
      })
    );
  }


  promptForLoginToken(user: any): Observable<boolean> {
    const loginToken = prompt('Please enter your login token:');
    if (loginToken === user.loginToken) {
      user.firstLogin = true;
      return this.apiService.updateUser(user.id, user).pipe(
        map(() => {
          this.loggedIn = true;
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('loggedInUser', JSON.stringify({ username: user.username, roleId: user.roleId }));
          this.utilService.hideLoading();
          this.utilService.showSuccess('', 'Login Successful');
          if (user.roleId === 1) {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/profile', user.id]);
          }
          return true;
        }),
        catchError(error => {
          this.utilService.hideLoading();
          this.utilService.showError('Oops', 'Error updating user');
          console.error('Error updating user:', error);
          return of(false);
        })
      );
    } else {
      this.utilService.hideLoading();
      this.utilService.showError('Oops', 'Invalid login token');
      return of(false);
    }
  }

  register(username: string, password: string, firstname: string, lastname: string): Observable<boolean> {
    this.utilService.showLoading();
    const newUser = {
      username,
      password,
      firstname,
      lastname,
      status: 'inactive',
      roleId: "0",
      firstLogin: false,
      loginToken: ""
    };
    return this.apiService.addUser(newUser).pipe(
      map(() => {
        this.utilService.hideLoading();
        this.utilService.showSuccess('', 'Registration Successful. Awaiting approval.');
        return true;
      }),
      catchError(error => {
        this.utilService.hideLoading();
        this.utilService.showError('Oops', 'Registration Failed');
        console.error('Error adding user:', error);
        return of(false);
      })
    );
  }


  logout(): void {
    this.loggedIn = false;
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): any {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }

  isUserAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.roleId === "1";
  }
}
