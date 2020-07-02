import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

import Profile from "./auth0/Profile";
import axios from "axios";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
  } = useAuth0();

  console.debug(user);
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
          console.log(response.data.firebaseToken);
        })
        .catch((error) => console.error("timeout exceeded"));
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

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name} <button onClick={() => logout()}>Log out</button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Profile />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
