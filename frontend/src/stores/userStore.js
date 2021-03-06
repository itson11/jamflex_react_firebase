import { observable, action, computed } from "mobx";
import Firebase from "../components/Firebase/firebase";

class UserStore {
  @observable
  users = null;
  collectionName = "users";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUsers = (users) => {
    this.users = users;
  };

  @action setUser = (user, uid) => {
    if (!this.users) {
      this.users = {};
    }

    this.users[uid] = user;
  };

  @action create = (user) => {
    if (!this.users) {
      this.users = {};
    }

    Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(user.sub)
      .set(user);
  };

  @computed get userList() {
    return Object.keys(this.users || {}).map((key) => ({
      ...this.users[key],
      uid: key,
    }));
  }
}

export default UserStore;
