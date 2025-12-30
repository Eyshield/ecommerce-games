import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { cartRequestDto } from '../Models/CartRequestDto.models';
import { Observable } from 'rxjs';
import { Cart } from '../SharedC/cart/cart';
import { environment } from '../Environment/Environement';
import { Page } from '../Models/Page.Models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  public addToCart(cartRequestDto: cartRequestDto): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/cart`, cartRequestDto);
  }
  public getCartByUserId(userId: number): Observable<Page<Cart>> {
    return this.http.get<Page<Cart>>(`${environment.apiUrl}/cart/${userId}`);
  }
  public updateCart(
    id: number,
    cartRequestDto: cartRequestDto
  ): Observable<Cart> {
    return this.http.put<Cart>(
      `${environment.apiUrl}/cart/${id}`,
      cartRequestDto
    );
  }
}
