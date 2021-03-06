// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  api_url: 'http://localhost:3000',
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZXJpa2pvaG4iLCJhIjoiY2szcXlrcHMyMDZ0bjNwbWpkeHdpN3QzaCJ9.st8hlJOoM0lKd_s6LJQPDA'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
