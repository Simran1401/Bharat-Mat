import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  subscirbeForm: FormGroup;
  messege;
  successMessege;

  apiUrl = 'https://api.bharatmatcompany.com'

  constructor(private apiService: HttpService, private toastr:ToastrService) { }

  footerDetailsFromBackend

  addressLoc = 'https://www.google.com/maps/place/Bharat+Mat+Company/@30.054159,75.823307,13z/data=!4m5!3m4!1s0x0:0xf178d430b0b09fc1!8m2!3d30.054159!4d75.8233073?hl=en'
  LoggedInCorrecttion
  ngOnInit() {

    this.subscirbeForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required])
    })

    this.apiService.getFooterDetails().subscribe(res => {
      this.footerDetailsFromBackend = res

    })

    if (localStorage.getItem('userToken')) {
      this.LoggedInCorrecttion = false
    } else {
      this.LoggedInCorrecttion = true
    }
  }

  onSubscribe() {


    this.apiService.forSubscribe('/api/subscribe/', this.subscirbeForm.value).
      subscribe({
        next: (res: { status: string }) => {

          if (this.subscirbeForm.valid && res.status== "Subscribe  Successfully") {
            this.subscirbeForm.reset()
            this.successMessege = 'Thank you for subscribing !';
            this.toastr.success( this.successMessege)
            if(this.successMessege = 'Thank you for subscribing !'){
              setTimeout(() => {
                this.successMessege=null
              }, 2000);
            }
            this.messege = null
          }
          if (res.status == 'Already Subscribe') {
            this.successMessege = 'You are already subscribed !'
            if(this.successMessege = 'You are already subscribed !'){
              setTimeout(() => {
                this.successMessege=null
                this.subscirbeForm.reset()
              }, 2000);
            }
            this.messege = null
          }
          if (this.subscirbeForm.controls['email'].errors['required'] && res.status == 'Already Subscribe') {
            this.messege = "Please enter a valid email address"
            if( this.messege = "Please enter a valid email address"){
              setTimeout(() => {
                this.subscirbeForm.reset()
                this.messege=null
              }, 2000);
            }
            this.successMessege = null
          }
          if (this.subscirbeForm.controls['email'].errors['email']) {
            this.messege = 'Please enter a valid email address'
            if( this.messege = "Please enter a valid email address"){
              setTimeout(() => {
                this.subscirbeForm.reset()
                this.messege=null
              }, 2000);
            }
            this.successMessege = null
          }
        }
      })
  }

}


