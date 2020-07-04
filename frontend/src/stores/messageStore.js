import { observable, action, computed, autorun } from "mobx";
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
    autorun(() => console.log(this.messages));
  }

  @action
  async findAll(params) {
    // const data = await MessageRepository.findAll(params);
    Firebase.getFirestore()
      .collection(this.collectionName)
      .orderBy("createdAt", "desc")
      .limit(this.limit)
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          data: docSnapshot.data(),
        }));
        this.messages = docs.map((doc) => new MessageModel(doc));
      })
      .catch(function (error) {
        console.error("Error getting document:", error);
      });

    // .onSnapshot((snapshot) => {
    //   const docs = snapshot.docs.map((docSnapshot) => ({
    //     id: docSnapshot.id,
    //     data: docSnapshot.data(),
    //   }));
    //   this.messages = docs.map((doc) => new MessageModel(doc));
    // });

    /*
    var unsubscribe = db.collection("cities")
    .onSnapshot(function (){
      // Respond to data
      // ...
    });

    // Later ...

    // Stop listening to changes
    unsubscribe();
    */
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

    await Firebase.getFirestore()
      .collection(this.collectionName)
      .add(newMessage)
      .then((docRef) => {
        console.log(docRef.id);

        this.messages.unshift(
          new MessageModel({ id: docRef.id, data: newMessage })
        );
        // this.messages = {
        //   ...this.messages,
        //   ...new MessageModel({ id: docRef.id, data: newMessage }),
        // };
        // return this.messages;
        console.log(this.messages);
      })
      .catch(function (error) {
        console.error("Error getting document:", error);
      });
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
  //   const val = Object.keys(this.messages || {}).map((key) => ({
  //     ...this.messages[key],
  //     id: key,
  //   }));

  //   console.log(val);
  //   // return val;
  // }
}
