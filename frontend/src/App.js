import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./auth0/Profile";
import axios from "axios";

import Navbar from "./ui/Navbar";
import { withFirebase } from "./components/Firebase";
import Messages from "./components/messages";

import useStores from "./utils/useStores";

function App(props) {
  const { sessionStore } = useStores();

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
  } = useAuth0();

  // console.debug(user);
  if (user) {
    (async () => {
      const claims = await getIdTokenClaims();
      const idToken = claims.__raw;
      axios({
        method: "get",
        url: "http://localhost:3001/firebase",
        timeout: 4000, // 4 seconds timeout
        headers: {
          authorization: "Bearer " + idToken,
        },
        data: {
          sub: user.sub,
        },
      })
        .then((response) => {
          props.firebase
            .setToken(response.data.firebaseToken)
            .then(function () {
              props.firebase.updateProfile(user).then(function (data) {});
              sessionStore.setAuthUser(props.firebase.getCurrentUser());
            });
        })
        .catch((error) => {
          console.debug(error);
          console.error("timeout exceeded");
        });
    })();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Oops... {error.message}
        <button onClick={() => logout()}>Log out</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      {/* <Messages /> */}

      <footer className="footer has-background-white">
        <div className="content has-text-centered">
          <p>
            <strong>JM</strong> by <a href="/">Jamanager</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default withFirebase(App);
