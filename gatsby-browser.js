import React from "react"

import { ModalProvier } from "./src/context/ModalContext"
import { AuthProvider } from "./src/context/AuthContext"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <ModalProvier>{element}</ModalProvier>
  </AuthProvider>
)
