// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl: 'http://localhost:8181',
  login: 'login',
  signUp: 'register',
  signOut: 'auth/sign-out',
  changePassword: 'auth/change-password',

  accountUrl: 'http://localhost:8087/accounts',
  followRequest: 'http://localhost:8087/follow-requests',
  follows: 'http://localhost:8087/follows',
  chat: 'http://localhost:8087/chats',
  message: 'http://localhost:8087/messages',
  post: 'http://localhost:8087/posts',
  user: 'api/user',
  comment: 'http://localhost:8087/comments'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
