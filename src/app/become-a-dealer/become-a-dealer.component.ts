import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NgOtpInputComponent } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-become-a-dealer',
  templateUrl: './become-a-dealer.component.html',
  styleUrls: ['./become-a-dealer.component.css']
})
export class BecomeADealerComponent implements OnInit {

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  constructor(private apiService: HttpService, private renderer: Renderer2, private toastr: ToastrService,
    private router: Router) { }

  DealerForm: FormGroup;
  error: string;
  succesmessege: string;

  signupVarifyForm: FormGroup;

  shopPhotoSubmitted;

  // number1: string = this.number.toString();
  maskNumber(number1: any) {
    let mask = ""
    if (number1) {
      for (let i = 0; i <= number1.length - 2; i++) {
        mask += "*"
      }

      return mask + number1.slice(8, 10)
    }
    else {
      return null
    }
  }
  loginCustomer
  isCustomer

  convertDealerForm
  ngOnInit() {
    // const javaScriptForHeadAndFoot = this.renderer.createElement('script');
    // javaScriptForHeadAndFoot.src = `../../assets/javaScripts/headerAndFooter.js`;
    // this.renderer.appendChild(document.head, javaScriptForHeadAndFoot);

    //firm name, mobile number, addhar card, pan card, shop photo, address, contact person and pan card number
    this.DealerForm = new FormGroup({
      firm_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      contact_person: new FormControl('', Validators.required),
      mobile_number1: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      mobile_number2: new FormControl(''),
      land_line_number: new FormControl('', Validators.maxLength(10)),
      gst_in: new FormControl('', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}")),
      adhar_card_copy: new FormControl('', Validators.required),
      shop_photo: new FormControl('', Validators.required),
      gst_in_copy: new FormControl(''),
      pan_card_copy: new FormControl('', Validators.required),
      pan_card_no: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pin_code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
    this.signupVarifyForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      otp: new FormControl('', Validators.required),
    })

    this.convertDealerForm = new FormGroup({
      firm_name: new FormControl('', Validators.required),
      contact_person: new FormControl('', Validators.required),
      mobile_number2: new FormControl(''),
      land_line_number: new FormControl('', Validators.maxLength(10)),
      gst_in: new FormControl('', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}")),
      adhar_card_copy: new FormControl('', Validators.required),
      shop_photo: new FormControl('', Validators.required),
      gst_in_copy: new FormControl(''),
      pan_card_copy: new FormControl('', Validators.required),
      pan_card_no: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pin_code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })

    this.loginCustomer = localStorage.getItem('userType')

    this.isCustomer = this.loginCustomer == 'CUSTOMER'

    if (this.isCustomer) {
      this.getProfile()
    }


    this.getState();

  }




  LogInModalOpen: boolean = false;

  openLogInModal() {
    this.LogInModalOpen = true;
  }
  backDropClicked(e: boolean) {
    this.LogInModalOpen = e;
  }
  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  number;
  varifyOtpSignup;
  errorSignUp;

  // onSubmit() {
  //   var becomeADealerForm = {
  //     firm_name: `${this.DealerForm.value.firmName}`,
  //     email: `${this.DealerForm.value.email}`,
  //     contact_person: `${this.DealerForm.value.contactPerson}`,
  //     mobile_number1: `${this.DealerForm.value.mobileNumberOne}`,
  //     mobile_number2: `${this.DealerForm.value.mobileNumberTwo}`,
  //     land_line_number: `${this.DealerForm.value.landLineNumber}`,
  //     gst_in: `${this.DealerForm.value.gstIn}`,
  //     adhar_card_copy: `${this.DealerForm.value.aadharCardCopy}`,
  //     shop_photo: `${this.DealerForm.value.shopPhoto}`,
  //     gst_in_copy: `${this.DealerForm.value.gstInCopy}`,
  //     pan_card_no: `${this.DealerForm.value.panCardNumber}`,
  //     pan_card_copy: `${this.DealerForm.value.panCardNumber}`,
  //     address: `${this.DealerForm.value.fullAddress}`,
  //     password: `${this.DealerForm.value.password}`
  //   }
  //   if (this.error = 'Please fill the form with correct deatils') {
  //     setTimeout(() => {
  //       this.error = null


  //     }, 2000);
  //   }
  //   if (this.DealerForm.invalid) {
  //     this.error = 'Please fill the form with correct deatils'
  //     this.succesmessege = null

  //   }
  //   if (!this.DealerForm.invalid) {
  //     this.error = ''
  //     this.apiService.BecomeADealerInfo('/api/add_dealer/', becomeADealerForm).subscribe({
  //       next: (res: { status: string, verification: string }) => {

  //         if (res.status == 'OTP send successfuly') {
  //           this.succesmessege = res.status;
  //           var clicking = <HTMLElement>document.querySelector('.otpModal');
  //           clicking?.click();

  //         } else if (res.verification == 'Pending') {
  //           var clicking = <HTMLElement>document.querySelector('.otpModal');
  //           clicking?.click();

  //         } else if (res.verification == 'ok') {
  //           this.errorSignUp = res.status;
  //         }
  //       },
  //     })

  //     // this.succesmessege = 'Registeration successfull please Log in'
  //     // this.succesmessege = 'OTP Succesful send'
  //     // this.DealerForm.reset()
  //     // this.error = null
  //   }

  // }

  onSelectAdhar(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.DealerForm.patchValue({
      adhar_card_copy: file
    });
    this.DealerForm.get('adhar_card_copy').updateValueAndValidity()
  }
  onSelectShop(event: Event) {
    let file = (event.target as HTMLInputElement).files[0]
    this.DealerForm.patchValue({
      shop_photo: file
    });
    this.DealerForm.get('shop_photo').updateValueAndValidity
  }
  onSelectPan(event: Event) {
    let file = (event.target as HTMLInputElement).files[0];
    this.DealerForm.patchValue({
      pan_card_copy: file
    })
    this.DealerForm.get('pan_card_copy').updateValueAndValidity()
  }
  onSelectGst(event: Event) {
    let file = (event.target as HTMLInputElement).files[0];
    this.DealerForm.patchValue({
      gst_in_copy: file
    })
    this.DealerForm.get('gst_in_copy').updateValueAndValidity();
  }

  dealerFormRes;
  loader = false;
  isCustomerRes
  addDealer() {

    // let formData = this.DealerForm.value

    this.error = '';
    this.loader = true;
    if (this.isCustomer) {

      if (this.convertDealerForm.invalid) {
        this.loader = false
        this.error = 'Please fill the form with correct deatils'
        this.succesmessege = null
        if (this.error = 'Please fill the form with correct deatils') {
          setTimeout(() => {
            this.error = null
          }, 2000);
        }
      }
      else {
        let formData = new FormData()
        formData.append("firm_name", this.convertDealerForm.get('firm_name').value);
        formData.append("contact_person", this.convertDealerForm.get('contact_person').value)
        formData.append("mobile_number2", this.convertDealerForm.get('mobile_number2').value)
        formData.append("land_line_number", this.convertDealerForm.get('land_line_number').value);
        formData.append("gst_in", this.convertDealerForm.get('gst_in').value)
        formData.append("adhar_card_copy", this.convertDealerForm.get('adhar_card_copy').value);
        formData.append("shop_photo", this.convertDealerForm.get('shop_photo').value)
        formData.append("gst_in_copy", this.convertDealerForm.get('gst_in_copy').value);
        formData.append("pan_card_copy", this.convertDealerForm.get('pan_card_copy').value)
        formData.append("pan_card_no", this.convertDealerForm.get('pan_card_no').value);
        formData.append("address", this.convertDealerForm.get('address').value);
        formData.append("state", this.convertDealerForm.get('state').value);
        formData.append("city", this.convertDealerForm.get('city').value);
        formData.append("pin_code", this.convertDealerForm.get('pin_code').value);

        console.log(formData);

        this.apiService.customerToDealer(formData).subscribe(res => {
          this.isCustomerRes = res;
          if (this.isCustomerRes.status == 'successfuly converted') {
            this.toastr.success('Your request to become dealer is under process, We will Connect you shortly!')
            this.loader = false;
            localStorage.clear();
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
            console.log("12");

            // this.openLogInModal()
          }
        })
      }
    } else

      if (this.DealerForm.invalid) {
        this.loader = false
        this.error = 'Please fill the form with correct deatils'
        this.succesmessege = null
        if (this.error = 'Please fill the form with correct deatils') {
          setTimeout(() => {
            this.error = null
          }, 2000);
        }
      } else {
        {
          let formData = new FormData()

          formData.append("firm_name", this.DealerForm.get('firm_name').value);
          formData.append("email", this.DealerForm.get('email').value)
          formData.append("password", this.DealerForm.get('password').value);
          formData.append("contact_person", this.DealerForm.get('contact_person').value)
          formData.append("mobile_number1", this.DealerForm.get('mobile_number1').value);
          formData.append("mobile_number2", this.DealerForm.get('mobile_number2').value)
          formData.append("land_line_number", this.DealerForm.get('land_line_number').value);
          formData.append("gst_in", this.DealerForm.get('gst_in').value)
          formData.append("adhar_card_copy", this.DealerForm.get('adhar_card_copy').value);
          formData.append("shop_photo", this.DealerForm.get('shop_photo').value)
          formData.append("gst_in_copy", this.DealerForm.get('gst_in_copy').value);
          formData.append("pan_card_copy", this.DealerForm.get('pan_card_copy').value)
          formData.append("pan_card_no", this.DealerForm.get('pan_card_no').value);
          formData.append("address", this.DealerForm.get('address').value);
          formData.append("state", this.DealerForm.get('state').value);
          formData.append("city", this.DealerForm.get('city').value);
          formData.append("pin_code", this.DealerForm.get('pin_code').value);


          this.apiService.addDealerData(formData).subscribe(res => {
            console.log(res);

            this.dealerFormRes = res;
            if (this.dealerFormRes.status == 'OTP send successfuly') {
              this.succesmessege = this.dealerFormRes.status;
              this.toastr.success(this.succesmessege)
              var clicking = <HTMLElement>document.querySelector('.otpModal');
              clicking?.click();
              this.loader = false;
            } else if (this.dealerFormRes.status == 'Mobile Number Already Exists' && this.dealerFormRes.user_type == 'CUSTOMER') {
              this.toastr.success('Mobile Number Already Exists As Customer')
              this.loader = false;
              this.DealerForm.reset();
              this.openLogInModal()
            } else if (this.dealerFormRes.status == 'Mobile Number Already Exists' && this.dealerFormRes.user_type == 'DEALER') {
              this.toastr.success('Mobile Number Already Exists Please LogIn')
              this.loader = false;
              this.DealerForm.reset();
              this.openLogInModal()
            }

          })
        }

        // this.succesmessege = 'Registeration successfull please Log in'
        // this.succesmessege = 'OTP Succesful send'
        // this.DealerForm.reset()
        // this.error = null
      }
  }

  onOtpChange(otp) {
    this.signupVarifyForm.patchValue({
      otp: otp
    });
  }

  errorOtp;
  signupRes;
  hide = false;

  signupVarifyOtp() {
    this.apiService.signupOtpVarify(this.signupVarifyForm.value).subscribe(res => {
      this.signupRes = res;
      // if (this.signupRes.status == 'token') {
      //   this.LogInMode = true;
      // }
      if (this.signupRes.status == 'OTP Verified Successfully') {
        this.toastr.success("Successfully Verified We Will Shortly Connect With You")

        var clicking = <HTMLElement>document.querySelector('.otpModal');
        clicking?.click();
        this.openLogInModal();
        this.DealerForm.reset();
      }
      else {
        this.errorOtp = this.signupRes.status;
        setTimeout(() => {
          this.errorOtp = null
        }, 3000);
      }
    }, error => {
      this.errorOtp = error.error.status;
      setTimeout(() => {
        this.errorOtp = null
      }, 3000);
    })
  }

  resendOtpMsg;
  otpResponse;

  // resendOTP() {
  //   this.apiService.resendOtp({ 'mobile': this.number }).subscribe(res => {
  //     this.otpResponse = res;
  //     console.log(res);
  //     if (this.otpResponse.status == 'OTP send successfuly') {
  //       this.toastr.success(this.otpResponse.status)
  //     }
  //     else {
  //       this.resendOtpMsg = this.otpResponse.status;
  //       setTimeout(() => {
  //         this.resendOtpMsg = null
  //       }, 3000)
  //     }
  //   })
  // }

  get password() {
    return this.DealerForm.get('password');
  }
  get panCardNumber() {
    return this.DealerForm.get('panCardNumber');
  }
  get gstIn() {
    return this.DealerForm.get('gstIn')
  }
  userProfileData
  getProfile() {
    this.apiService.myProfile().subscribe(res => {
      this.userProfileData = res
    })
  }

  stateDetails
  getState() {
    this.apiService.getState().subscribe(res => {
      this.stateDetails = res
    })
  }
  cities
  getCity(state) {
    this.apiService.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
      console.log(state);

    })
  }

  selectState(val) {
    console.log(val);
    this.apiService.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);


    })
  }
}
