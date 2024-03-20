import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { CategoryComponent } from './category/category.component';
import { adminGuard } from './services/admin-guard.service';
import { FormComponent } from './form/form.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ClientFormComponent } from './client-form/client-form.component';
// import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'products/:id', component: ProductComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign up', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'orders',
    component: OrderProductComponent,
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [adminGuard],
  },
  { path: 'form', component: FormComponent },
  { path: 'menage', component: AdminHomeComponent, canActivate: [adminGuard] },
  { path: 'form-order', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'search', component: OrderSearchComponent },
  { path: 'client', component: ClientFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
