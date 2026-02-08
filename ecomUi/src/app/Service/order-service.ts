import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { orderRequestDto } from '../Models/OrderRequestDto';
import { Observable } from 'rxjs';

import { environment } from '../Environment/Environement';
import { orders } from '../Models/Order.Models';
import { Page } from '../Models/Page.Models';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);
  public placeOrder(orderRequestDto: orderRequestDto): Observable<orders> {
    return this.http.post<orders>(
      `${environment.apiUrl}/order`,
      orderRequestDto,
    );
  }
  public getOrdersByUserId(
    userId: string,
    page: number,
    size: number,
  ): Observable<Page<orders>> {
    return this.http.get<Page<orders>>(
      `${environment.apiUrl}/order/${userId}?page=${page}&size=${size}`,
    );
  }
  public getOrdersById(id: number): Observable<orders> {
    return this.http.get<orders>(`${environment.apiUrl}/order/${id} `);
  }
  public updateOrder(
    id: number,
    orderRequestDto: orderRequestDto,
  ): Observable<orders> {
    return this.http.put<orders>(
      `${environment.apiUrl}/order/${id}`,
      orderRequestDto,
    );
  }

  public getAllOrders(page: number, size: number): Observable<Page<orders>> {
    return this.http.get<Page<orders>>(
      `${environment.apiUrl}/order?page=${page}&size=${size}`,
    );
  }
  public searchOrders(name: string): Observable<Page<orders>> {
    return this.http.get<Page<orders>>(
      `${environment.apiUrl}/order/search?nom=${name}`,
    );
  }
  public removeOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/order/${id}`);
  }
}
