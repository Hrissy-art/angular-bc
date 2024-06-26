import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { BannerHomeComponent } from './HomeComponents/banner-home/banner-home.component';
import { PresentationHomeComponent } from './HomeComponents/presentation-home/presentation-home.component';
import { AboutusHomeComponent } from './HomeComponents/aboutus-home/aboutus-home.component';
import { ServiceComponent } from './HomeComponents/service/service.component';
import { CartComponent } from './cart/cart.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { PopupServicesComponent } from './popup-services/popup-services.component';
import { CategoryComponent } from './category/category.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { PaymentPageComponent } from './Views/payment-page/payment-page.component';
import { OneOrderSearchComponent } from './one-order-search/one-order-search.component';
import { OrderAssignComponent } from './order-assign/order-assign.component';
import { OneOrderAssignComponent } from './one-order-assign/one-order-assign.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { UserComponent } from './user/user.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { OneServiceComponent } from './one-service/one-service.component';
import { OneMaterialComponent } from './one-material/one-material.component';
import { OneProductAdminComponent } from './one-product-admin/one-product-admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { OneEmployeeComponent } from './one-employee/one-employee.component';
import { ClientListComponent } from './client-list/client-list.component';
import { OneClientComponent } from './one-client/one-client.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { OnePaymentComponent } from './one-payment/one-payment.component';
import { StatusesListComponent } from './statuses-list/statuses-list.component';
import { OneStatusComponent } from './one-status/one-status.component';

// import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    AuthComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    BannerHomeComponent,
    PresentationHomeComponent,
    AboutusHomeComponent,
    ServiceComponent,
    CartComponent,
    ServiceListComponent,
    OrderProductComponent,
    PopupServicesComponent,
    CategoryComponent,
    FormComponent,
    AdminHomeComponent,
    OrderComponent,
    PaymentComponent,
    OrderSearchComponent,
    ClientFormComponent,
    PaymentPageComponent,
    OneOrderSearchComponent,
    OrderAssignComponent,
    OneOrderAssignComponent,
    ClientOrderComponent,
    UserComponent,
    MaterialListComponent,
    OneServiceComponent,
    OneMaterialComponent,
    OneProductAdminComponent,
    EmployeesComponent,
    OneEmployeeComponent,
    ClientListComponent,
    OneClientComponent,
    PaymentMethodsComponent,
    OnePaymentComponent,
    StatusesListComponent,
    OneStatusComponent,
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
