import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderProductComponent } from './order-product/order-product.component';

const routes: Routes = [{ path:'', pathMatch: 'full', redirectTo: 'home' },
{ path: 'products/:id', component: ProductComponent },
{ path: 'product-list', component: ProductListComponent},
{ path: 'auth',  component: AuthComponent},
{ path: 'home', component: HomeComponent },
{ path: 'sign up', component: LoginComponent },
{ path: 'cart', component: CartComponent },
{ path: 'orders', component:OrderProductComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
