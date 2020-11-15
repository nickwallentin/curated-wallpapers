import { styled } from "linaria/react"
import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import useAuth from "../hooks/useAuth"

const Auth = () => {
  const user = useContext(AuthContext)
  const { createUser, login, signout } = useAuth()

  return (
    <AuthStyles>
      {user ? (
        <span onClick={() => signout()}>{user.displayName}</span>
      ) : (
        <React.Fragment>
          <span
            onClick={() =>
              login("password", "nikwallentin@gmail.com", "123456")
            }
          >
            Login
          </span>
          <span
            onClick={() =>
              createUser("password", "nikwallentin@gmail.com", "123456")
            }
          >
            Register
          </span>
        </React.Fragment>
      )}
    </AuthStyles>
  )
}

export default Auth

const AuthStyles = styled.div`
  color: var(--c-text);
`
