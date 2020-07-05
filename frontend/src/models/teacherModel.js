import { observable, action, computed, extendObservable } from "mobx";
import { autobind } from "core-decorators";

@autobind
class teacherModel {
  constructor(data) {
    extendObservable(this, data);
  }

  // @computed
  // get messageWithId() {
  //   return `${this.id}(${this.message})`;
  // }

  @action
  change(data) {
    this.data = data;
  }

  // 렌더링 대상이 아니면 @computed는 필요없다.
  isActive() {
    return this.status === "ACTIVE";
  }
}

export default teacherModel;
