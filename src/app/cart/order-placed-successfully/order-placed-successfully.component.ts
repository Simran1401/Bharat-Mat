import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-placed-successfully',
  templateUrl: './order-placed-successfully.component.html',
  styleUrls: ['./order-placed-successfully.component.css']
})
export class OrderPlacedSuccessfullyComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute, private apiServ: HttpService ) { }
  OrderId;
  ngOnInit() {
    this.apiServ.getOrders('/api/myorder/').subscribe((res: any) => {
      this.OrderId = res[0].id;
    })
  }

  openTrackOrderPage(){
    this.router.navigate(['/track-your-order'], {relativeTo: this.route})

  }

}
