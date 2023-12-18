import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { returnAndOrder } from 'src/app/services/ordersAndReturn';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private apiServ: HttpService, private router: Router, private orderReturnServ: returnAndOrder) { }

  Orders = [];
  carts = [];
  apiUrl = 'https://api.bharatmatcompany.com';

  dealer;
  order
  ngOnInit() {
    this.apiServ.getOrders('/api/myorder/').subscribe((res: any) => {
      this.Orders = res;
      this.order = res;
    
      this.order.carts((prod) => {
        // console.log(prod);
        // console.log('prod');

      })

    })

    if (localStorage.getItem('userType') == 'CUSTOMER') {
      this.dealer = false;
    }

  }

  open(product) {
    this.router.navigate(['dashboard/dashboard-orders-and-returns/return-orders', product.id])
    this.orderReturnServ.orderCancellation(product)

  }
  qty
  totalQty
  productDetails;
  orderDetails(product) {
    this.productDetails = product
// count product qty 
    let totalqty = 0;
   this.productDetails.carts.forEach(function (arrayItem) {
      totalqty += arrayItem.qty;
    });
    this.totalQty=totalqty
  }
}
