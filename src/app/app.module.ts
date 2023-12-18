import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from "ng-recaptcha";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';
import { appRoutingModule } from './app-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CheckoutModule } from 'paytm-blink-checkout-angular';

import { CommonModule } from '@angular/common';
// import { OrderReturnsComponent } from './dashboard/dashboard-orders-and-reuturns/order-returns/order-returns.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { ShareModule } from './share/share.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { CacheInterceptor } from './cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecaptchaModule,
    CheckoutModule, SlickCarouselModule,
    NgxSkeletonLoaderModule,
    //CarouselModule,
    ShareModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
   


  ],
  providers: [,{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }