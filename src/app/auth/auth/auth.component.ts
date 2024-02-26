import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router){}

  isLoginMode = true;

  onSwitchMode() {

    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
// console.log(form.value);
// form.reset();
  if (!form.valid) { 
    return;
  }

  const email = form.value.email;
  const password = form.value.password;

  this.authService.login(email, password).subscribe((res: { token: string; })=>{
    this.authService.storeToken(res.token);
    this.router.navigate(['/home']);
  });
}
}
