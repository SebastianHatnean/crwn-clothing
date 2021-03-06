import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA6gwrXNc9hTrmkpIBHbOW4Q4JZZuKQTJw',
  authDomain: 'crwn-db-53d11.firebaseapp.com',
  databaseURL: 'https://crwn-db-53d11.firebaseio.com',
  projectId: 'crwn-db-53d11',
  storageBucket: 'crwn-db-53d11.appspot.com',
  messagingSenderId: '316031829386',
  appId: '1:316031829386:web:611af26e08e7b84765f473',
  measurementId: 'G-8F3D7Z5SJG'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
