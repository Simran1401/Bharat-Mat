import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-or-add-new',
  templateUrl: './edit-or-add-new.component.html',
  styleUrls: ['./edit-or-add-new.component.css']
})
export class EditOrAddNewComponent implements OnInit {

  addressForm: FormGroup;
  editMode;

  id: number;
  addressId;

  errorAddressForm
  dataForm;



  constructor(private apiServ: HttpService, private route: ActivatedRoute, private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.addressId = +params['adressId']
      this.editMode = params['id'] != null;
    })
    this.onEditInit()
    this.getState()
  }
addrsRes
  onSubmit() {
    var data = {
      name: `${this.addressForm.value.name}`,
      mobile_number: `${this.addressForm.value.mobile_number}`,
      pincode: `${this.addressForm.value.pincode}`,
      address: `${this.addressForm.value.address}`,
      country: `${this.addressForm.value.country}`,
      state: `${this.addressForm.value.state}`,
      city: `${this.addressForm.value.city}`
    }

    if (this.addressForm.controls['state'].value == 'Select State') {
      this.addressForm.controls['state'].invalid
    }

    if (!this.addressForm.valid || this.addressForm.controls['state'].value == 'Select State') {
      this.errorAddressForm = 'FILL THE ADDRESS FORM CORRECTLY'
      setTimeout(() => {
        this.errorAddressForm = null
      }, 3000)
    } else {
      if (this.editMode) {
        var editData = {
          name: `${this.addressForm.value.name}`,
          mobile_number: `${this.addressForm.value.mobile_number}`,
          pincode: `${this.addressForm.value.pincode}`,
          address: `${this.addressForm.value.address}`,
          country: `${this.addressForm.value.country}`,
          state: `${this.addressForm.value.state}`,
          city: `${this.addressForm.value.city}`,
          id: this.addressId
        }
        this.apiServ.updateAddress('/api/checkout/', editData).subscribe(res => {
this.addrsRes=res
          if(this.addrsRes.status== "Checkouted Update Successfully"){
            this.toastr.success('Address Updated Successfully')
            window.location.reload();
          }
          
        })
      }
      else {
        const index = JSON.parse(localStorage.getItem('address')).findIndex(
          address => address.address == this.addressForm.controls['address'].value
        )
        if (index == -1) {
          this.apiServ.checkout('/api/checkout/', data).subscribe(res => {
            this.addrsRes=res
            if(this.addrsRes.status== "Successfully Checkouted"){
              this.toastr.success('Address Added Successfully')
              window.location.reload();
                        }
            localStorage.setItem('address', JSON.stringify(data))
          })
        }
      }
      // this.dashboardServ.openAddComp(true)
      this.router.navigate(['dashboard/dashboard-my-address-book'])
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  }


stat
city
  private onEditInit() {
    let name = ''
    let mobile_number: number
    let pincode: number
    let address = ''
    let country = ''
    let state = ''
    let city = ''

    if (this.editMode) {

      let addressInfo = JSON.parse(localStorage.getItem('address'));
      let editThisOne = addressInfo[this.id]


      this.stat=editThisOne.state
      this.city=editThisOne.city
   
      
      name = editThisOne.name,
        mobile_number = editThisOne.mobile_number,
        pincode = editThisOne.pincode,
        address = editThisOne.address,
        country = editThisOne.country,
        state = editThisOne.state,
        city = editThisOne.city
    }



    this.addressForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      mobile_number: new FormControl(mobile_number, [Validators.required]),
      pincode: new FormControl(pincode, Validators.required),
      address: new FormControl(address, Validators.required),
      country: new FormControl(country, Validators.required),
      state: new FormControl(state, Validators.required),
      city: new FormControl(city, Validators.required)
    })
  }

  stateDetails
  getState() {
    this.apiServ.getState().subscribe(res => {
      console.log(res);
      this.stateDetails = res
    })
  }

  cities
  getCity(state) {
    this.apiServ.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
      console.log(state);

    })
  }
 
  selectState(val) {
    console.log(val);
    this.apiServ.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
   

    })
  }
}
