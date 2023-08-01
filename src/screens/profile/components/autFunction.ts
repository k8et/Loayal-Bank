import {
  collection,
  doc, getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../../../config/firebase";
import { PassportData } from "../../../types/PassportData";
import { Dispatch, SetStateAction } from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { UserDataTypes } from "../../../types/UserDataTypes";

export const handlePassportData = (
  user: string | undefined,
  setPassportData: Dispatch<SetStateAction<PassportData[]>>
) => {
  if (user) {
    const q = query(collection(db, "passportData"), where("uid", "==", user));
    return onSnapshot(q, (querySnapshot) => {
      const data: PassportData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as PassportData);
      });
      setPassportData(data);
    });
  }
};
export const handelDownloadImg = (user: string | undefined) => {
  if (user) {
    const storageRef = ref(storage, `images/${user}.jpg`);
    getDownloadURL(storageRef)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
};
export const handleUserData = (
  setUserData: Dispatch<SetStateAction<UserDataTypes>>
) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const q = query(collection(db, "users"), where("userId", "==", userId));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          const docData = doc.data();
          setUserData((prevState) => ({
            ...prevState,
            name: docData.name,
            lastName: docData.lastName,
            phone: docData.phone,
          }));
        });
      });
    } else {
      console.log("User not authenticated");
    }
  });
  return () => unsubscribe();
};
export const updateEmails = (
  oldPassword: string,
  email: string,
  t: (key: string) => string
) => {
  const user = auth.currentUser;

  if (user && user.email && oldPassword) {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, email)
          .then(() => {
            console.log(t("profile.emailUpdated"));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export const updatePasswords = (
  oldPassword: string,
  password: string,
  t: (key: string) => string
) => {
  const user = auth.currentUser;

  if (user && user.email && oldPassword) {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, password)
          .then(() => {
            console.log(t("profile.passwordUpdated"));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export const uploadPassportData = (
  passportSeries: string,
  passportNumber: string,
  passportIssueDate: string,
  passportIssuedBy: string,
  username:string,
  surname:string,
  setModalOpen:Dispatch<SetStateAction<boolean>>
) => {
  const user = auth.currentUser;

  if (user) {
    const passportData = {
      series: passportSeries,
      number: passportNumber,
      issueDate: passportIssueDate,
      issuedBy: passportIssuedBy,
      uid: user.uid,
    };

    addPassportData(user.uid, username, surname, passportData).then(() => {
      setModalOpen(false);
    });
  }
};

export const addPassportData = async (
  userId: string,
  name: string,
  surname: string,
  passportData: object
) => {
  const docRef = doc(db, "passportData", userId);

  await setDoc(docRef, {
    name: name,
    surname: surname,
    ...passportData,
  });
};
export const uploadFile = (selectedFile:File | null,setSelectedFile:Dispatch<SetStateAction< File | null>>) => {
  if (selectedFile) {
    const storageRef = ref(storage, `images/${auth.currentUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setSelectedFile(null);

            const userId = auth.currentUser?.uid;
            const q = query(
                collection(db, "users"),
                where("userId", "==", userId)
            );

            getDocs(q).then((querySnapshot) => {
              querySnapshot.forEach((docSnapshot) => {
                const docRef = doc(db, "users", docSnapshot.id);
                setDoc(docRef, { imageUrl: url }, { merge: true }).then(
                    (r) => r
                );
              });
            });
          });
        }
    );
  }
};
