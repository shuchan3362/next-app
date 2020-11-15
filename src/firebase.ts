import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))
  }
} else {
  console.warn("NEXT_PUBLIC_FIREBASE_CONFIG が未設定です")
}

export { firebase }
