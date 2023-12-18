import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../shared/safeUrlPipe';
import { RouterModule } from '@angular/router';
import { LogInSignUpComponent } from '../header/log-in/log-in-Sign-up.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    SafePipe,
    
    LogInSignUpComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports:[SafePipe,
    LogInSignUpComponent]
})
export class ShareModule { }
