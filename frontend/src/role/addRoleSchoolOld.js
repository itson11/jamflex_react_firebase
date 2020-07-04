import React, {useState, useEffect, setState, useContext} from 'react';
import { gql } from "apollo-boost"
import { ApolloProvider } from 'react-apollo';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";

import client from '../apolloClient';

import { useQuery } from '@apollo/react-hooks';

import {SCHOOL} from "../queries"

function AddRoleSchool(props) {
    const [tabno, setTabno] = useState(1)


    return (
        <ApolloProvider client={client}>
        <section className="has-background-white-ter">
        <div className="container">
          {/* {this.state.isJoin && <Redirect to="/" />}  */}
          <section className="hero is-primary is-bold">
            <div className="hero-body">
              <div className="container has-text-centered">
                  <div className="column is-8 is-offset-2">
                      <h3 className="title has-text-white">학원 추가</h3>
                      <hr className="login-hr" />
                      <p className="subtitle has-text-white">필수 입력 정보를 입력하고 가입을 완료하세요.</p>
                      <div className="bd-snippet-preview">
                        <div className="tabs is-centered is-boxed has-text-dark">
                            <ul>
                                <li className={tabno===1?'is-active':''}><Link to="/addroleschool/" onClick={e=>{setTabno(1)}}>이름</Link></li>
                                <li className={tabno===2?'is-active':''}><Link to="/addroleschool/emptype/" onClick={e=>{setTabno(2)}}>고용유형</Link></li>
                                <li className={tabno===3?'is-active':''}><Link to="/addroleschool/phone/" onClick={e=>{setTabno(3)}}>전화번호</Link></li>
                                <li className={tabno===4?'is-active':''}><Link to="/addroleschool/email/" onClick={e=>{setTabno(4)}}>이메일</Link></li>
                                <li className={tabno===5?'is-active':''}><Link to="/addroleschool/addr/" onClick={e=>{setTabno(5)}}>주소</Link></li>
                                <li className={tabno===6?'is-active':''}><Link to="/addroleschool/website/" onClick={e=>{setTabno(6)}}>웹사이트</Link></li>
                                <li className={tabno===7?'is-active':''}><Link to="/addroleschool/image/" onClick={e=>{setTabno(7)}}>이미지</Link></li>
                                <li className={tabno===8?'is-active':''}><Link to="/addroleschool/desc/" onClick={e=>{setTabno(8)}}>소개</Link></li>
                            </ul>
                        </div>
                      </div>
                    <div className="box">
                    <Router>
                        <Switch>
                            <Route path="/addroleschool/emptype" render={(props) => <SchoolEmptype {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/phone" render={(props) => <SchoolPhone {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/email" render={(props) => <SchoolEmail {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/addr" render={(props) => <SchoolAddr {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/website" render={(props) => <SchoolWebsite {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/image" render={(props) => <SchoolImage {...props} setTabno={setTabno} />} ></Route>
                            <Route path="/addroleschool/desc" render={(props) => <SchoolDesc {...props} setTabno={setTabno} />} ></Route>
                            {/* <Route path="/addroleschool/email" render={(props) => <SchoolEmail {...props} setTabno={setTabno} />} ></Route> */}
                            <Route path="/addroleschool/" render={(props) => <SchoolName props={props} setTabno={setTabno} client={client} />} ></Route>
                        </Switch>
                    </Router>
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          </section>
          </ApolloProvider>
    )
}

function SchoolName({props, setTabno, client}) {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [goto, setGoto] = useState(false)

    const history = useHistory();

    // console.log(client)

    function findSchoolByName({ name }) {
        client.query({
            query:gql `
            query school($id: Int, $name: String){
                school(id: $id, name: $name) {
                    id
                    name
                }
            }
            `,
            variables: {name: name},
          }).then(result => {console.log(result)})
    }

    function handleInputChange(e) {
        if (e.target.value.length < 2) {
            setNameError("2글자 이상 입력하세요")
        } else {
            setNameError("")
        }
    }

    function onFormSubmit(e) {
        setTabno(2)

        findSchoolByName({name: name})
        history.push({
            pathname: '/addroleschool/emptype'
        })
        e.preventDefault()
    }

    return (
        <form onSubmit={e => { 
            onFormSubmit(e)
         }}>
            {/* {goto && <Redirect to="/addroleschool/emptype" />} */}
            <div className="field is-horizontal">
            <div className="field-label is-normal">
            <label className="label">이름</label>
            </div>
            <div className="field-body">
            <div className="field">
                <p className="control has-icons-left">
                <input className={"input "+ (nameError.length > 0 ? 'is-danger':'' )} name="name" type="name" placeholder="이름" onKeyUp={e => {setName(e.target.value); handleInputChange(e)}} onBlur={e => {setName(e.target.value); handleInputChange(e)}} />
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
                </p>
                <p className={"help "+ (nameError.length > 0 ? 'is-danger':'' )}>{nameError}</p>
            </div>
            </div>
        </div>

        <div className="field is-grouped is-grouped-right column">
            <div className="control">
            <button type="submit" className="button is-primary is-light" >
            <span className="icon is-small">
            <i className="fas fa-angle-right"></i>
            </span>
            <span>다음</span>
            </button>
            </div>
        </div>

        </form>
    )
}

function SchoolEmptype({setTabno}) {
    const [emptype, setEmptype] = useState("")
    const [emptypeError, setEmptypeError] = useState("")
    const [goto, setGoto] = useState(false)

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(3)
        // setGoto(true)

        // if (goto) return <Redirect to="/addroleschool/phone" push={true} />

        history.push({
            pathname: '/addroleschool/phone'
        })
        
        e.preventDefault()
    }

    return (
        <form onSubmit={e => {
            // onFormSubmit(e)
            setTabno(3)
            history.push({
                pathname: '/addroleschool/phone'
            })
            return false
            }}>
            {/* {goto && <Redirect to="/addroleschool/phone" />} */}
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">고용유형</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <div className={"select "+ (emptypeError.length > 0 ? 'is-danger':'' )}>
                    <select name="emptype" onKeyUp={e => {setEmptype(e.target.value); handleInputChange(e)}} onBlur={e => {setEmptype(e.target.value); handleInputChange(e)}}>
                        <option value="0">수당</option>
                        <option value="1">봉급</option>
                    </select>
                    </div>
                    <span className="icon is-small is-left">
                        <i className="fas fa-won-sign"></i>
                    </span>
                    </p>
                    <p className={"help "+ (emptypeError.length > 0 ? 'is-danger':'' )}>{emptypeError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="button" className="button is-primary is-light" onClick={(e) => onFormSubmit(e)}>
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolPhone({setTabno}) {
    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(4)

        history.push({
            pathname: '/addroleschool/email'
        })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">전화번호</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <input className={"input "+ (phoneError.length > 0 ? 'is-danger':'' )} name="phone" placeholder="전화번호" onKeyUp={e => {setPhone(e.target.value); handleInputChange(e)}} onBlur={e => {setPhone(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-phone"></i>
                    </span>
                    </p>
                    <p className={"help "+ (phoneError.length > 0 ? 'is-danger':'' )}>{phoneError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolEmail({setTabno}) {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(5)

        history.push({
            pathname: '/addroleschool/addr'
        })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">이메일</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <input className={"input "+ (emailError.length > 0 ? 'is-danger':'' )} name="email" placeholder="이메일" onKeyUp={e => {setEmail(e.target.value); handleInputChange(e)}} onBlur={e => {setEmail(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    </p>
                    <p className={"help "+ (emailError.length > 0 ? 'is-danger':'' )}>{emailError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolAddr({setTabno}) {
    const [addr, setAddr] = useState("")
    const [addrError, setAddrError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(6)

        history.push({
            pathname: '/addroleschool/website'
        })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">주소</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <input className={"input "+ (addrError.length > 0 ? 'is-danger':'' )} name="addr" placeholder="주소" onKeyUp={e => {setAddr(e.target.value); handleInputChange(e)}} onBlur={e => {setAddr(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-address-card"></i>
                    </span>
                    </p>
                    <p className={"help "+ (addrError.length > 0 ? 'is-danger':'' )}>{addrError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolWebsite({setTabno}) {
    const [website, setWebsite] = useState("")
    const [websiteError, setWebsiteError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(7)

        history.push({
            pathname: '/addroleschool/image'
        })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">웹사이트</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <input className={"input "+ (websiteError.length > 0 ? 'is-danger':'' )} name="website" placeholder="웹사이트" onKeyUp={e => {setWebsite(e.target.value); handleInputChange(e)}} onBlur={e => {setWebsite(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-window-restore"></i>
                    </span>
                    </p>
                    <p className={"help "+ (websiteError.length > 0 ? 'is-danger':'' )}>{websiteError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolImage({setTabno}) {
    const [image, setImage] = useState("")
    const [imageError, setImageError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        setTabno(8)

        history.push({
            pathname: '/addroleschool/desc'
        })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">이미지</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <input className={"input "+ (imageError.length > 0 ? 'is-danger':'' )} type="file" name="image" placeholder="이미지" onKeyUp={e => {setImage(e.target.value); handleInputChange(e)}} onBlur={e => {setImage(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-images"></i>
                    </span>
                    </p>
                    <p className={"help "+ (imageError.length > 0 ? 'is-danger':'' )}>{imageError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-angle-right"></i>
                </span>
                <span>다음</span>
                </button>
                </div>
            </div>
        </form>
    )
}

function SchoolDesc({setTabno}) {
    const [desc, setDesc] = useState("")
    const [descError, setDescError] = useState("")

    const history = useHistory();

    function handleInputChange(e) {

    }

    function onFormSubmit(e) {
        // setTabno(4)

        // history.push({
        //     pathname: '/addroleschool/addr'
        // })

        e.preventDefault()
    }

    return (
        <form onSubmit={e => {onFormSubmit(e)}}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                <label className="label">소개</label>
                </div>
                <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    <textarea className={"input "+ (descError.length > 0 ? 'is-danger':'' )} name="desc" placeholder="소개" onKeyUp={e => {setDesc(e.target.value); handleInputChange(e)}} onBlur={e => {setDesc(e.target.value); handleInputChange(e)}} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-handshake"></i>
                    </span>
                    </p>
                    <p className={"help "+ (descError.length > 0 ? 'is-danger':'' )}>{descError}</p>
                </div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-right column">
                <div className="control">
                <button type="submit" className="button is-primary is-light">
                <span className="icon is-small">
                <i className="fas fa-save"></i>
                </span>
                <span>저장</span>
                </button>
                </div>
            </div>
        </form>
    )
}

export default AddRoleSchool