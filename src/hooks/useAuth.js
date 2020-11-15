import React, { useContext, useState } from "react"
import { getFirebase } from "../firebase/getFirebase"
import AuthContext from "../context/AuthContext"

const useAuth = () => {
  const fb = getFirebase()
  const auth = fb.auth()
  const db = fb.firestore()
  const currentUser = useContext(AuthContext)
  const [user, setUser] = useState(currentUser ? currentUser : null)

  const createUser = (type, email, password) => {
    if (type === "password") {
      auth
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
                .then(text => console.log(text))
            })
        })
        .then(res => {
          signout()
        })
        .catch(err => console.log(err))
    }
  }

  const login = (type, email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => console.log("Signed in"))
      .catch(err => console.log(err))
  }

  const signout = () => {
    auth
      .signOut()
      .then(res => console.log("User signed out"))
      .catch(err => console.log(err))
  }

  return { createUser, login, signout }
}

export default useAuth