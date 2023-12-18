import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-shipping-policy',
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.css']
})
export class ShippingPolicyComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  shippingDetails
  ngOnInit(): void {
    this.httpService.getShippingDetails('/api/shpping_policy/').subscribe(res=>{
 
      this.shippingDetails=res;
    })
  }

}
