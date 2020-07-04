import auth0 from "auth0";

let _auth0Client = null;
let _idToken = null;
let _profile = null;

class Auth0Client {
  constructor() {
    const AUTH0_APP_DOMAIN = "jamschool.us.auth0.com";
    const AUTH0_CLIENT_ID = "mWbziRlKLxpSfW1CJLu6R4HSNNokaYgK";

    _auth0Client = new auth0.WebAuth({
      domain: AUTH0_APP_DOMAIN,
      audience: `https://${AUTH0_APP_DOMAIN}/userinfo`,
      clientID: AUTH0_CLIENT_ID,
      redirectUri: "http://localhost:3001/",
      responseType: "token id_token",
      scope: "openid profile",
    });
  }

  getIdToken() {
    return _idToken;
  }

  getProfile() {
    return _profile;
  }

  handleCallback() {
    return new Promise((resolve, reject) => {
      _auth0Client.parseHash(async (err, authResult) => {
        window.location.hash = "";
        if (err) return reject(err);

        if (!authResult || !authResult.idToken) {
          // not an authentication request
          return resolve(false);
        }
        _idToken = authResult.idToken;
        _profile = authResult.idTokenPayload;

        return resolve(true);
      });
    });
  }

  signIn() {
    _auth0Client.authorize();
  }

  signOut() {
    _idToken = null;
    _profile = null;
  }
}

export default new Auth0Client();
