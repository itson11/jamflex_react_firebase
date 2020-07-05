import React from "react";
import { inject, observer, useObserver } from "mobx-react";
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
        <div>
          <School school={school} />
          <ChiefList chiefs={school.chiefs} />
          <TeacherList teachers={school.teachers} />
          <StudentList students={school.students} />
          <StudyList studies={school.studies} />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

const School = (props: any) => {
  const { school } = props;
  return useObserver(() => (
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
  ));
};

const ChiefList = (props: any) => {
  const { chiefs } = props;
  console.log(chiefs);
  if (chiefs) {
    return useObserver(() => (
      <div>
        <h3>관리자리스트</h3>
        <ul>
          {chiefs.length > 0 &&
            chiefs.map((chief: any) => {
              return <Chief key={chief.id} chief={chief} />;
            })}
        </ul>
      </div>
    ));
  } else {
    return <>no Chiefs here</>;
  }
};

const Chief = (props: any) => {
  const { chief } = props;

  return useObserver(() => <li>{chief.data.displayName}</li>);
};

const TeacherList = (props: any) => {
  const { teachers } = props;
  if (teachers) {
    return useObserver(() => (
      <div>
        <h3>강사리스트</h3>
        <ul>
          {teachers.length > 0 &&
            teachers.map((teacher: any) => {
              return <Teacher key={teacher.id} teacher={teacher} />;
            })}
        </ul>
      </div>
    ));
  } else {
    return <>no Teachers here</>;
  }
};

const Teacher = (props: any) => {
  const { teacher } = props;

  return useObserver(() => <li>{teacher.data.displayName}</li>);
};

const StudentList = (props: any) => {
  const { students } = props;
  if (students) {
    return useObserver(() => (
      <div>
        <h3>학생리스트</h3>
        <ul>
          {students.length > 0 &&
            students.map((student: any) => {
              return <Student key={student.id} student={student} />;
            })}
        </ul>
      </div>
    ));
  } else {
    return <>no Students here</>;
  }
};

const Student = (props: any) => {
  const { student } = props;

  return useObserver(() => <li>{student.data.displayName}</li>);
};

const StudyList = (props: any) => {
  const { studies } = props;
  if (studies) {
    return useObserver(() => (
      <div>
        <h3>수업리스트</h3>
        <ul>
          {studies.length > 0 &&
            studies.map((study: any) => {
              return <Study key={study.id} study={study} />;
            })}
        </ul>
      </div>
    ));
  } else {
    return <>no Studies here</>;
  }
};

const Study = (props: any) => {
  const { study } = props;

  return useObserver(() => <li>{study.data.displayName}</li>);
};

export default ViewSchool;
