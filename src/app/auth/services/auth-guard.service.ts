import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from './auth.service';

import * as fromStore from '@app/state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private readonly auth$: AngularFireAuth,
    private store: Store<fromStore.State>,
    private router: Router,
  ) {}

  // https://angular.io/guide/router#canactivate-requiring-authentication
  /*
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    //
    const url: string = state.url;
    console.log('url>', url);
    this.authService.redirectUrl = url;

    return this.checkStoreAuthentication().pipe(
      map((storeOrApiAuth) => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }),
    );
  }

  checkStoreAuthentication() {
    //
    return this.store.select(fromStore.selectHasChecked).pipe(
      filter((hasChecked) => hasChecked),
      exhaustMap(() =>
        this.store.select(fromStore.selectIsLoggedIn).pipe(take(1)),
      ),
    );
  }

  /*
  checkApiAuthentication() {
    return this.authService.check().pipe(
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }
  */
}
