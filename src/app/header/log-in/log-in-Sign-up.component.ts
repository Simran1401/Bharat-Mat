import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, FormControlName, UntypedFormGroup, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-log-in-Sign-up',
  templateUrl: './log-in-Sign-up.component.html',
  styleUrls: ['./log-in-Sign-up.component.css'],
  animations: [
    trigger('loginModal', [
      state('in', style({
        transform: 'scale(1,1)'
      })),
      transition('void => *', [style({
        transform: 'scale(0.6)'
      }), animate(100)]),
    ])
  ]
})
export class LogInSignUpComponent implements OnInit {
  @Output() info = new EventEmitter();
  @ViewChild('Box') Box: ElementRef;

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;

  LogInMode: boolean = true;
  SignUpMode: boolean = false;
  OTPMode: boolean = false;
  varifyOtp = false;
  varifyOtpSignup = false;

  SignInForm: FormGroup;
  registerationForm: FormGroup;
  signupVarifyForm: FormGroup;
  logInWithOtpForm: FormGroup;
  loginOtpVerifyForm: FormGroup;
  forgotPasswordForm: FormGroup;
  setPasswordForm: FormGroup;

  errorSignUp;
  errorSignIn;

  logInButtonHandeller;

  userSignedUp = false;
  number: any = '';
  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {


    this.SignInForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })


    this.registerationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
    this.signupVarifyForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
      otp: new FormControl('', [Validators.required]),
    })

    this.logInWithOtpForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)])
    })

    this.loginOtpVerifyForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
      otp: new FormControl(null, Validators.required)
    })
    this.forgotPasswordForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)])
    })
    this.setPasswordForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
      otp: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }



  onClose() {
    this.info.emit(false);
  }
  passwordSet = false;
  confirmPasswordSet = false;
  OpenOtpModal() {
    this.OTPMode = true;
    this.LogInMode = false;
    this.SignUpMode = false;
    this.varifyOtp = false;
    this.varifyOtpSignup = false;
    this.passwordSet = false;
    this.confirmPasswordSet = false;
    this.Box.nativeElement.style.top = 20 + '%'
  }

  VarifyOtpModal() {
    this.OTPMode = false;
    this.LogInMode = false;
    this.SignUpMode = false;
    this.varifyOtp = true;
    this.varifyOtpSignup = false;
    this.passwordSet = false;
    this.confirmPasswordSet = false;
  }

  toggling() {
    this.SignUpMode = !this.SignUpMode;
    this.LogInMode = !this.LogInMode;
  }
  errroLoginMsg
  loginres
  // OnSignIn() {

  //   if (this.SignInForm.valid) {

  //     var formDataSignIn = {
  //       username: `${this.SignInForm.value.emailPhoneNumber}`,
  //       password: `${this.SignInForm.value.signInPassword}`
  //     }
  //     this.httpService.SignInData('/api/login/', formDataSignIn).subscribe({
  //       next: (res: any) => {
  //         this.loginres = res
  //         if (res.token) {
  //           localStorage.setItem('userToken', res.token)
  //           localStorage.setItem('userType', res.user_type)
  //           this.toastr.success('Login Successfull')
  //           window.location.reload();
  //           this.httpService.dataIfItIsLoggedIn(true)
  //           this.errorSignIn = null
  //           this.onClose()
  //           // this.router.navigate([''])
  //         } else if (this.loginres.status == "Your Account is not approved") {
  //           this.toastr.success(this.loginres.status)

  //         }

  //       },
  //       error: (errorRes) => {
  //         if (errorRes.error.status == 'Invalid Username and password') {
  //           this.errorSignIn = 'Your phone number or password is incorrect'
  //         }
  //         // this.errorSignIn = errorRes.error.status
  //         setTimeout(() => {
  //           this.errorSignIn = null
  //         }, 3000)
  //         if (errorRes.error.status == 'User do not exist') {
  //           setTimeout(() => {
  //             this.SignUpMode = true;
  //             this.LogInMode = false
  //           }, 800)
  //         }
  //       }
  //     })
  //   }
  // }

  loginForm() {
    this.SignInForm.markAllAsTouched();
    if (this.SignInForm.invalid) {
      // this.errroLoginMsg = 'Please enter valid data';
      // console.log(this.errroLoginMsg);

      setTimeout(() => {
        this.errroLoginMsg = null
      }, 3000)
    } else {
      this.httpService.SignInData('/api/login/', this.SignInForm.value).subscribe({
        next: (res: any) => {
          this.loginres = res
          console.log(res)
          this.number = this.loginres.mobile
          if (res.token) {
            console.log(res.token);

            localStorage.setItem('userToken', res.token)
            localStorage.setItem('userType', res.user_type)
            this.toastr.success('Login Successfull');
            window.location.reload();
            this.httpService.dataIfItIsLoggedIn(true)
            this.errorSignIn = null
            this.onClose()
            // this.router.navigate([''])
          }
          else if (this.loginres.status == "Your Account is not approved") {
            this.toastr.success('We will shortly connect with you.');
            this.errroLoginMsg = this.loginres.status + ', We will shortly connect with you.'
            this.onClose();
            setTimeout(() => {
              this.errroLoginMsg = null
            }, 3000)
          }
          else if (this.loginres.status == "User is Not Active") {
            this.errroLoginMsg = "Please Contact Admin"
            setTimeout(() => {
              this.errroLoginMsg = null
            }, 3000)
          }

        },
        error: (errorRes) => {
          // this.errorSignIn = errorRes.error.status
          console.log(errorRes);

          if (errorRes.error.status == 'Invalid Username and password') {
            this.errorSignIn = 'Your phone number or password is incorrect'
          }
          setTimeout(() => {
            this.errorSignIn = null
          }, 3000)
          if (errorRes.error.status == 'User Does Not Exists') {
            this.errorSignIn = errorRes.error.status
            setTimeout(() => {
              this.SignUpMode = true;
              this.LogInMode = false
            }, 800)
          }
        }
      })
    }
  }

  addCustomer
  erroRegisterMsg
  registerNow() {
    this.registerationForm.markAllAsTouched();
    if (this.registerationForm.invalid) {
      // this.erroRegisterMsg = 'Please enter valid data';
      setTimeout(() => {
        this.erroRegisterMsg = null
      }, 3000)
      null
    }
    else {
      var formDataSignUp = {
        name: `${this.registerationForm.value.name}`,
        phone: `${this.registerationForm.value.phone}`,
        email: `${this.registerationForm.value.email}`,
        password: `${this.registerationForm.value.password}`
      }

      this.httpService.signUpInfo('/api/add_customer/', formDataSignUp)
        .subscribe({
          next: (res: { status: string, verification: string }) => {
            this.addCustomer = res;
            console.log(res);
            this.number = this.addCustomer.mobile;
            if (res.status == 'Customer Add Successfully') {
              this.toastr.success(res.status)
              this.errorSignUp = null;
              this.toggling();
              // this.httpService.dataIfItIsLoggedIn(true);
              this.userSignedUp = true;
            } else if (res.status == 'OTP send successfuly') {
              this.toastr.success('OTP sent successfuly')
              this.varifyOtpSignup = true;
              this.SignUpMode = false;
            } else if (res.status == 'Mobile Number Already Exists') {
              this.errorSignUp = res.status;
              setTimeout(() => {
                this.errorSignUp = null;
                this.SignUpMode = false;
                this.LogInMode = true;
              }, 3000)
            }
            // else if (res.verification == 'ok') {
            //   this.errorSignUp = res.status

            //   setTimeout(() => {
            //     this.errorSignUp = null
            //   }, 3000)

            //   setTimeout(() => {
            //     this.LogInMode = true;
            //     this.SignUpMode = false;
            //   }, 800)
            // }
            else {
              this.errorSignUp = res.status
              setTimeout(() => {
                this.errorSignUp = null
              }, 3000)
            }
          }
        }
        ), error => {
          this.errorSignUp = error.error.status;
          setTimeout(() => {
            this.errorSignUp = null
          }, 3000);
        }
    }
  }

  onOtpChange(otp) {
    this.signupVarifyForm.patchValue({
      otp: otp
    });
    this.loginOtpVerifyForm.patchValue({
      otp: otp
    });
  }

  onOtpChange1(otp) {
    this.loginOtpVerifyForm.patchValue({
      otp: otp
    });
  }

  onOtpSetPassword(otp) {
    this.setPasswordForm.patchValue({
      otp: otp
    })
  }

  //signup varify

  errorOtp
  signupRes
  signupVarifyOtp() {
    this.signupVarifyForm.markAllAsTouched();
    if (this.signupVarifyForm.invalid) {

    } else {
      this.httpService.signupOtpVarify(this.signupVarifyForm.value).subscribe(res => {
        this.signupRes = res;
        // if (this.signupRes.status == 'token') {
        //   this.LogInMode = true;
        // }
        console.log(this.signupRes);

        if (this.signupRes.token) {
          localStorage.setItem('userToken', this.signupRes.token)
          localStorage.setItem('userType', this.signupRes.user_type)
          this.toastr.success('Registeration Successfull')
          window.location.reload();
          this.httpService.dataIfItIsLoggedIn(true)
          console.log(this.signupRes);
          this.LogInMode = false;
          this.SignUpMode = false;
          this.varifyOtpSignup = false;
          // window.location.reload();
          // this.toggling();
          // this.httpService.dataIfItIsLoggedIn(true)
          // this.onClose()
        }
        else {
          this.errorOtp = this.signupRes.status;
          setTimeout(() => {
            this.errorOtp = null
          }, 3000)
        }
      }, error => {
        this.errorOtp = error.error.status;
        setTimeout(() => {
          this.errorOtp = null
        }, 3000)
      })
    }
  }

  otpRes;
  errorInOtp;
  num
  logInOtp() {
    this.logInWithOtpForm.markAllAsTouched();
    if (this.logInWithOtpForm.invalid) {

    }
    else {
      this.httpService.logInWithOtp(this.logInWithOtpForm.value).subscribe(res => {
        this.otpRes = res;
        console.log(res);

        if (this.otpRes.status == "OTP send successfuly") {
          this.toastr.success(this.otpRes.status)
          this.VarifyOtpModal();
          this.number = this.otpRes.mobile;
        }

        else {
          if (this.otpRes.status == 'User is Not Active') {
            this.VarifyOtpModal();
            this.number = this.otpRes.mobile;
            this.httpService.resendOtp({ 'mobile': this.num }).subscribe(res => {
              this.otpResponse = res;
              if (this.otpResponse.status == 'OTP send successfuly') {
                this.toastr.success(this.otpResponse.status)
                this.resendOtpMsg = this.otpResponse.status;
              }
              else {
                this.resendOtpMsg = this.otpResponse.status;
                setTimeout(() => {
                  this.resendOtpMsg = null
                }, 3000)
              }
            })
          }


          this.errorInOtp = this.otpRes.status;
          console.log(this.errorInOtp);

          setTimeout(() => {
            this.errorInOtp = null
          }, 3000)
        }

      }, error => {
        // this.errorInOtp = error.error.status;
        if (error.error.status == 'User matching query does not exist.') {
          this.errorInOtp = 'We cannot find an account with that mobile number'
        }
        setTimeout(() => {
          this.errorInOtp = null
        }, 3000)
      })
    }
  }

  // OTPVERIFY
  otpVerifyRes;
  errorVerify;

  otpVerify() {
    // this.loginOtpVerifyForm.markAllAsTouched()
    console.log(this.loginOtpVerifyForm);
    if (this.loginOtpVerifyForm.invalid) {

    } else {
      this.httpService.logInVerifyOtp(this.loginOtpVerifyForm.value).subscribe(res => {
        this.otpVerifyRes = res;
        console.log(res);

        if (this.otpVerifyRes.token) {
          localStorage.setItem('userToken', this.otpVerifyRes.token);
          localStorage.setItem('userType', this.otpVerifyRes.user_type)
          this.toastr.success('Login Successfull');
          window.location.reload();
          this.httpService.dataIfItIsLoggedIn(true)
          this.onClose()
        }
        else {
          this.errorVerify = this.otpVerifyRes.status;
          setTimeout(() => {
            this.errorVerify = null
          }, 3000)
        }
      }, error => {
        this.errorVerify = error.error.status;
        setTimeout(() => {
          this.errorVerify = null
        }, 3000)
      })
    }
  }
  openLogin() {
    this.LogInMode = false;
    this.SignUpMode = true;
    this.varifyOtpSignup = false;
    this.confirmPasswordSet = false;
    this.passwordSet = false;
  }
  openSignup() {
    this.LogInMode = true;
    this.SignUpMode = false;
    this.varifyOtp = false;
    this.confirmPasswordSet = false;
    this.passwordSet = false;
  }

  resendOtpMsg;
  otpResponse;
  resendOTP() {
    this.httpService.resendOtp({ 'mobile': this.number ? this.number : this.num }).subscribe(res => {
      this.otpResponse = res;
      if (this.otpResponse.status == 'OTP send successfuly') {
        this.toastr.success(this.otpResponse.status)
        this.resendOtpMsg = this.otpResponse.status;
      }
      else {
        this.resendOtpMsg = this.otpResponse.status;
        setTimeout(() => {
          this.resendOtpMsg = null
        }, 3000)
      }
    })
  }


  number1 = this.number.toString();
  maskNumber(number: any) {
    let mask = ""
    if (number) {
      for (let i = 0; i <= this.number.length - 2; i++) {
        // console.log(number.length, 'length');
        mask += "*"
      }
      return mask + this.number.slice(8, 10)
    }
    else {
      return null
    }
  }


  get signInPassword() {
    return this.SignInForm.get('password')
  }
  get emailPhoneNumber() {
    return this.SignInForm.get('username')
  }
  get password() {
    return this.registerationForm.get('password')
  }
  get phone() {
    return this.registerationForm.get('phone')
  }

  get mobile() {
    return this.logInWithOtpForm.get('mobile')
  }
  get mobile1() {
    return this.forgotPasswordForm.get('mobile')
  }
  get new_password() {
    return this.setPasswordForm.get('new_password')
  }

  get otp2() {
    return this.setPasswordForm.get('otp')
  }
  get otp() {
    return this.loginOtpVerifyForm.get('otp')
  }
  get otp1() {
    return this.signupVarifyForm.get('otp')
  }

  openForgot() {
    this.OTPMode = false;
    this.LogInMode = false;
    this.SignUpMode = false;
    this.varifyOtp = false;
    this.varifyOtpSignup = false;
    this.passwordSet = true;
    this.confirmPasswordSet = false;
  }

  forgotPass;
  statusMsg
  ErrorStatusMsg

  forgot() {
    this.forgotPasswordForm.markAllAsTouched()
    if (this.forgotPasswordForm.invalid) {
      // this.ErrorStatusMsg = 'Please enter a valid number'
    }
    else {
      this.httpService.forgotPasswordOtp(this.forgotPasswordForm.value).subscribe(res => {
        this.forgotPass = res;
        if (this.forgotPass.status = "successfully OTP generated") {
          this.number = this.forgotPass.mobile;
          this.statusMsg = this.forgotPass.status
          this.toastr.success(this.statusMsg)
          this.confirmPasswordSet = true;
          this.passwordSet = false;
        } else {
          this.ErrorStatusMsg = this.forgotPass.status
          setTimeout(() => {
            this.ErrorStatusMsg = null
          }, 3000);
        }
      }, error => {
        // this.ErrorStatusMsg = error.error.error
        if (error.error.error == "User matching query does not exist.") {
          this.ErrorStatusMsg = "We cannot find an account with that mobile number"
        }
        setTimeout(() => {
          this.ErrorStatusMsg = null
        }, 3000);
      })
    }
  }

  resetPasswordErrorMsg
  resetPassRes
  successMsg
  setResetPassword() {
    // console.log(this.setPasswordForm);
    this.setPasswordForm.markAllAsTouched();
    if (this.setPasswordForm.invalid) {

    } else {
      let formData = this.setPasswordForm.value;
      this.httpService.setForgotPassword(formData).subscribe(res => {
        this.resetPassRes = res;
        if (this.resetPassRes.status = "successfully Password Reset") {
          this.confirmPasswordSet = false;
          this.passwordSet = false;
          this.LogInMode = true;
          this.successMsg = this.resetPassRes.status
          this.toastr.success(this.successMsg)
        } else {
          this.resetPasswordErrorMsg = this.resetPassRes.status
          setTimeout(() => {
            this.resetPasswordErrorMsg = null
          }, 3000);
        }
      }, error => {
        this.resetPasswordErrorMsg = error.error.status;
        setTimeout(() => {
          this.resetPasswordErrorMsg = null
        }, 3000); 0
      })
    }
  }
  show: boolean = false;
  passwor() {
    this.show = !this.show;
  }
  show1: boolean = false;
  passwor1() {
    this.show1 = !this.show1;
  }
  show2: boolean = false;
  passwor2() {
    this.show2 = !this.show2;
  }
}
