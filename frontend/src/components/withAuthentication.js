import React from 'react';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
 
import { withFirebase } from './Firebase';
 
const withAuthentication = Component => {
  constructor(props) {
    super(props);

    this.props.sessionStore.setAuthUser(
      JSON.parse(localStorage.getItem('authUser')),
    );
  }

  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        this.props.sessionStore.setAuthUser(authUser);
      },
      () => {
        localStorage.removeItem('authUser');
        this.props.sessionStore.setAuthUser(null);
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }
 
  return compose(
    withFirebase,
    inject('sessionStore'),
  )(WithAuthentication);
};
 
export default withAuthentication;