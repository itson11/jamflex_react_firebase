import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject } from "mobx-react";

enum EMP_TYPE {
  "수당" = "수당",
  "월급" = "월급",
}
interface SchoolState {
  name: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  emptype: EMP_TYPE;
  ratio_school: number;
  ratio_teacher: number;
}

@inject("schoolStore")
class EditSchool extends Component<any, SchoolState> {
  public state: SchoolState = {
    name: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    emptype: EMP_TYPE.수당,
    ratio_school: 50,
    ratio_teacher: 50,
  };
  constructor(props: any) {
    super(props);
    console.debug(props);
  }
  submit(e: any) {
    e.preventDefault();
    const school = this.state;
    this.props.schoolStore.add(school);
  }
  componentDidMount() {
    this.props.schoolStore.findOne(this.props.match.params.id);
  }
  render() {
    return (
      <section className="has-background-white">
        <div className="container bd-lead">
          {/* {this.state.isJoin && <Redirect to="/" />}  */}
          <section className="hero is-warning is-bold">
            <div className="hero-body">
              <div className="container has-text-centered">
                <div className="column is-8 is-offset-2">
                  <h3 className="title has-text-white">학원 추가</h3>
                  <hr className="login-hr" />
                  <p className="subtitle has-text-white">
                    필수 입력 정보를 입력하고 가입을 완료하세요.
                  </p>
                  <div className="bd-snippet-preview">
                    <form
                      onSubmit={(e) => {
                        this.submit(e);
                      }}
                    >
                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">이름</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <p className="control is-expanded has-icons-left">
                              <input
                                className="input"
                                type="text"
                                placeholder="이름"
                                value={this.state.name}
                                onChange={(e) =>
                                  this.setState({ name: e.target.value })
                                }
                              />
                              <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">전화번호</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <p className="control is-expanded has-icons-left">
                              <input
                                className="input"
                                type="text"
                                placeholder="전화번호"
                                value={this.state.phone}
                                onChange={(e) =>
                                  this.setState({ phone: e.target.value })
                                }
                              />
                              <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">웹사이트</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <p className="control is-expanded has-icons-left">
                              <input
                                className="input"
                                type="text"
                                placeholder="웹사이트"
                                value={this.state.website}
                                onChange={(e) =>
                                  this.setState({ website: e.target.value })
                                }
                              />
                              <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">주소</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <p className="control is-expanded has-icons-left">
                              <input
                                className="input"
                                type="text"
                                placeholder="주소"
                                value={this.state.address}
                                onChange={(e) =>
                                  this.setState({ address: e.target.value })
                                }
                              />
                              <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">소개</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <textarea
                                className="textarea"
                                placeholder="소개"
                                value={this.state.description}
                                onChange={(e) =>
                                  this.setState({ description: e.target.value })
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label">
                          <label className="label">고용유형</label>
                        </div>
                        <div className="field-body">
                          <div className="field is-narrow">
                            <div className="control">
                              <label className="radio">
                                <input
                                  type="radio"
                                  name="member"
                                  value={EMP_TYPE.수당}
                                  onChange={(e) =>
                                    this.setState({
                                      emptype: EMP_TYPE.수당,
                                    })
                                  }
                                />
                                {EMP_TYPE.수당}
                              </label>
                              <label className="radio">
                                <input
                                  type="radio"
                                  name="member"
                                  value={EMP_TYPE.월급}
                                  onChange={(e) =>
                                    this.setState({
                                      emptype: EMP_TYPE.월급,
                                    })
                                  }
                                />
                                {EMP_TYPE.월급}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">학원비율</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                // placeholder="소개"
                                value={this.state.ratio_school}
                                onChange={(e) =>
                                  this.setState({
                                    ratio_school: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">강사비율</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                // placeholder="소개"
                                value={this.state.ratio_teacher}
                                onChange={(e) =>
                                  this.setState({
                                    ratio_teacher: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <p className="help is-danger">
                              This field is required
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="field is-horizontal">
                        <div className="field-label"></div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <button className="button is-primary">
                                Send message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default EditSchool;
