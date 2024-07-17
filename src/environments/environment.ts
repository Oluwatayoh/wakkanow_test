// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   firebase: {
    projectId: 'my-shelf-11581',
    appId: '1:323101796245:web:d633ef9f7831e60befb89c',
    databaseURL: 'https://my-shelf-11581-default-rtdb.firebaseio.com',
    storageBucket: 'my-shelf-11581.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDfBgK18EVC9F-5bQn4z2V-JxCNzSYmXLs',
    authDomain: 'my-shelf-11581.firebaseapp.com',
    messagingSenderId: '323101796245',
  },
  // firebase: {
  //   apiKey: "AIzaSyDWQNPe8MpilRw5DR6UCmKxmMtWbOObn0I",
  //   authDomain: "bookstore-ba21c.firebaseapp.com",
  //   databaseURL: "https://bookstore-ba21c.firebaseio.com",
  //   projectId: "bookstore-ba21c",
  //   storageBucket: "bookstore-ba21c.appspot.com",
  //   messagingSenderId: "654947264614"
  // }
};
