import React, { useState } from "react"
import { firebase } from "~/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { User, auth } from "firebase"
import { useRouter } from "next/router"

export function useAuth(): {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>, url: string) => void
  deleteAccount: (e: React.FormEvent<HTMLFormElement>) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>, url: string) => void
  signOut: () => void
  resetPassword: (e: React.FormEvent<HTMLFormElement>) => void
  user?: User
  loading: boolean
  error?: auth.Error
  loginErr: string
  signUpErr: string
} {
  const auth = firebase.auth()
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  const [signUpErr, setSignUpErr] = useState<string>("")
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string
  ) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const email = target.email.value
    const password = target.password.value
    const userName = target.userName.value
    console.log(url)
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.currentUser?.updateProfile({
          displayName: userName,
        })
      })
      .then(() => {
        router.push("/") //もともといたページにリダイレクトしたい
      })
      .catch((err) => {
        console.log(err)
        setSignUpErr(err.code)
      })
  }

  const [loginErr, setLoginErr] = useState<string>("")
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string
  ) => {
    console.log(url)
    const target = e.target as HTMLFormElement
    const email = target.email.value
    const password = target.password.value
    e.preventDefault()
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("successfully login")
        return
        // router.push("/")
        //もともといたページにリダイレクトしたい
      })
      .catch((err) => {
        console.log(err)
        setLoginErr(err.code)
        return
      })
  }

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

  const deleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const password = target.password.value
    const email = user?.email as string
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    )
    await user
      ?.reauthenticateWithCredential(credential as auth.AuthCredential)
      .then(() => {
        user?.delete()
      })
      .then(() => {
        console.log("successfully delete your account")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const email: string = target.email.value
    auth
      .sendPasswordResetEmail(email)
      .then(function (mail) {
        // Email sent.
        console.log(mail)
      })
      .catch(function (error) {
        // An error happened.
        console.log(`${error}が発生`)
      })
  }

  return {
    handleSignUp,
    deleteAccount,
    handleLogin,
    signOut,
    resetPassword,
    user,
    loading,
    error,
    loginErr,
    signUpErr,
  }
}
