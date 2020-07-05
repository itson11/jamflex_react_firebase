import { observable, action, computed } from "mobx";
import { autobind } from "core-decorators";
import Firebase from "../components/Firebase/firebase";
import SchoolModel from "../models/schoolModel";
import ChiefModel from "../models/chiefModel";

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

    this.school = new SchoolModel({
      id: schoolRef.id,
      data: schoolRef.data(),
    });

    const chiefsRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Chief)
      .get();
    let chiefs = {};
    if (chiefsRef.docs.length > 0)
      chiefs = chiefsRef.docs.map((chiefRef) => {
        return new ChiefModel({
          id: chiefRef.id,
          data: chiefRef.data(),
        });
      });
    this.school = { ...{ chiefs }, ...this.school };

    const teachersRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Teacher)
      .get();
    let teachers = {};
    if (teachersRef.docs.length > 0)
      teachers = teachersRef.docs.map((teacherRef) => {
        return new TeacherModel({
          id: teacherRef.id,
          data: teacherRef.data(),
        });
      });
    this.school = { ...{ teachers }, ...this.school };

    const studentsRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Student)
      .get();
    let students = {};
    if (studentsRef.docs.length > 0)
      students = studentsRef.docs.map((studentRef) => {
        return new StudentModel({
          id: studentRef.id,
          data: studentRef.data(),
        });
      });
    this.school = { ...{ students }, ...this.school };

    const studiesRef = await Firebase.getFirestore()
      .collection(this.collectionName)
      .doc(id)
      .collection(this.collectionName4Study)
      .get();
    let studies = {};
    if (studiesRef.docs.length > 0)
      studies = studiesRef.docs.map((studieRef) => {
        return new StudyModel({
          id: studieRef.id,
          data: studieRef.data(),
        });
      });
    this.school = { ...{ studies }, ...this.school };

    // this.school = new SchoolModel({
    //   id: schoolRef.id,
    //   data: schoolRef.data(),
    //   chiefs,
    // });
  }

  @action
  async findAll(params) {
    // const data = await MessageRepository.findAll(params);
    Firebase.getFirestore()
      .collection(this.collectionName)
      .orderBy("createdAt", "desc")
      .limit(this.limit)
      .get()
      .then((schoolsRef) => {
        this.schools = schoolsRef.docs.map((schoolRef) => {
          return new SchoolModel({
            id: schoolRef.id,
            data: schoolRef.data(),
          });
        });
        // this.schools = docs.map((doc) => new SchoolModel(doc));
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
