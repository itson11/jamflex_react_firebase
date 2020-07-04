import firebase from "firebase";
let _messagesDb = null;

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  // databaseURL: process.env.FIREBASE_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();

    // firebase.initializeApp({
    //   apiKey: process.env.FIREBASE_APP_API_KEY, //"AIzaSyBA4DEGxlO59laqA5vFp91oDZs5pffdAf4",
    //   authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN, //"jamflex-1fe2e.firebaseapp.com",
    //   projectId: process.env.FIREBASE_APP_PROJECT_ID, //"jamflex-1fe2e",
    // });

    // initialize Firestore through Firebase
    _messagesDb = firebase.firestore();

    // disable deprecated features
    // _messagesDb.settings({});
  }

  getFirestore() {
    return firebase.firestore();
  }

  async addMessage(message) {
    const createdAt = new Date();
    const author = firebase.auth().currentUser.displayName;
    return await _messagesDb.collection("messages").add({
      author,
      createdAt,
      message,
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async updateProfile(profile) {
    if (!firebase.auth().currentUser) return;
    await firebase.auth().currentUser.updateProfile({
      displayName: profile.name,
      photoURL: profile.picture,
    });
  }

  async signOut() {
    await firebase.auth().signOut();
  }

  setAuthStateListener(listener) {
    firebase.auth().onAuthStateChanged(listener);
  }

  setMessagesListener(listener) {
    _messagesDb
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot(listener);
  }

  async setToken(token) {
    await firebase.auth().signInWithCustomToken(token);
  }
}

// const firebaseClient = new Firebase();
export default new Firebase();
