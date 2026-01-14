import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environment/Environement';
import { user } from '../Models/User.models';
import { Observable } from 'rxjs';
import { Page } from '../Models/Page.Models';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  public getAllUsers(size: number, page: number): Observable<Page<user>> {
    return this.http.get<Page<user>>(
      `${environment.apiUrl}/user/all?size=${size}&page=${page}`
    );
  }
  public getUserById(id: number): Observable<user> {
    return this.http.get<user>(`${environment.apiUrl}/user/${id}`);
  }
  public addUser(user: user): Observable<user> {
    return this.http.post<user>(`${environment.apiUrl}/user`, user);
  }
  public updateUser(id: number, user: user): Observable<user> {
    return this.http.put<user>(`${environment.apiUrl}/user/${id}`, user);
  }
  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/user/${id}`);
  }
  public searchCategories(name: string): Observable<Page<user>> {
    return this.http.get<Page<user>>(
      `${environment.apiUrl}/user/search/${name}`
    );
  }
}
