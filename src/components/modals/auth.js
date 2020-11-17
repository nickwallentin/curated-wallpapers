import React, { useContext, useState } from "react"

import LoadingIcon from "../../assets/icons/loading.svg"
import { ModalContext } from "../../context/ModalContext"
import SuccessIcon from "../../assets/icons/success.svg"
import _debounce from "lodash/debounce"
import { motion } from "framer-motion"
import store from "store"
import { styled } from "linaria/react"
import useAuth from "../../hooks/useAuth"

const AuthModal = () => {
  const { handleModal } = useContext(ModalContext)
  const [view, setView] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(null)
  const { login, createUser, signout } = useAuth()

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    if (view === "login") {
      const user = await login("password", email, password)
      setUser(user)
      setLoading(false)
      setSuccess(true)
      const nextStep = _debounce(() => handleModal(), 1000)
      nextStep()
    } else if (view === "signup") {
      const user = await createUser("password", email, password)
      signout()
      setLoading(false)
      setSuccess(false)
      setView("login")
    }
  }

  const renderAuthText = () => {
    if (store.get("firstLoginNeeded") && view === "login") {
      return (
        <span className="success">
          <SuccessIcon /> Account created, please login
        </span>
      )
    } else if (view === "login") {
      return "Login to your account"
    }

    if (view === "signup") {
      return "Create your account"
    }
  }

  return (
    <AuthModalStyles>
      {success ? (
        <motion.div
          className="modal-state"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <SuccessIcon
            style={{ width: "46px", height: "46px" }}
            className="success"
          />
          <strong>Welcome {user.displayName}</strong>
        </motion.div>
      ) : loading ? (
        <motion.div
          className="modal-state"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            initial={{ rotate: 0 }}
            transition={{ loop: Infinity, duration: 1 }}
            style={{ width: "46px", height: "46px" }}
          >
            <LoadingIcon className="loading" />
          </motion.span>
          <strong>
            {view === "login" ? "Logging you in" : "Creating account"}
          </strong>
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="modal-nav">
            <div className="modal-nav-options">
              <span
                className={view === "login" ? "active" : null}
                onClick={() => setView("login")}
              >
                Login
              </span>
              <span
                className={view === "signup" ? "active" : null}
                onClick={() => setView("signup")}
              >
                Signup
              </span>
            </div>
          </div>
          <div className="modal-auth-text">
            <p>{renderAuthText()}</p>
          </div>
          <div className="modal-auth">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="input-group">
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  value={email}
                />
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  value={password}
                />
                <button
                  className={email && password ? null : "disabled"}
                  type="submit"
                >
                  {view === "login" ? "Login" : "Create account"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AuthModalStyles>
  )
}

export default AuthModal

const AuthModalStyles = styled.div`
  padding: 2rem;
  color: var(--c-text);
  .modal-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      &.success {
        path {
          fill: var(--c-success);
        }
      }
      width: 46px;
      height: 46px;
      margin-bottom: 1rem;
      path {
        fill: var(--c-text);
      }
    }
  }
  .modal-nav {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    .modal-nav-options {
      display: flex;
      border-radius: 99px;
      overflow: hidden;
      span {
        cursor: pointer;
        display: flex;
        padding: 0.5rem 1.2rem;
        text-align: center;
        font-family: "Inter Medium";
        background: var(--c-bg-backdrop);
        font-size: 0.8rem;
        line-height: 0.8rem;
        &:not(:last-of-type) {
          border-right: 1px solid var(--c-bg-secondary);
        }
        &.active {
          background: var(--c-action);
          color: white;
        }
      }
    }
  }
  .modal-auth-text {
    font-family: "Inter Medium";
    text-align: center;
    display: flex;
    justify-content: center;
    .success {
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        path {
          fill: var(--c-success);
        }
      }
    }
  }
  form {
    margin: 0px;
    .input-group {
      border-radius: var(--b-radius);
      overflow: hidden;
    }
    input {
      color: var(--c-text);
      width: 100%;
      background: var(--c-bg-backdrop);
      padding: 1rem;
      border: none;
      outline: none;

      &:not(:last-of-type) {
        border-bottom: 1px solid var(--c-bg-secondary);
      }
    }
    button {
      &.disabled {
        opacity: 0.3;
      }
      cursor: pointer;
      background: var(--c-action);
      display: block;
      width: 100%;
      border-radius: var(--b-radius);
      border: none;
      color: white;
      padding: 0.8rem;
      font-family: "Inter Medium";
      margin-top: 1rem;
      opacity: 0.9;
      &:not(.disabled):hover {
        opacity: 1;
      }
    }
  }
`
