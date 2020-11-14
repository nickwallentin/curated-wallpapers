import React, { useState } from "react"

import store from "store"

const AuthContext = React.createContext()
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export default AuthContext
