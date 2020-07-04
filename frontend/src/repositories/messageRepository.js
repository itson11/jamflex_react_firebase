import Firebase from "../components/Firebase/firebase";

class MessageRepository {
  collectionName = "messages";

  messages = [];
  limit = 10;

  constructor() {}

  findAll(params) {
    return Firebase.getFirestore()
      .collection(this.collectionName)
      .orderBy("createdAt")
      .limit(this.limit);
  }

  findOne(messageId) {
    return this.firebase
      .getFirestore()
      .collection(collectionName)
      .doc(messageId);
  }
}
// 싱글톤으로 리턴
export default new MessageRepository();
