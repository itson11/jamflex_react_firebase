import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "mobx-react";
import Firebase, { FirebaseContext } from "./components/Firebase";
import store from "./stores";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="jamschool.us.auth0.com"
      audience="https://jamschool.us.auth0.com/userinfo"
      clientId="QYY0IsGOVC1tsdiRsUlR4ej8Xo6ucgWQ"
      redirectUri={window.location.origin}
      responseType="token id_token"
      scope="openid profile"
      cacheLocation="localstorage"
      useRefreshTokens="true"
    >
      <Provider {...store}>
        <FirebaseContext.Provider value={Firebase}>
          <App />
        </FirebaseContext.Provider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
