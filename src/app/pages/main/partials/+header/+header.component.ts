import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/api';

@Component({
  selector: 'main-partials-header',
  templateUrl: './+header.component.pug',
  styleUrls: ['./+header.component.scss']
})

export class HeaderComponent {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  logout() {
    this.sessionService.signOut();
    this.router.navigate(['/']);
  }
}