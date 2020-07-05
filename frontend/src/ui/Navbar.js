import React, { Component, useState, useEffect } from "react";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

// import Schools from "../school/schools";
// import UserList from "../userList";
// import SchoolListInMainMenu from "./schoolListInMainMenu";
import AddRole from "../role/addRole";
import { AddSchool, ListSchool, ViewSchool, EditSchool } from "../school";
// import UploadFile from "../uploadFile";
// import "./Navbar.css";
import "../App.css";
import "../App.sass";

import { useAuth0 } from "@auth0/auth0-react";

const Navbar = (props) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
  } = useAuth0();

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  // useEffect(() => {
  //   setUser(props.user);
  // }, [props.user]);

  return (
    <div className="container">
      <Router>
        <nav
          className="bd-navbar navbar has-shadow is-spaced"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={process.env.PUBLIC_URL + "logo.png"} />
              <span>JAMA</span>
            </a>
            <a
              role="button"
              id="navbarBurger"
              onClick={handleClick}
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navMenuDocumentation"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            id="navMenuDocumentation"
            // onClick={handleClick}
            // active={active}
            className={active ? "navbar-menu is-active" : "navbar-menu"}
          >
            <div className="navbar-start">
              <div className="navbar-item">
                <span className="icon">
                  <i className="fas fa-school has-text-success"></i>
                </span>
                <Link className="" to="/schoolListInMainMenu">
                  <strong>학원</strong>
                </Link>
              </div>
              <div className="navbar-item">
                {/* <Link className="" to="/userlist">
                  <span className="icon">
                    <i className="fas fa-users has-text-warning"></i>
                  </span>
                  <strong>사용자</strong>
                </Link> */}
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped is-grouped-multiline">
                  <p className="control">
                    {isAuthenticated && (
                      <Link className="button is-warning" to="/addrole">
                        <span className="has-margin-right-2 has-text-weight-bold">
                          {user.name}
                        </span>
                      </Link>
                    )}
                  </p>
                  <p className="control">
                    {isAuthenticated && (
                      <Link className="button is-primary" to="/school/add">
                        <strong>학교추가</strong>
                        <span className="icon">
                          <i className="fas fa-plus has-text-warning"></i>
                        </span>
                      </Link>
                    )}
                  </p>
                  <p className="control">
                    {/* {props.logged_in ? (
                      <Link className="button is-primary" to="/update">
                        <strong>정보수정</strong>
                      </Link>
                    ) : (
                      <Link className="button is-primary" to="/signup">
                        <strong>가입</strong>
                      </Link>
                    )} */}
                  </p>
                  <p className="control">
                    {isAuthenticated ? (
                      <button className="button" onClick={() => logout()}>
                        로그아웃
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={() => loginWithRedirect()}
                      >
                        <strong>로그인</strong>
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="bd-main">
          <div className="bd-main-container container">
            <div className="bd-duo">
              <div className="bd-lead">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} user={user} />}
                  />
                  <Route path="/about/:username" component={About} />
                  {/* <Route
                    path="/login"
                    render={() => <Login handle_login={props.handle_login} />}
                  />
                  <Route path="/signup" component={Signup} /> */}
                  {/* <Route path="/userlist" component={UserList} />
                  <Route
                    path="/schoolListInMainMenu"
                    render={(props) => (
                      <SchoolListInMainMenu {...props} user={user} />
                    )}
                  /> */}
                  <Route path="/school/add" render={(props) => <AddSchool />} />
                  {/* <Route
                    path="/addroleschool"
                    render={(props) => <AddRoleSchool {...props} user={user} />}
                  /> */}
                  <Route
                    path="/school/list"
                    render={(props) => <ListSchool />}
                  />
                  <Route path="/school/view/:id" component={ViewSchool} />
                  <Route path="/school/edit/:id" component={EditSchool} />
                  {/* <Route
                    path="/uploadFile"
                    render={(props) => <UploadFile {...props} user={user} />}
                  /> */}
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </Router>
    </div>
  );
};

class Home extends Component {
  render() {
    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="column has-text-centered is-hidden-touch">
              <p className="title is-1">
                <span>편리한 실용음악 학원 관리</span>
              </p>
              <p className="subtitle is-5 has-text-grey">
                실용음악 학원에 최적화된 온라인 관리 프로그램
              </p>
            </div>
          </div>
          {this.props.user === null ? (
            <div className="column">
              {/* <a
                href="/signup"
                className="button button-special box-shadow-lift is-medium is-rounded"
              >
                <span>지금 가입하세요</span>
                <span className="icon">
                  <i className="fas fa-arrow-right has-text-warning"></i>
                </span>
              </a> */}
            </div>
          ) : (
            ""
          )}
        </section>
        {/* <Schools></Schools> */}
      </div>
    );
  }
}

class About extends Component {
  render() {
    return <div>{this.props.match.params.username} 의 소개</div>;
  }
}

class NoMatch extends Component {
  render() {
    return <div> 404 </div>;
  }
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default Navbar;
