import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, useObserver } from "mobx-react";

@inject("schoolStore")
@observer
class ListSchool extends React.Component<any, any> {
  componentDidMount() {
    const { schoolStore } = this.props;
    schoolStore.findAll({ page: 0 });
  }

  render() {
    const { schools } = this.props.schoolStore;
    if (schools) {
      return <SchoolList schools={schools} />;
    } else {
      return <></>;
    }
  }
}

const SchoolList = (props: any) => {
  const { schools } = props;
  return useObserver(() => (
    <ul>
      {schools.map((school: any) => (
        <SchoolItem key={school.id} school={school} />
      ))}
    </ul>
  ));
};

const SchoolItem = (props: any) => {
  const { id, data } = props.school;
  return useObserver(() => (
    // return (
    <li>
      <Link to={"/school/view/" + id}>{data.name}</Link>
    </li>
    // );
  ));
};

export default ListSchool;
