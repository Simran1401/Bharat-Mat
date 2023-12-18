import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addressInfoModal } from 'src/app/models/addressInfoModal';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard-my-address-book',
  templateUrl: './dashboard-my-address-book.component.html',
  styleUrls: ['./dashboard-my-address-book.component.css']
})
export class DashboardMyAddressBookComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private apiServ: HttpService,private toastr:ToastrService) { }

  addressInfo: addressInfoModal[]

  routeChange;

  ngOnInit() {

    this.apiServ.getAddress('/api/myaddress/').subscribe((res: addressInfoModal[]) => {
      this.addressInfo = res;
      localStorage.setItem('address', JSON.stringify(this.addressInfo))
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  navigateToEdit(i, id) {

    // this.dashboardServ.editItems(i)

    this.router.navigate([`${id}/${i}/edit`], { relativeTo: this.route })
  }

  navigateToNew() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  deleteAddress(i, id) {
    this.addressInfo.splice(id, 1)
    this.toastr.success('Address deleted successfully')
    this.apiServ.deleteAddress('/api/checkout/', i).subscribe(res => {
      this.toastr.success('Address deleted successfully')
    })
  }

  resDelete
  addressDelete(id){
   
   let data={
      id:id
    }
 
    
    this.apiServ.addressDelete(data).subscribe(res=>{
      
      this.resDelete=res
      if(this.resDelete.status== "Checkouted Delete Successfully"){
        this.toastr.success("Address Deleted Successfully")
      }
    })
  }

}
