import React from 'react';

import {
    Link,
    useHistory
  } from "react-router-dom";

import AddRoleSchool from './addRoleSchool'

function AddRole(props) {
    const history = useHistory()

    return (
        <>
            <div className="bd-main-container container bd-lead">
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-6">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <div className="tile is-child notification is-primary">
                                    <div className="bd-lead">
                                        <Link className="" to="#">
                                            <span className="icon">
                                                <i className="fas fa-users has-text-warning"></i>
                                            </span>
                                            <strong className="title">학생</strong>
                                        </Link>
                                    </div>
                                </div>
                                <div className="tile is-child notification is-primary">
                                    <div className="bd-lead">
                                        <Link className="" to="#">
                                            <span className="icon">
                                                <i className="fas fa-user-friends has-text-warning"></i>
                                            </span>
                                            <strong className="title">학부모</strong>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-vertical is-6">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <div className="tile is-child notification is-primary">
                                    <div className="bd-lead">
                                        <Link className="" to="#">
                                            <span className="icon">
                                                <i className="fas fa-user-tie has-text-warning"></i>
                                            </span>
                                            <strong className="title">교사</strong>
                                        </Link>
                                    </div>
                                </div>
                                <div className="tile is-child notification is-primary">
                                    <div className="bd-lead">
                                        <Link className="" to="#" onClick={ e=> {history.push({
                                            pathname: '/addroleschool'
                                            })}}>
                                            <span className="icon">
                                                <i className="fas fa-school has-text-warning"></i>
                                            </span>
                                            <strong className="title">학원</strong>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            {/* <Route path="/addrole/addroleschool" component={AddRoleSchool} /> */}
        </>
    );
}

export default AddRole;