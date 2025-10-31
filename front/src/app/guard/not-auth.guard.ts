import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authQuery } from '@appStore/auth/auth.query';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    return authQuery.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }
}
