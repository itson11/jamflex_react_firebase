import React, {useState, useEffect} from 'react';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
  } from "react-router-dom";

function addRoleSelect(props) {
    return (
        <div className="bd-main-container container">
            <div className="columns">
                <div className="column">
                    <p className="bd-notification is-primary">
                        <code className="html">학생</code>
                    </p>
                </div>
                <div className="column">
                    <p className="bd-notification is-primary">
                        <code className="html">학부모</code>
                    </p>
                </div>
            </div>
            <div className="columns">
            <div className="column">
                    <p className="bd-notification is-primary">
                        <code className="html">교사</code>
                    </p>
                </div>
                <div className="column">
                    <p className="bd-notification is-primary">
                        <code className="html"><Link to="/addrole/addroleschool">학원</Link></code>
                    </p>
                </div>
            </div>
            
            </div>
    )
}

export default addRoleSelect