import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environment/Environement';
import { Category } from '../Models/Category.models';
import { Page } from '../Models/Page.Models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  public getAllCategories(
    size: number,
    page: number
  ): Observable<Page<Category>> {
    return this.http.get<Page<Category>>(
      `${environment.apiUrl}/category?size=${size}&page=${page}`
    );
  }
  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
  }
  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/category`, category);
  }
  public updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${environment.apiUrl}/category/${id}`,
      category
    );
  }
  public deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/category/${id}`);
  }
  public searchCategories(name: string): Observable<Page<Category>> {
    return this.http.get<Page<Category>>(
      `${environment.apiUrl}/category/search/${name}`
    );
  }
}
