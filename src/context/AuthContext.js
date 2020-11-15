import React, { useState } from "react"
import { getFirebase } from "../firebase/getFirebase"
import store from "store"

const AuthContext = React.createContext()
export const AuthProvider = ({ children }) => {
  const firebase = getFirebase()
  const [user, setUser] = useState(store.get("user"))
  const [userData, setUserData] = useState(store.get("userData"))

  if (firebase) {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        if (!user) {
          store.set("user", u)
          setUser(u)
        }
        console.log(u.uid)
        if (!userData) {
          fetch("/.netlify/functions/getAuthUserData", {
            method: "POST",
            body: JSON.stringify(u.uid),
          })
            .then(res => res.json())
            .then(json => {
              store.set("userData", json)
            })
            .catch(err => console.log(err))
        }

        return "lol"
      } else {
        store.clearAll()
        setUser(null)
        store.remove("user")
        store.remove("userData")
        console.log("[DEBUG/AuthContext] no user")
      }
      return "lol"
    })
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthContext
