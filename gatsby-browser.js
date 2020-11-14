import React from "react"
import { AuthProvider } from "./src/context/AuthContext"
import { ModalProvier } from "./src/context/ModalContext"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <ModalProvier>{element}</ModalProvier>
  </AuthProvider>
)
