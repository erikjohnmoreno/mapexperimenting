import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from 'src/app/services/api';

@Injectable({
  providedIn: 'root'
})

// guard for registration and login pages
export class NonAuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionService.getCurrentUser()) {
      this.router.navigate(['/main']);
      return false;
    }
    return true
  }
}
