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
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { BannerHomeComponent } from './HomeComponents/banner-home/banner-home.component';
import { PresentationHomeComponent } from './HomeComponents/presentation-home/presentation-home.component';
import { AboutusHomeComponent } from './HomeComponents/aboutus-home/aboutus-home.component';
import { ServiceComponent } from './HomeComponents/service/service.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    UserComponent,
    AuthComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    BannerHomeComponent,
    PresentationHomeComponent,
    AboutusHomeComponent,
    ServiceComponent
  ],
    
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,


  ] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





