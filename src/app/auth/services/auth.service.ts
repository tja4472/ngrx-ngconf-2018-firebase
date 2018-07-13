import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { UserModel } from '@app/auth/models/user.model';
import { from, Observable, ReplaySubject, of, merge } from 'rxjs';
import { filter, map, take, share, exhaustMap, switchMap } from 'rxjs/operators';

import { Authenticate } from '../models/authentication.model';

const mockUser = { name: 'Brandon', email: 'brandon@ngrx.io' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  private signedIn$: Observable<UserModel>;
  private signedInSignedOut$: Observable<UserModel>;
  private signedOut$: Observable<UserModel>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    // private readonly userDataService: UserDataService
  ) {
    const firebaseAuth$ = this.afAuth.authState.pipe(
      share()
    );

    this.signedIn$ = firebaseAuth$.pipe(
      filter((firebaseUser) => !!firebaseUser),
      exhaustMap(() => {
        const user: UserModel = {
          email: mockUser.email,
          name: mockUser.name,
        };

        return of(user);
      }
      /*
        from(this.userDataService.getUserData(firebaseUser.uid)).pipe(
          map((userData) => ({ firebaseUser, userData })),
          map((x) => {
            const user: UserModel = {
              id: x.firebaseUser.uid,
              email: x.firebaseUser.email,
              name: x.firebaseUser.displayName,
              todoListId: x.userData.todoListId,
            };

            return user;
          })
        */
        )
    );

    this.signedOut$ = firebaseAuth$.pipe(
      filter((firebaseUser) => !!!firebaseUser),
      map(() => null)
    );

    this.signedInSignedOut$ = merge(this.signedIn$, this.signedOut$);
  }

  autoLogin(): Observable<UserModel> {
    //
    return this.signedInSignedOut$.pipe(take(1));
  }

  login(auth: Authenticate): Observable<UserModel> {
    //
    const result$ = from(
      // this.afAuth.auth.signInWithEmailAndPassword(auth.username, auth.password)
      this.afAuth.auth.signInWithEmailAndPassword('a.a@a.com', 'password')
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );

    return result$;
  }

  public logout(): Observable<boolean> {
    //
    const result$ = from(this.afAuth.auth.signOut()).pipe(
      switchMap(() => {
        return this.signedOut$.pipe(
          take(1),
          map(() => true)
        );
      })
    );

    return result$;
  }

  public signUp(auth: Authenticate) {
    //
    const result$ = from(
      this.afAuth.auth.createUserWithEmailAndPassword(
        auth.username,
        auth.password
      )
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );

    return result$;
  }

  /*
  check(): Observable<UserModel> {
    return of(this.loggedIn ? mockUser : null);
  }
  */
}
