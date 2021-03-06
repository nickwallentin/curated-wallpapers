import React, { useContext } from "react"

import AuthContext from "../context/AuthContext"
import AuthIcon from "../assets/icons/auth.svg"
import { ModalContext } from "../context/ModalContext"
import store from "store"
import { styled } from "linaria/react"
import useAuth from "../hooks/useAuth"

const User = () => {
  const auth = useContext(AuthContext)
  const user = auth && auth.user
  const userData = auth && auth.userdata
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
