# ngrx-ngconf-2018-firebase

A Firebase implementation of Brandon Roberts [NG CONF 2018 - Authentication with NgRx](http://confsnap.com/event/ng-conf-18/103) talk.

## References

- [NG CONF 2018 - Authentication with NgRx](http://confsnap.com/event/ng-conf-18/103)
- [GitHub](https://github.com/brandonroberts/ngrx-ngconf-2018)
- [YouTube](https://youtu.be/46IRQgNtCGw)

## Requires src/app/my-firebase-app-config.ts

```typescript
export const MY_FIREBASE_APP_CONFIG = {
  apiKey: 'XXXXXX',
  authDomain: 'XXXXXX',
  databaseURL: 'XXXXXX',
  projectId: 'XXXXXX',
  storageBucket: 'XXXXXX',
  messagingSenderId: 'XXXXXX',
};
```

## auth.service.ts

Username and password hardcoded.

```ts
this.afAuth.auth.signInWithEmailAndPassword('a.a@a.com', 'password');
```

## Development server

Run `npm start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Actions

### Start Signed Out

- @ngrx/store/init
- @ngrx/effects/init
- [Auth API] Auto Login
- [Auth API] Auto Login Signed Out

### Start Signed In

- @ngrx/store/init
- @ngrx/effects/init
- [Auth API] Auto Login
- @ngrx/store/update-reducers
- [Auth API] Auto Login Success
- [Books Page] Load Books
- [Books API] Load Success

# Other stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
