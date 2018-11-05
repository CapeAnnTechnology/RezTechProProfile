// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_URL: 'http://dev.reztechpro.com:3000',
  SSO_URI: 'https://reztechpro-sso.herokuapp.com/',
  API_URI: 'http://dev.reztechpro.com:3000/v3.0/',
  BASE_API: 'http://dev.reztechpro.com:3000/v3.0/',
  BASE_URI: 'http://dev.reztechpro.com:4200',
  AUTH0_CLIENT_DOMAIN: 'reztechpro.auth0.com',
  AUTH0_CLIENT_ID: 'SJLqm1Itq4vSMmc8NhEl59AgV5zVAHTu',
  NAMESPACE: 'https://reztechpro.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
