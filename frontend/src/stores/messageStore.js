import { observable, action, computed } from "mobx";
import { autobind } from "core-decorators";
import MessageRepository from "../repositories/messageRepository";
import MessageModel from "../models/messageModel";
import Firebase from "../components/Firebase/firebase";

@autobind
export default class MessageStore {
  @observable
  messages = [];
  @observable
  limit = 15;
  collectionName = "messages";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async findAll(params) {
    // const data = await MessageRepository.findAll(params);
    Firebase.getFirestore()
      .collection(this.collectionName)
      .orderBy("createdAt", "desc")
      .limit(this.limit)
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          data: docSnapshot.data(),
        }));
        this.messages = docs.map((doc) => new MessageModel(doc));
      });
  }

  @action
  async add(message) {
    const createdAt = new Date();
    const currentUser = Firebase.getCurrentUser();
    const newMessage = {
      uid: currentUser.uid,
      author: currentUser.displayName,
      createdAt,
      message,
    };
    const docRef = Firebase.getFirestore()
      .collection(this.collectionName)
      .add(newMessage);

    console.log(docRef);
    this.messages.push(new MessageModel({ id: docRef.id, data: newMessage }));
  }

  @action
  remove(index) {
    this.messages.splice(index, 1);
  }

  @action
  set = (messages) => {
    this.messages = messages;
  };

  @action setLimit = (limit) => {
    this.limit = limit;
  };

  // @computed get messages() {
  //   return Object.keys(this.messages || {}).map((key) => ({
  //     ...this.messages[key],
  //     uid: key,
  //   }));
  // }
}
