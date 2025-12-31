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
      orderRequestDto
    );
  }
  public getOrdersByUserId(userId: number): Observable<Page<orders>> {
    return this.http.get<Page<orders>>(`${environment.apiUrl}/order/${userId}`);
  }
  public updateOrder(
    id: number,
    orderRequestDto: orderRequestDto
  ): Observable<orders> {
    return this.http.put<orders>(
      `${environment.apiUrl}/order/${id}`,
      orderRequestDto
    );
  }

  public getAllOrders(page: number, size: number): Observable<Page<orders>> {
    return this.http.get<Page<orders>>(
      `${environment.apiUrl}/order/all?page=${page}&size=${size}`
    );
  }
}
