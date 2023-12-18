import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {


  editProfileForm: FormGroup;
  constructor(private httpService: HttpService, private toastr: ToastrService , private router:Router) { }

  userProfileData
  loginCustomer
  isCustomer
  ngOnInit(): void {
    // this.httpService.getUserProfileData('/api/customer_profile/').subscribe((res:{name: string, phone: string, email: string}) => {
    //   this.userProfileData = res
    // })
    this.getProfile()
    this.editProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      // phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email])
    })

    this.loginCustomer = localStorage.getItem('userType')
   
    this.isCustomer=this.loginCustomer=='CUSTOMER'
  }

  display = "none";

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  getProfile() {
    this.httpService.myProfile().subscribe(res => {
      this.userProfileData = res
    })
  }

  statusMsg
  updateRes
  updateProfile() {
    this.httpService.editProfile(this.editProfileForm.value).subscribe(res => {
      this.updateRes = res;
      this.statusMsg = this.updateRes.msg
      if (this.updateRes.msg = "successfully Update") {
        this.toastr.success(this.updateRes.msg)
        setTimeout(() => {
          this.statusMsg = null
        }, 3000)
        this.getProfile();
        this.onCloseHandled();
        let click = <HTMLElement>document.querySelector('.btn-close')
        click?.click();
      }
    })
  }
  dealer(){
    this.router.navigate(['/become-a-dealer']).then(()=>{
      window.location.reload()
    })
  }
}
