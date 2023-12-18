import { Component, OnInit } from '@angular/core';
import { returnProduct } from 'src/app/models/returnProduct';
import { returnAndOrder } from 'src/app/services/ordersAndReturn';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {

  constructor(private returnService:returnAndOrder) { }

  return=[]
  apiUrl = 'https://api.bharatmatcompany.com';
  ngOnInit(): void {
    this.returnProduct();
  }
  returnProduct(){
    this.returnService.returnProduct().subscribe((res: any)=>{
      this.return=res
    })
  }

}
