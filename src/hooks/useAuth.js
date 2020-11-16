import React from "react"
import { getFirebase } from "../firebase/getFirebase"
import store from "store"

const useAuth = () => {
  const fb = getFirebase()

  const createUser = (type, email, password) => {
    if (type === "password") {
      store.set("firstLoginNeeded", true)
      return fb
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          user
            .updateProfile({
              displayName: email.split("@")[0],
            })
            .then(res => {
              fetch("/.netlify/functions/createUserInDatabase", {
                method: "POST",
                body: JSON.stringify({
                  uid: user.uid,
                  email: email,
                  displayName: email.split("@")[0],
                }),
              })
                .then(res => res.text())
                .then(text => text)
            })
        })
        .catch(err => err)
    }
  }

  const login = (type, email, password) => {
    return fb
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        store.remove("firstLoginNeeded")
        return res.user
      })
      .catch(err => console.log(err))
  }

  const signout = () => {
    fb.auth()
      .signOut()
      .then(res => console.log("User signed out"))
      .catch(err => console.log(err))
  }

  return { createUser, login, signout }
}

export default useAuth
