import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private apiService: HttpService, private toastr: ToastrService) { }

  contactForm: UntypedFormGroup;
  errorMessage: string;
  successMessage: string;

  private token = '';
  siteKey = '6LfKB0kjAAAAACtoXcjxzceesZePlD3CHJCY491h'

  links;
  addressLoc = 'https://www.google.com/maps/place/Bharat+Mat+Company/@30.054159,75.823307,13z/data=!4m5!3m4!1s0x0:0xf178d430b0b09fc1!8m2!3d30.054159!4d75.8233073?hl=en'

  ngOnInit() {

    this.apiService.getFooterDetails().subscribe(res => {
      this.links = res;
    })

    this.contactForm = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, [Validators.required,Validators.email]),
      phone_number: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      message: new UntypedFormControl(null, Validators.required)
    })

  }


  contactFormSend() {

    if (!this.contactForm.valid) {
      this.errorMessage = 'Please fill the form properly before submitting'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
      null
    }
    if (!this.contactForm.valid && this.contactForm.get('phone_number').errors) {
      this.errorMessage = 'Please enter a valid phone number'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
      null
    }
    if (!this.token) {
      this.errorMessage = 'Mark the captcha box'
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000)
      null
    }
    else {
      this.apiService.contactFormData('/api/addcontact/', this.contactForm.value).subscribe({
        next: (res: { status: string }) => {

          if (res.status == "Contact Us Create Successfully") {
            this.contactForm.reset(),
              this.successMessage = 'Your req has been successfully sent',
              this.toastr.success(this.successMessage)
            this.errorMessage = null
          }

        },
        error: (error) => {
           this.errorMessage = 'Please fill the form properly before submitting',
           setTimeout(()=>{
            this.errorMessage=null
           },3000)
            // console.log(error)
           }
      })
    }
  }

  resolved($event: string) {
    this.token = $event
  }


}
