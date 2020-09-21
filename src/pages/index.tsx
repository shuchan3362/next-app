import React, { useEffect, useMemo, useState } from "react"
import { firebase } from "~/firebase"
import Link from "next/link"

const Home: React.FC = () => {
  const [newEmail, setNewEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [loginEmail, setLoginEmail] = useState<string>("")
  const [loginPassword, setLoginPassword] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const auth = firebase.auth()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await auth
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then(() => {
        auth.currentUser?.updateProfile({
          displayName: displayName,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((err) => console.log(err))
  }

  const user = auth.currentUser
  const [loginUser, setLoginUser] = useState<string>("")
  console.log(loginUser)
  useEffect(() => {
    if (user?.displayName) {
      setLoginUser(user.displayName)
    }
  }, [user])

  // const loginUser = useMemo(() => {
  //   return user?.displayName ? user?.displayName : ""
  // }, [user])

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("successfully signout")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteAccount = () => {
    user
      ?.delete()
      .then(() => {
        console.log("successfully delete your account")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSignIn(e)}>
        <p>ユーザーネーム</p>
        <input
          name="userName"
          type="text"
          value={displayName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayName(e.target.value)
          }}
        />
        <p>email</p>
        <input
          name="email"
          type="text"
          value={newEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEmail(e.target.value)
          }
        />
        <p>password</p>
        <input
          name="password"
          type="password"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
        <button type="submit" />
      </form>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}>
        <p>ログインメール</p>
        <input
          name="email"
          type="text"
          value={loginEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginEmail(e.target.value)
          }
        />
        <p>ログインパスワード</p>
        <input
          name="password"
          type="password"
          value={loginPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginPassword(e.target.value)
          }
        />
        <button type="submit" />
      </form>
      <div>
        <button onClick={signOut}>ログアウト</button>
      </div>
      <div>
        <button onClick={deleteAccount}>アカウント削除</button>
      </div>
      <div>
        <Link href={`/user/${loginUser}`}>{loginUser}</Link>
      </div>
    </div>
  )
}

export default Home
