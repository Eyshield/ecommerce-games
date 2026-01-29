import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { cartRequestDto } from '../Models/CartRequestDto.models';
import { Observable } from 'rxjs';

import { environment } from '../Environment/Environement';
import { Page } from '../Models/Page.Models';
import { Cart } from '../Models/Cart.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  public addToCart(cartRequestDto: cartRequestDto): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/cart`, cartRequestDto);
  }
  public getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${environment.apiUrl}/cart/${id}`);
  }
  public getCartByUserId(userId: number): Observable<Page<Cart>> {
    return this.http.get<Page<Cart>>(`${environment.apiUrl}/cart/${userId}`);
  }
  public updateCart(
    id: number,
    cartRequestDto: cartRequestDto,
  ): Observable<Cart> {
    return this.http.put<Cart>(
      `${environment.apiUrl}/cart/${id}`,
      cartRequestDto,
    );
  }
  public getAllCarts(page: number, size: number): Observable<Page<Cart>> {
    return this.http.get<Page<Cart>>(
      `${environment.apiUrl}/cart?page=${page}&size=${size}`,
    );
  }
  public searchCarts(name: string): Observable<Page<Cart>> {
    return this.http.get<Page<Cart>>(
      `${environment.apiUrl}/cart/search?nom=${name}`,
    );
  }
  public removeCart(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/cart/${id}`);
  }
}
