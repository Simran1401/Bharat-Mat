import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { DashboardServiceService } from '../dashboard-my-address-book/dashboard-service.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {


  dealerisOn

  isdealer =localStorage.getItem('userType') == 'DEALER'
  constructor(private dashBoardServ: DashboardServiceService, private httpService: HttpService,
    private toastr:ToastrService, private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('userType') == 'DEALER') {
      this.dealerisOn = true;
    } else {
      this.dealerisOn = false;
    }
    this.getProfile()
  }

  sendBoolean() {
    this.dashBoardServ.openAddComp(true)
  }

  logOut() {
    this.httpService.loggingOut('/api/logout/', localStorage.getItem('userToken'))
    localStorage.clear();
    this.toastr.success('Logout successfull')
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }
  logout() {
    
    // this.router.navigate(['/']);
    this.toastr.success('Logout successfull')
    this.router.navigate(['/home'])
    // .then(() => {
    //   window.location.reload();
    // });
  }

  dealerProfileData
  getProfile() {
    this.httpService.myProfile().subscribe(res => {
      this.dealerProfileData = res
    })
  }
}
