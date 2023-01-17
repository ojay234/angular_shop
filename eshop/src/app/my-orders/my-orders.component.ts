import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { switchMap, Observable } from 'rxjs';
import { Order } from '../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders$: any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap((user: any) => this.orderService.getOrdersByUser(user.uid))
    );
  }
}
