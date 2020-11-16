import { styled } from "linaria/react"
import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { ModalContext } from "../context/ModalContext"
import useAuth from "../hooks/useAuth"
import store from "store"

import AuthIcon from "../assets/icons/auth.svg"

const User = () => {
  const { user, userData } = useContext(AuthContext)
  const { createUser, login, signout } = useAuth()
  const { handleModal } = useContext(ModalContext)

  return (
    <UserStyles>
      {user ? (
        <span onClick={() => signout()}>{user.displayName}</span>
      ) : (
        <React.Fragment>
          <div className="icon-link" onClick={() => handleModal(true, "auth")}>
            <AuthIcon />
          </div>
        </React.Fragment>
      )}
    </UserStyles>
  )
}

export default User

const UserStyles = styled.div`
  color: var(--c-text);
`
