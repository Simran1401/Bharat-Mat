import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard-dealer-profile',
  templateUrl: './dashboard-dealer-profile.component.html',
  styleUrls: ['./dashboard-dealer-profile.component.css']
})
export class DashboardDealerProfileComponent implements OnInit {


  dealerUpdateForm: FormGroup
  constructor(private httpService: HttpService, private toastr:ToastrService) { }
  apiUrl = 'https://api.bharatmatcompany.com'
  dealerProfileData

 
  ngOnInit() {

    this.getProfile()
    this.dealerUpdateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile_number2: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
      land_line_number: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
      address: new FormControl('', Validators.required),
      shop_photo: new FormControl('', Validators.required)
    })


  }

  getProfile() {
    this.httpService.myProfile().subscribe(res => {
      this.dealerProfileData = res
    })
  }


  onSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.dealerUpdateForm.patchValue({
      shop_photo: file
    });

    this.dealerUpdateForm.get('shop_photo').updateValueAndValidity()
  }






  display = "none";

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  statusMsg
  formRes

  updateProfile() {

    var formData: any = new FormData();

    formData.append("name", this.dealerUpdateForm.get('name').value)
    formData.append("email", this.dealerUpdateForm.get("email").value)
    formData.append("mobile_number2", this.dealerUpdateForm.get('mobile_number2').value)
    formData.append("land_line_number", this.dealerUpdateForm.get("land_line_number").value)
    formData.append("address", this.dealerUpdateForm.get('address').value)
    formData.append("shop_photo", this.dealerUpdateForm.get("shop_photo").value)

   
    this.httpService.editDealerProfile(formData).subscribe(res => {

      this.formRes = res;
      if (this.formRes.msg = "successfully Update") {
        this.statusMsg = this.formRes.msg
        this.toastr.success(this.statusMsg)
        setTimeout(() => {
          this.statusMsg = null
        }, 2000)
        this.ngOnInit()
        let closeForm = <HTMLElement>document.querySelector('.btn-close');
        closeForm?.click();
      }
    })
  }

}