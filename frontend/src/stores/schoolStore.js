import { observable, action, computed } from "mobx";
import Firebase from "../components/Firebase/firebase";

class SchoolStore {
  @observable
  schools = null;
  collectionName = "schools";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setSchools = (schools) => {
    this.schools = schools;
  };

  @action setSchool = (user, uid) => {
    if (!this.schools) {
      this.schools = {};
    }

    this.schools[uid] = user;
  };

  @action create = (user) => {
    if (!this.schools) {
      this.schools = {};
    }

    Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(user.sub)
      .set(user);
  };

  @computed get userList() {
    return Object.keys(this.schools || {}).map((key) => ({
      ...this.schools[key],
      uid: key,
    }));
  }
}

export default SchoolStore;
