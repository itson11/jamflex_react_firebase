let _messagesDb = null;

class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBA4DEGxlO59laqA5vFp91oDZs5pffdAf4",
      authDomain: "jamflex-1fe2e.firebaseapp.com",
      projectId: "jamflex-1fe2e",
    });

    // initialize Firestore through Firebase
    _messagesDb = firebase.firestore();

    // disable deprecated features
    _messagesDb.settings({
      timestampsInSnapshots: true,
    });
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

export default firebaseClient = new Firebase();
