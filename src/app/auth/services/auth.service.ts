import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { UserModel } from '@app/auth/models/user.model';
import { from, Observable, ReplaySubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Authenticate } from '../models/authentication.model';

const mockUser = { name: 'Brandon', email: 'brandon@ngrx.io' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  private loggedIn = false;

  public authStateReplaySubject = new ReplaySubject<UserModel | null>();

  authenticated$: Observable<boolean>;
  uid$: Observable<string>;

  constructor(private readonly afAuth: AngularFireAuth) {
    //
    this.afAuth.authState.subscribe((firebaseUser) => {
      this.loggedIn = !!firebaseUser;

      if (this.loggedIn) {
        this.authStateReplaySubject.next(mockUser);
      } else {
        this.authStateReplaySubject.next(null);
      }
    });
  }

  autoLogin(): Observable<UserModel> {
    //
    return this.authStateReplaySubject.asObservable().pipe(take(1));
  }

  login(auth: Authenticate): Observable<UserModel> {
    //
    this.afAuth.auth.signInWithEmailAndPassword('a.a@a.com', 'password');

    /*
    if (auth.username !== 'ngconf') {
      return throwError('Invalid username or password');
    }
    */

    return this.authStateReplaySubject.asObservable().pipe(
      filter((user) => !!user), // user is not null.
      take(1),
    );
  }

  logout(): Observable<boolean> {
    //
    this.afAuth.auth.signOut();

    return this.authStateReplaySubject.asObservable().pipe(
      filter((user) => !!!user), // user is null.
      take(1),
      map(() => true),
    );
  }

  /*
  check(): Observable<UserModel> {
    return of(this.loggedIn ? mockUser : null);
  }
  */
}
