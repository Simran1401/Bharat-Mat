import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { addressInfoModal } from 'src/app/models/addressInfoModal';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private apiServ: HttpService) { }

  addressDetails: addressInfoModal[] = [];

  addressUpdated = new Subject<addressInfoModal[]>();
  AddComp = new Subject<boolean>();


  sendAddressData = new BehaviorSubject<addressInfoModal>(null)

  openAddComp(b: boolean) {
    return this.AddComp.next(b)
  }


  sendAddress(data) {
    this.sendAddressData.next(data);
  }

  editItems(i: number) {
    return this.addressDetails[i]
  }

  addNewAddress(data: addressInfoModal) {
    this.addressDetails.push(data)
  }

  updateAddress(index: number, newAddress: addressInfoModal) {
    this.addressDetails[index] = newAddress;
    this.addressUpdated.next(this.addressDetails.slice())
  }

  onDelete(index: number) {
    this.addressDetails.splice(index, 1)
  }


}
