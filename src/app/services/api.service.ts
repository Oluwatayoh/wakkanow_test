import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UtilityService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private utilService: UtilityService) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roles`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching roles:', error);
        throw error;
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    this.utilService.showLoading();
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, user).pipe(
      map(response => {
        this.utilService.hideLoading();
        this.utilService.showSuccess('Success', 'User updated successfully');
        return response;
      }),
      catchError(error => {
        this.utilService.hideLoading();
        this.utilService.showError('Error', 'Error updating user');
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    this.utilService.showLoading();
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`).pipe(
      map(response => {
        this.utilService.hideLoading();
        this.utilService.showSuccess('Success', 'User deleted successfully');
        return response;
      }),
      catchError(error => {
        this.utilService.hideLoading();
        this.utilService.showError('Error', 'Error deleting user');
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }
}
