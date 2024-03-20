import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
  }
}
