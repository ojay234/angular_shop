import { Component, OnInit } from '@angular/core';
import { Order } from 'app/shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: any;

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }
}
