import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { Actions, Effect } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  AutoLogin,
  AutoLoginSignedOut,
  AutoLoginSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LogoutCancelled,
  LogoutComplete,
  LogoutConfirmed,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  autoLogin$ = this.actions$.ofType<AutoLogin>(AuthActionTypes.AutoLogin).pipe(
    exhaustMap(() =>
      this.authService.autoLogin().pipe(
        map((user) => {
          if (!!user) {
            return new AutoLoginSuccess({ user });
          } else {
            return new AutoLoginSignedOut();
          }
        }),
      ),
    ),
  );

  @Effect()
  login$ = this.actions$.ofType<Login>(AuthActionTypes.Login).pipe(
    map((action) => action.payload),
    exhaustMap((auth) =>
      this.authService.login(auth).pipe(
        map((user) => new LoginSuccess({ user })),
        catchError((error) => of(new LoginFailure(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType<LoginSuccess>(AuthActionTypes.LoginSuccess)
    .pipe(
      tap(() => {
        // this.router.navigate(['/books']);
        if (this.authService.redirectUrl === '') {
          this.router.navigate(['/books']);
        } else {
          this.router.navigate([this.authService.redirectUrl]);
        }
      }),
    );

  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map((confirmed) => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            }),
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed)
    .pipe(
      exhaustMap((auth) =>
        this.authService.logout().pipe(
          tap(() => this.router.navigate(['/login'])),
          map(() => new LogoutComplete()),
          catchError(() => of(new LogoutComplete())),
        ),
      ),
    );

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => new AutoLogin()),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog,
  ) {}
}
