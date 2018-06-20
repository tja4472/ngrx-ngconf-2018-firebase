import { Action } from '@ngrx/store';
import { Authenticate } from '../models/authentication.model';
import { UserModel } from '../models/user.model';

export enum AuthActionTypes {
  AutoLogin = '[Auth API] Auto Login',
  AutoLoginSignedOut = '[Auth API] Auto Login Signed Out',
  AutoLoginSuccess = '[Auth API] Auto Login Success',
  Login = '[Login Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  Logout = '[Auth] Confirm Logout',
  LogoutCancelled = '[Auth] Logout Cancelled',
  LogoutConfirmed = '[Auth] Logout Confirmed',
  LogoutComplete = '[Auth API] Logout Complete',
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AutoLogin;
}

export class AutoLoginSignedOut implements Action {
  readonly type = AuthActionTypes.AutoLoginSignedOut;
}

export class AutoLoginSuccess implements Action {
  readonly type = AuthActionTypes.AutoLoginSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LogoutConfirmed;
}

export class LogoutCancelled implements Action {
  readonly type = AuthActionTypes.LogoutCancelled;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
}

export type AuthActions =
  | AutoLoginSignedOut
  | AutoLoginSuccess
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutCancelled
  | LogoutConfirmed
  | LogoutComplete;
