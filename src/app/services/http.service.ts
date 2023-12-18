import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { becomeADealerModal } from "../models/becomeADealer.modal";
import { contactFormModal } from "../models/contactFormModel";
import { signInModal } from "../models/signIn.Modal";
import { signUpDataModal } from "../models/signUpData.modal";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

declare var Razorpay: any;



@Injectable({ providedIn: 'root' })

export class HttpService {
  private apiURL = environment.apiURL;

  public coupo = new BehaviorSubject('');

  constructor(private http: HttpClient) { }
  getToken = new Subject<string>();
  User = new BehaviorSubject<any>(null)
  filteredProduct = new BehaviorSubject<any>(null);
  SignInData(route: string, signInData: signInModal) {
    return this.http.post(`${this.apiURL}${route}`, signInData)
  }


  orderCoupon(product) {
    this.coupo.next(product)
    // localStorage.setItem('coupon', JSON.stringify(product))
}

  dataIfItIsLoggedIn(value) {
    this.User.next(value)
  }

  BecomeADealerInfo(route: string, becomeADealerForm: becomeADealerModal) {
    return this.http.post(`${this.apiURL}${route}`, becomeADealerForm)
  }

  signUpInfo(route: string, signUpInfo: signUpDataModal) {
    return this.http.post(`${this.apiURL}${route}`, signUpInfo)
  }

  contactFormData(route: string, contactFormData: contactFormModal) {
    return this.http.post(`${this.apiURL}${route}`, contactFormData)
  }

  forSubscribe(route: string, email: string) {
    return this.http.post(`${this.apiURL}${route}`, email)
  }

  loggingOut(route: string, Authorization: any) {
    this.User.next(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userType');
    return this.http.post(`${this.apiURL}${route}`, Authorization, {
      headers: new HttpHeaders({ "Authorization": "Token " + Authorization })
    })
  }
  autoLogIn() {
    if (localStorage.getItem('userToken')) {
      this.User.next(true)
    }
  }

  addReview(route: string, data) {
    return this.http.post(`${this.apiURL}${route}`, data, {
      headers: new HttpHeaders({ "Authorization": "Token " + localStorage.getItem('userToken') })
    })
  }

  productFilter(route: string, data) {
    this.http.post(`${this.apiURL}${route}`, data).subscribe(res => {
      this.filteredProduct.next(res)
    })
  }

  checkout(route: string, data) {
    return this.http.post(`${this.apiURL}${route}`, data, {
      headers: new HttpHeaders({ "Authorization": "Token " + localStorage.getItem('userToken') })
    })
  }

  orderSuccessfully(route: string, data) {
    return this.http.post(`${this.apiURL}${route}`, data, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    }
    )
  }

  paymentSteps(route: string, data) {
    return this.http.post(`${this.apiURL}${route}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('userToken'),
      },)
    }
    )
  }

  getOurProducts() {
    let url = this.apiURL+'/api/products/'
    return this.http.get(url)
  }
   authProduct(){
    let url = this.apiURL+'/api/products/'
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }

  getProductPage(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }
  authProductPage(route: string) {
    return this.http.get(`${this.apiURL}${route}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }
  getFaq(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }

  getBanner() {
    let url = this.apiURL+'/api/banner/';
    return this.http.get(url)
  }

  getWhatAreYouLookingFor() {
    let url = this.apiURL+'/api/are_you_looking_for/';
    return this.http.get(url)
  }

  getAboutUsDetails() {
    let url = this.apiURL+'/api/about/'
    return this.http.get(url)
  }

  getBecomeADealerDetails() {
    let url = this.apiURL+'/api/becomeadealer/';
    return this.http.get(url)
  }

  getOffersDetails() {
    let url = this.apiURL+'/api/offers/'
    return this.http.get(url)
  }

  getFooterDetails() {
    let url =this.apiURL+'/api/footeritems/'
    return this.http.get(url)
  }
  getCarrersDetails(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }
  getShippingDetails(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }
  getDealerProfileData(route: string) {
    return this.http.get(`${this.apiURL}${route}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }

  getUserProfileData(route: string) {
    return this.http.get(`${this.apiURL}${route}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }

  gethowOurProductWorks() {
    let url =this.apiURL+'/api/howproductwork/'
    return this.http.get(url)
  }

  getCategoryFilter(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }

  getReviews() {
    let url =this.apiURL+'/api/testmonial/'
    return this.http.get(url);
  }
  sayCutomer() {
    let url = this.apiURL + '/api/customersay/';
    return this.http.get(url);
  }

  getDisclaimer(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }

  getOurTeam(route: string) {
    return this.http.get(`${this.apiURL}${route}`)
  }

  getAddress(route: string) {
    return this.http.get(`${this.apiURL}${route}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }

  getOrders(route: string) {
    return this.http.get(`${this.apiURL}${route}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }
  updateAddress(route: string, data) {
    return this.http.put(`${this.apiURL}${route}`, data, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('userToken')
      })
    })
  }

  deleteAddress(route: string, data) {
    var options = {
      body: { id: data },
      headers: new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    };

    return this.http.request('delete', `${this.apiURL}${route}`, options)
  }

  //otp varification
  signupOtpVarify(data) {
    let url = this.apiURL + '/api/signup_otp_varification/';
    return this.http.post(url, data);
  }

  ///api/login_with_otp/
  logInWithOtp(data){
    let url = this.apiURL + '/api/login_with_otp/';
    return this.http.post(url, data);
  }

  logInVerifyOtp(data){
    let url = this.apiURL + '/api/verification_otp/';
    return this.http.post(url, data);
  }
  ///api/resend_otp/

  resendOtp(data){
    let url = this.apiURL+'/api/resend_otp/'
    return this.http.post(url,data);
  }

  coupon(){
    let url= this.apiURL+'/api/mycoupon/';
    return this.http.get(url,{
      headers: new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    })
  }

  // /api/update_customer/
  editProfile(data){
    let url= this.apiURL+'/api/update_customer/';
    return this.http.put(url,data,{
      headers: new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    })
  }

  myProfile(){
    let url =this.apiURL+'/api/myprofile/';
    return this.http.get(url,{
      headers: new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    });
  }



  editDealerProfile(data){
    let url=this.apiURL+'/api/update_dealer/';
    return this.http.put(url,data,
      {
      headers:new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    })
  }

  forgotPasswordOtp(data){
    let url = this.apiURL + '/api/reset_password_otp/';
    return this.http.post(url,data)
  }
  setForgotPassword(data){
    let url = this.apiURL+'/api/set_newpassword/';
    return this.http.post(url,data)
  }

  addDealerData(data){
    let url = this.apiURL+'/api/add_dealer/';
    return this.http.post(url,data)
  }

  customerToDealer(data){
    let url =this.apiURL+'/api/customer_to_dealer/';
    return this.http.post(url,data,{
      headers: new HttpHeaders({
        'Authorization': 'Token ' + `${localStorage.getItem('userToken')}`
      })
    })
  }
  addressDelete(id) {
    let url = this.apiURL+'api/checkout/';
    return this.http.delete(url,id)
  }

  getState(){
    let url =this.apiURL+'/api/state/'
    return this.http.get(url)
  }
  getCity(){
    let url =this.apiURL+'/api/city/'
    return this.http.get(url)
  }

city(id: any) {
    return this.http.get(this.apiURL + '/api/city/' + id);
  }
  getNetwork(){
    let url = this.apiURL+'/api/mynetwork/';
    return this.http.get(url)
  }
}
