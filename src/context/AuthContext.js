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
        }
        setUser(u)
        if (!userData && !store.get("firstLoginNeeded")) {
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
        setUser(null)
        setUserData(null)
        store.remove("user")
        store.remove("userData")
        console.log("[DEBUG/AuthContext] no user")
      }
      return "lol"
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: user ? user : null, userdata: userData ? userData : null }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
