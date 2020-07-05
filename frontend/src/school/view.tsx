import React from "react";
import { inject, observer } from "mobx-react";
import SchoolStore from "../stores/schoolStore";

@inject("schoolStore")
@observer
class ViewSchool extends React.Component<any, any> {
  componentDidMount() {
    this.props.schoolStore.findOne(this.props.match.params.id);
  }
  render() {
    const { schoolStore } = this.props;
    if (schoolStore && schoolStore.school) {
      const { school } = schoolStore;
      return (
        <dl>
          <dt>ID</dt>
          <dd>{school.id}</dd>
          <dt>이름</dt>
          <dd>{school.data.name}</dd>
          <dt>전화번호</dt>
          <dd>{school.data.phone}</dd>
          <dt>주소</dt>
          <dd>{school.data.address}</dd>
          <dt>소개</dt>
          <dd>{school.data.description}</dd>
          <dt>고용유형</dt>
          <dd>{school.data.emptype}</dd>
          <dt>학원비율</dt>
          <dd>{school.data.ratio_school}</dd>
          <dt>강사비율</dt>
          <dd>{school.data.ratio_teacher}</dd>
        </dl>
      );
    } else {
      return <></>;
    }
  }
}

export default ViewSchool;
