import React, { useState, useEffect } from "react";
// import { gql } from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
import axios, { post } from "axios";
import { NaverMap, Marker } from "react-naver-maps";

import { Link } from "react-router-dom";

import { isPhone, isEmail } from "../utils/Validation";

function AddRoleSchool(props) {
  let myschool = {
    name: "",
    emptype: "0",
    phone: "",
    email: "",
    addr: "",
    website: "",
    image: null,
    desc: "",
  };

  const [tabno, setTabno] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [school, setSchool] = useState(myschool);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const TABNO_STATES = {
    1: (
      <SchoolName
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, name: val });
        }}
        getValue={school.name}
        errorMsg={errorMsg}
      />
    ),
    2: (
      <SchoolEmptype
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, emptype: val });
        }}
        getValue={school.emptype}
      />
    ),
    3: (
      <SchoolPhone
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, phone: val });
        }}
        getValue={school.phone}
        errorMsg={errorMsg}
      />
    ),
    4: (
      <SchoolEmail
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, email: val });
        }}
        getValue={school.email}
        errorMsg={errorMsg}
      />
    ),
    5: (
      <SchoolAddr
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, addr: val });
        }}
        getValue={school.addr}
      />
    ),
    6: (
      <SchoolWebsite
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, website: val });
        }}
        getValue={school.website}
      />
    ),
    7: (
      <SchoolImage
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, image: val });
        }}
        getValue={school.image}
      />
    ),
    8: (
      <SchoolDesc
        setTabno={setTabno}
        setValue={(val) => {
          setSchool({ ...school, desc: val });
        }}
        getValue={school.desc}
        submitFunc={submitFunc}
      />
    ),
  };

  function dataValidCheck() {
    if (school.name < 2) {
      setErrorMsg("이름을 2글자 이상 입력하세요");
      setTabno(1);
      return false;
    } else if (!isPhone(school.phone)) {
      setErrorMsg("전화번호 형식을 확인하세요");
      setTabno(3);
      return false;
    } else if (!isEmail(school.email)) {
      setErrorMsg("이메일 형식을 확인하세요");
      setTabno(4);
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  }

  function chiefCreate(school) {
    const url = "http://" + window.location.hostname + ":8000/api/chief/";
    const formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("school_id", school.id);
    formData.append("name", user.fullname);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    // formData.append("image", user.image)
    formData.append("desc", user.desc);

    // console.log(formData)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    post(url, formData, config)
      .then((response) => {
        if (response.data) {
          // schoolCreate(response.data)
          props.history.push({
            pathname: "/",
            state: {},
          });
        } else {
          console.log(response.data.success);
        }
      })
      .catch((err) => console.log(err));
  }

  function schoolCreate() {
    const url = "http://" + window.location.hostname + ":8000/api/school/";
    const formData = new FormData();

    for (const key in school) {
      formData.append(key, school[key]);
    }
    // formData.append("chiefs", chief.id)

    // formData.append('image',state)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    };
    post(url, formData, config)
      .then((response) => {
        if (response.data) {
          // console.log(response.data)
          // chiefCreate(response.data)
          props.history.push({
            pathname: "/",
            state: {},
          });
        } else {
          console.log(response.data.success);
        }
      })
      .catch((err) => console.log(err));
  }

  function submitFunc() {
    if (dataValidCheck) {
      schoolCreate();
      // schoolCreate()
    }
  }

  return (
    <section className="has-background-white">
      <div className="container bd-lead">
        {/* {this.state.isJoin && <Redirect to="/" />}  */}
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-8 is-offset-2">
                <h3 className="title has-text-white">학원 추가</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-white">
                  필수 입력 정보를 입력하고 가입을 완료하세요.
                </p>
                <div className="bd-snippet-preview">
                  {/* <div className="tabs is-centered is-boxed has-text-dark">
                            <ul>
                                <li className={tabno===1?'is-active':''}><Link to="/addroleschool/" onClick={e=>{setTabno(1)}} >이름</Link></li>
                                <li className={tabno===2?'is-active':''}><Link to="/addroleschool/emptype/" onClick={e=>{setTabno(2)}} >고용유형</Link></li>
                                <li className={tabno===3?'is-active':''}><Link to="/addroleschool/phone/" onClick={e=>{setTabno(3)}} >전화번호</Link></li>
                                <li className={tabno===4?'is-active':''}><Link to="/addroleschool/email/" onClick={e=>{setTabno(4)}} >이메일</Link></li>
                                <li className={tabno===5?'is-active':''}><Link to="/addroleschool/addr/" onClick={e=>{setTabno(5)}} >주소</Link></li>
                                <li className={tabno===6?'is-active':''}><Link to="/addroleschool/website/" onClick={e=>{setTabno(6)}} >웹사이트</Link></li>
                                <li className={tabno===7?'is-active':''}><Link to="/addroleschool/image/" onClick={e=>{setTabno(7)}} >이미지</Link></li>
                                <li className={tabno===8?'is-active':''}><Link to="/addroleschool/desc/" onClick={e=>{setTabno(8)}} >소개</Link></li>
                            </ul>
                        </div> */}
                  <ul className="steps is-narrow is-small is-centered has-content-centered">
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 1 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(1);
                        }}
                      >
                        <span className="steps-marker">
                          <span className="icon">
                            <i className="fa fa-shopping-cart"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">이름</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 2 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/emptype/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(2);
                        }}
                      >
                        <span className="steps-marker">
                          <span className="icon">
                            <i className="fa fa-won-sign"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">고용유형</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 3 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/phone/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(3);
                        }}
                      >
                        <span className="steps-marker">
                          <span className="icon">
                            <i className="fa fa-phone"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">전화번호</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 4 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/email/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(4);
                        }}
                      >
                        <span className="steps-marker is-hollow">
                          <span className="icon">
                            <i className="fa fa-envelope"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">이메일</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 5 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/addr/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(5);
                        }}
                      >
                        <span className="steps-marker is-hollow">
                          <span className="icon">
                            <i className="fa fa-address-card"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">주소</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 6 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/website/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(6);
                        }}
                      >
                        <span className="steps-marker is-hollow">
                          <span className="icon">
                            <i className="fa fa-window-restore"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">웹사이트</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 7 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/image/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(7);
                        }}
                      >
                        <span className="steps-marker is-hollow">
                          <span className="icon">
                            <i className="fa fa-images"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">이미지</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      className={
                        "steps-segment " +
                        (tabno === 8 ? " is-active has-gaps" : "")
                      }
                    >
                      <Link
                        to="/addroleschool/desc/"
                        className="has-text-dark"
                        onClick={(e) => {
                          setTabno(8);
                        }}
                      >
                        <span className="steps-marker is-hollow">
                          <span className="icon">
                            <i className="fa fa-check"></i>
                          </span>
                        </span>
                        <div className="steps-content">
                          <p className="heading">소개</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="box bd-snippet">{TABNO_STATES[tabno]}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function SchoolName({ setTabno, setValue, errorMsg, getValue }) {
  const [name, setName] = useState(getValue);
  const [nameError, setNameError] = useState(errorMsg);

  function findSchoolByName({ name }) {
    // client
    //   .query({
    //     query: gql`
    //       query school($id: Int, $name: String) {
    //         school(id: $id, name: $name) {
    //           id
    //           name
    //         }
    //       }
    //     `,
    //     variables: { name: name },
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   });
  }

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setName(e.target.value);
      setValue(e.target.value);
    }

    if (name < 2) {
      setNameError("2글자 이상 입력하세요");
      return false;
    } else {
      setNameError("");
    }

    return true;
    e.preventDefault();
  }

  function onFormSubmit(e) {
    if (handleInputChange(e)) {
      setTabno(2);
    }
    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">이름</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className={"input " + (nameError.length > 0 ? "is-danger" : "")}
                name="name"
                type="name"
                placeholder="이름"
                defaultValue={name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
            <p className="help is-danger has-text-left">*필수항목입니다</p>
            <p className={"help " + (nameError.length > 0 ? "is-danger" : "")}>
              {nameError}
            </p>
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
  );
}

function SchoolEmptype({ setTabno, setValue, getValue }) {
  const [emptype, setEmptype] = useState(getValue);
  const [emptypeError, setEmptypeError] = useState("");

  function handleInputChange(e) {
    console.log(e.target.value);
    setEmptype(e.target.value);
    setValue(e.target.value);
    // e.preventDefault()
  }

  function onFormSubmit(e) {
    setTabno(3);
    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">고용유형</label>
        </div>
        <div className="field-body">
          <div className="field is-normal">
            <p className="control has-icons-left">
              <input
                className="is-checkradio"
                type="radio"
                name="emptype"
                id="emptype1"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value="0"
                checked={emptype === "0"}
              />
              <label htmlFor="emptype1">수당</label>
            </p>
            <p className="control has-icons-left">
              <input
                className="is-checkradio"
                type="radio"
                name="emptype"
                id="emptype2"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value="1"
                checked={emptype === "1"}
              />
              <label htmlFor="emptype2">봉급</label>
            </p>
            <p className="help is-danger has-text-left">*필수항목입니다</p>
            <p
              className={"help " + (emptypeError.length > 0 ? "is-danger" : "")}
            >
              {emptypeError}
            </p>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(1);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => onFormSubmit(e)}
          >
            <span className="icon is-small">
              <i className="fas fa-angle-right"></i>
            </span>
            <span>다음</span>
          </button>
        </div>
      </div>
    </form>
  );
}

function SchoolPhone({ setTabno, setValue, getValue, errorMsg }) {
  const [phone, setPhone] = useState(getValue);
  const [phoneError, setPhoneError] = useState(errorMsg);

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      if (e.target.tagName.toUpperCase() !== "FORM") {
        setPhone(e.target.value);
        setValue(e.target.value);
      }
    }

    if (!isPhone(phone)) {
      setPhoneError("전화번호 형식을 확인하세요");
      return false;
    } else {
      setPhoneError("");
    }
    return true;
  }

  function onFormSubmit(e) {
    if (handleInputChange(e)) {
      setTabno(4);
    }

    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">전화번호</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className={
                  "input " + (phoneError.length > 0 ? "is-danger" : "")
                }
                name="phone"
                placeholder="전화번호"
                defaultValue={phone}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-phone"></i>
              </span>
            </p>
            <p className="help is-danger has-text-left">*필수항목입니다</p>
            <p className={"help " + (phoneError.length > 0 ? "is-danger" : "")}>
              {phoneError}
            </p>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(2);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

function SchoolEmail({ setTabno, setValue, getValue, errorMsg }) {
  const [email, setEmail] = useState(getValue);
  const [emailError, setEmailError] = useState(errorMsg);

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setEmail(e.target.value);
      setValue(e.target.value);
    }

    if (!isEmail(email)) {
      setEmailError("이메일 형식을 확인하세요");
      return false;
    } else {
      setEmailError("");
    }
    return true;
  }

  function onFormSubmit(e) {
    if (handleInputChange(e)) {
      setTabno(5);
    }

    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">이메일</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className={
                  "input " + (emailError.length > 0 ? "is-danger" : "")
                }
                name="email"
                placeholder="이메일"
                defaultValue={email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
            <p className="help is-danger has-text-left">*필수항목입니다</p>
            <p className={"help " + (emailError.length > 0 ? "is-danger" : "")}>
              {emailError}
            </p>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(3);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

function SchoolAddr({ setTabno, setValue, getValue }) {
  const [latlng, setLatlng] = useState({ lat: 37.3595316, lng: 127.1052133 });
  const [addr, setAddr] = useState(getValue);
  const [addrError, setAddrError] = useState("");

  const navermaps = window.naver.maps;

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setAddr(e.target.value);
      setValue(e.target.value);
    }
    return true;
  }

  function onFormSubmit(e) {
    if (handleInputChange(e)) {
      setTabno(6);
    }

    e.preventDefault();
  }

  function searchAddressToCoordinate() {
    const url =
      "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" +
      addr +
      "&X-NCP-APIGW-API-KEY-ID=25bc7zdqpk&X-NCP-APIGW-API-KEY=1Sr8Q4tdx036hGUetN8GuABTU38ZDsIfijXxBekF";
    const config = {
      // headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `JWT ${localStorage.getItem('token')}`
      // }
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response);
        console.log(response.data.addresses[0].y);
        setLatlng({
          lat: response.data.addresses[0].y,
          lng: response.data.addresses[0].x,
        });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.detail === "Not found." &&
          err.response.status == 404
        ) {
        }
        // console.error("Error response:");
        // console.error(err.response.data);
        // console.error(err.response.status);
        // console.error(err.response.headers);
      });
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div>
        <NaverMap
          style={{
            width: "100%",
            height: "400px",
          }}
          center={latlng}
          defaultZoom={18}
          onCenterChanged={(center) =>
            setLatlng({ lat: center.y, lng: center.x })
          }
        >
          <Marker
            key={1}
            position={new navermaps.LatLng(latlng.lat, latlng.lng)}
            animation={2}
            onClick={() => {
              alert(getValue);
            }}
          />
        </NaverMap>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">주소</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className={"input " + (addrError.length > 0 ? "is-danger" : "")}
                name="addr"
                placeholder="주소"
                defaultValue={addr}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    searchAddressToCoordinate();
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-address-card"></i>
              </span>
            </p>
            <p className={"help " + (addrError.length > 0 ? "is-danger" : "")}>
              {addrError}
            </p>
          </div>
          <div className="field">
            <div className="control">
              <button
                type="button"
                className="button is-warning is-light"
                onClick={(e) => {
                  searchAddressToCoordinate();
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-arrow-left"></i>
                </span>
                <span>검색</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(4);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

function SchoolWebsite({ setTabno, setValue, getValue }) {
  const [website, setWebsite] = useState(getValue);
  const [websiteError, setWebsiteError] = useState("");

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setWebsite(e.target.value);
      setValue(e.target.value);
    }
  }

  function onFormSubmit(e) {
    setTabno(7);

    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">웹사이트</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className={
                  "input " + (websiteError.length > 0 ? "is-danger" : "")
                }
                name="website"
                placeholder="웹사이트"
                defaultValue={website}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-window-restore"></i>
              </span>
            </p>
            <p
              className={"help " + (websiteError.length > 0 ? "is-danger" : "")}
            >
              {websiteError}
            </p>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(5);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

function SchoolImage({ setTabno, setValue, getValue }) {
  const [image, setImage] = useState(getValue);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(null);

  function previewImage(file) {
    if (file !== null) {
      if (typeof file === "string") {
        setPreview(file);
      } else {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);

        oFReader.onload = function (oFREvent) {
          setPreview(oFREvent.target.result);
          // document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
      }
    }
  }

  useEffect(() => {
    previewImage(image);
  }, [image]);

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setImage(e.target.files[0]);
      setValue(e.target.files[0]);
    }
  }

  function onFormSubmit(e) {
    setTabno(8);

    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">이미지</label>
        </div>
        <div className="field-body">
          <div className="field">
            <img src={preview} />
            <p className="control has-icons-left">
              <input
                className={
                  "input " + (imageError.length > 0 ? "is-danger" : "")
                }
                type="file"
                name="image"
                placeholder="이미지"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-images"></i>
              </span>
            </p>
            <p className={"help " + (imageError.length > 0 ? "is-danger" : "")}>
              {imageError}
            </p>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(6);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

function SchoolDesc({ setTabno, setValue, getValue, submitFunc }) {
  const [desc, setDesc] = useState(getValue);
  const [descError, setDescError] = useState("");

  function handleInputChange(e) {
    if (e.target.tagName.toUpperCase() !== "FORM") {
      setDesc(e.target.value);
      setValue(e.target.value);
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    if (submitFunc()) {
    }
  }

  return (
    <form
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">소개</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <textarea
                className="textarea has-fixed-size"
                name="desc"
                placeholder="소개"
                defaultValue={desc}
                rows="5"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                ref={(input) => input && input.focus()}
              />
              <span className="icon is-small is-left">
                {/* <i className="fas fa-handshake"></i> */}
              </span>
            </p>
            {/* <p className={"help "+ (descError.length > 0 ? 'is-danger':'' )}>{descError}</p> */}
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right column">
        <div className="control">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={(e) => {
              setTabno(7);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>이전</span>
          </button>
        </div>

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
  );
}

export default AddRoleSchool;
