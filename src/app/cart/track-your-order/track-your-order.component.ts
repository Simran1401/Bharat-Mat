import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { returnAndOrder } from 'src/app/services/ordersAndReturn';

@Component({
  selector: 'app-track-your-order',
  templateUrl: './track-your-order.component.html',
  styleUrls: ['./track-your-order.component.css']
})
export class TrackYourOrderComponent implements OnInit {

  constructor(private apiServ: HttpService) { }

  product;
  orderid
  ngOnInit() {

    var orderBar = document.querySelectorAll('.order-tracking');


    this.apiServ.getOrders('/api/myorder/').subscribe((res: any) => {
      this.orderid = res[0].id;
      this.product = res[0];
     
      if (this.product.date_time) {
        orderBar[0].classList.add('completed')
      }

      if (this.product.accept_date) {
        orderBar[1].classList.add('completed')
      }

      if (this.product.dispatch_date) {
        orderBar[2].classList.add('completed')
      }

      if (this.product.deliver_date) {
        orderBar[3].classList.add('completed')
      }

 
    })





  }

}
