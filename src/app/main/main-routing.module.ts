import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { BecomeADealerComponent } from '../become-a-dealer/become-a-dealer.component';
import { CarrierComponent } from '../carrier/carrier.component';
import { CartComponent } from '../cart/cart.component';
import { OrderPlacedSuccessfullyComponent } from '../cart/order-placed-successfully/order-placed-successfully.component';
import { ShoppingCartComponent } from '../cart/shopping-cart/shopping-cart.component';
import { cartGuard } from '../cart/shopping.cart.guard';
import { TrackYourOrderComponent } from '../cart/track-your-order/track-your-order.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { dealerProfileGuard } from '../dashboard/dashboard-dealer-profile/dashboard-deal-profile.guard';
import { DashboardDealerProfileComponent } from '../dashboard/dashboard-dealer-profile/dashboard-dealer-profile.component';
import { DashboardMyAddressBookComponent } from '../dashboard/dashboard-my-address-book/dashboard-my-address-book.component';
import { DashboardOrdersAndReuturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/dashboard-orders-and-reuturns.component';
import { OrderReturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/order-returns/order-returns.component';
import { OrdersComponent } from '../dashboard/dashboard-orders-and-reuturns/orders/orders.component';
import { ReturnsComponent } from '../dashboard/dashboard-orders-and-reuturns/returns/returns.component';
import { DashboardProfileComponent } from '../dashboard/dashboard-profile/dashboard-profile.component';
import { userProfileGuard } from '../dashboard/dashboard-profile/dashboard-profile.guard';
import { DashboardWalletComponent } from '../dashboard/dashboard-wallet/dashboard-wallet.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EditOrAddNewComponent } from '../dashboard/edit-or-add-new/edit-or-add-new.component';
import { FAQComponent } from '../faq/faq.component';
import { AuthGuard } from '../header/auth.guard';
import { LogInSignUpComponent } from '../header/log-in/log-in-Sign-up.component';
import { OurProductsComponent } from '../our-products/our-products.component';
import { ProductPageComponent } from '../our-products/product-list/product-page/product-page.component';
import { ShippingPolicyComponent } from '../shipping-policy/shipping-policy.component';
import { StaticComponentComponent } from '../static-component/static-component.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { dealersComp } from '../dealers/dealers.component';

const routes: Routes = [
  { path: 'diclaimer', component: StaticComponentComponent },
  { path: 'privacy-policy', component: StaticComponentComponent },
  { path: 'terms-of-services', component: StaticComponentComponent },
  { path: 'return-refund-and-cancellation-policy', component: StaticComponentComponent },

  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'become-a-dealer', component: BecomeADealerComponent },
 
  { path: 'carrier', component: CarrierComponent },
  { path: 'shipping-policy', component: ShippingPolicyComponent },
  { path: 'our-products', component: OurProductsComponent },
  { path: 'our-products/:id/:name', component: OurProductsComponent },
  { path: 'product-page/:name', component: ProductPageComponent },
  { path: 'cart-component', component: CartComponent, canActivate: [cartGuard] },
  { path: 'Shopping-cart', component: ShoppingCartComponent, canActivate: [cartGuard] },
  { path: 'logIn-or-SignUp-modal', component: LogInSignUpComponent },
  { path: 'order-placed-successfully', component: OrderPlacedSuccessfullyComponent },
  { path: 'track-your-order', component: TrackYourOrderComponent },
  { path: 'dealers-comp', component: dealersComp},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard-profile',
        component: DashboardProfileComponent,
        canActivate: [userProfileGuard]
      },
      {
        path: 'dashboard-orders-and-returns',
        component: DashboardOrdersAndReuturnsComponent,
        children: [
          {
            path: 'orders',
            component: OrdersComponent
          },
          {
            path: 'returns',
            component: ReturnsComponent
          },
          { path: 'return-orders/:id', component: OrderReturnsComponent },
          {
            path: '',
            redirectTo: 'orders',
            pathMatch: 'full'
          },

        ]
      },
      {
        path: 'dashboard-my-address-book',
        component: DashboardMyAddressBookComponent,
      },

      {
        path: 'dashboard-my-address-book/:id/:adressId/edit',
        component: EditOrAddNewComponent
      },
      {
        path: 'dashboard-my-address-book/new',
        component: EditOrAddNewComponent
      },


      { path: 'dashboard-wallet', component: DashboardWalletComponent },
      {
        path: 'dashboard-dealer-profile', component: DashboardDealerProfileComponent,
        canActivate: [dealerProfileGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard-dealer-profile',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
