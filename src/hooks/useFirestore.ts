import { firebase } from "~/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Tasks } from "~/types"
import { User } from "firebase"

export function useFirestore(
  user?: User
): {
  issues?: Tasks[]
  progress?: Tasks[]
  review?: Tasks[]
  done?: Tasks[]
} {
  const db = firebase.firestore()
  const email = user?.email

  const [issues] = useCollectionData<Tasks>(
    db
      .collection(email ? email : "mail")
      .doc("Issues")
      .collection("posts"),
    { idField: "id" }
  )
  const [progress] = useCollectionData<Tasks>(
    db
      .collection(email ? email : "mail")
      .doc("Progress")
      .collection("posts"),
    { idField: "id" }
  )
  const [review] = useCollectionData<Tasks>(
    db
      .collection(email ? email : "mail")
      .doc("Review")
      .collection("posts"),
    { idField: "id" }
  )
  const [done] = useCollectionData<Tasks>(
    db
      .collection(email ? email : "mail")
      .doc("Done")
      .collection("posts"),
    { idField: "id" }
  )
  return {
    issues,
    progress,
    review,
    done,
  }
}
