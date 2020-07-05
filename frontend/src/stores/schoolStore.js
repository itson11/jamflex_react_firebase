import { observable, action, computed } from "mobx";
import { autobind } from "core-decorators";
import Firebase from "../components/Firebase/firebase";
import SchoolModel from "../models/schoolModel";

@autobind
class SchoolStore {
  @observable
  schools = null;
  @observable
  school = null;
  @observable
  limit = 15;
  collectionName = "schools";
  collectionName4Chief = "chiefs";
  collectionName4Teacher = "teachers";
  collectionName4Student = "students";
  collectionName4Study = "studies";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async findOne(id) {
    const schoolRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .get();
    this.school = {
      id: schoolRef.id,
      data: schoolRef.data(),
    };
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
        const docs = snapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            data: docSnapshot.data(),
          };
        });
        this.schools = docs.map((doc) => new SchoolModel(doc));
      })
      .catch(function (error) {
        console.error("Error getting document:", error);
      });
  }

  @action setSchools = (schools) => {
    this.schools = schools;
  };

  @action setSchool = (school, uid) => {
    if (!this.schools) {
      this.schools = {};
    }

    this.schools[uid] = user;
  };

  @action attachAsTeacher = async (id) => {
    const currentUser = Firebase.getCurrentUser();
    Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Teacher)
      .doc(currentUser.uid)
      .set({
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        providerId: currentUser.providerId,
      });
  };

  @action attachAsStudent = async (id) => {
    const currentUser = Firebase.getCurrentUser();
    Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Student)
      .doc(currentUser.uid)
      .set({
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        providerId: currentUser.providerId,
      });
  };

  // @action attachStudy = async(id) {
  //   const currentUser = Firebase.getCurrentUser();
  //   Firebase.getFirestore()
  //   .collection(this.collectionName)
  //   .doc(id)
  //   .collection(this.collectionName4Studies)
  //   .doc(currentUser.uid)
  //   .set({
  //     displayName: currentUser.displayName,
  //     photoURL: currentUser.photoURL,
  //     providerId: currentUser.providerId,
  //   });
  // }

  @action add = async (school) => {
    const currentUser = Firebase.getCurrentUser();
    if (!this.schools) {
      this.schools = {};
    }
    school.createdAt = new Date();
    school.uid = currentUser.uid;
    school.author = currentUser.displayName;

    const schoolRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .add(school);
    const chiefRef = await schoolRef
      .collection(this.collectionName4Chief)
      .doc(currentUser.uid)
      .set({
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        providerId: currentUser.providerId,
      });
    return chiefRef;
  };

  // @computed get schoolList() {
  //   return Object.keys(this.schools || {}).map((key) => ({
  //     ...this.schools[key],
  //     uid: key,
  //   }));
  // }
}

export default SchoolStore;
