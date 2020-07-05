import SessionStore from "./sessionStore";
import UserStore from "./userStore";
import MessageStore from "./messageStore";
import SchoolStore from "./schoolStore";

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
    this.schoolStore = new SchoolStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
