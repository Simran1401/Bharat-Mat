import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard-wallet',
  templateUrl: './dashboard-wallet.component.html',
  styleUrls: ['./dashboard-wallet.component.css']
})
export class DashboardWalletComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  walletData
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.httpService.myProfile().subscribe(res => {
      this.walletData = res
    })
  }

  debit=false;
  credit=false;
  all=true;

  showAll(){
    this.debit=false;
    this.credit=false;
    this.all=true;
  }
  showDebit(){
    this.debit=true;
    this.credit=false;
    this.all=false;
  }
  showCredit(){
    this.debit=false;
    this.credit=true;
    this.all=false;
  }
}
