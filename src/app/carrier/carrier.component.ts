import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  careers;
  ngOnInit(): void {
    this.httpService.getCarrersDetails('/api/carrers/').subscribe(res=>{
  
      this.careers=res;
    })
  }

}
