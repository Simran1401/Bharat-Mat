import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AboutUsComponent } from '../about-us/about-us.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FAQComponent } from '../faq/faq.component';
import { OurProductsComponent } from '../our-products/our-products.component';
import { ProductsFilterComponent } from '../our-products/products-filter/products-filter.component';
import { ProductListComponent } from '../our-products/product-list/product-list.component';
import { ProductPageComponent } from '../our-products/product-list/product-page/product-page.component';
import { CartComponent } from '../cart/cart.component';
import { ShoppingCartComponent } from '../cart/shopping-cart/shopping-cart.component';
import { BecomeADealerComponent } from '../become-a-dealer/become-a-dealer.component';
import { OrderPlacedSuccessfullyComponent } from '../cart/order-placed-successfully/order-placed-successfully.component';
import { TrackYourOrderComponent } from '../cart/track-your-order/track-your-order.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardMenuComponent } from '../dashboard/dashboard-menu/dashboard-menu.component';
import { DashboardMyAddressBookComponent } from '../dashboard/dashboard-my-address-book/dashboard-my-address-book.component';
import { OrdersComponent } from '../dashboard/dashboard-orders-and-reuturns/orders/orders.component';
import { StaticComponentComponent } from '../static-component/static-component.component';
import { DashboardOrdersAndReuturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/dashboard-orders-and-reuturns.component';
import { DashboardDealerProfileComponent } from '../dashboard/dashboard-dealer-profile/dashboard-dealer-profile.component';
import { EditOrAddNewComponent } from '../dashboard/edit-or-add-new/edit-or-add-new.component';
import { OrderReturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/order-returns/order-returns.component';
import { ReturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/returns/returns.component';
import { DashboardProfileComponent } from '../dashboard/dashboard-profile/dashboard-profile.component';
import { DashboardWalletComponent } from '../dashboard/dashboard-wallet/dashboard-wallet.component';
import { CarrierComponent } from '../carrier/carrier.component';
import { ShippingPolicyComponent } from '../shipping-policy/shipping-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { dealersComp } from '../dealers/dealers.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AboutUsComponent,

    TestimonialsComponent,
    FAQComponent,
    OurProductsComponent,
    ProductsFilterComponent,
    ProductListComponent,
    ProductPageComponent,
    CartComponent,
    ShoppingCartComponent,
    OrderPlacedSuccessfullyComponent,
    TrackYourOrderComponent,
    DashboardComponent,
    DashboardMenuComponent,
    DashboardComponent,
    DashboardOrdersAndReuturnsComponent,
    DashboardMyAddressBookComponent,
    DashboardComponent,
    DashboardDealerProfileComponent,
    DashboardProfileComponent,
    DashboardWalletComponent,
    OrdersComponent,
    ReturnsComponent,
    EditOrAddNewComponent,
    StaticComponentComponent,
    DashboardOrdersAndReuturnsComponent,
    CarrierComponent,

    ShippingPolicyComponent,
    OrderReturnsComponent,
    BecomeADealerComponent,
    dealersComp,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,

    NgOtpInputModule,
    RouterModule

  ]
})
export class MainModule { }
