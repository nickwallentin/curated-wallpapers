import React, { useContext } from "react"

import AuthModal from "./modals/auth"
import CloseIcon from "../assets/icons/close.svg"
import CreditModal from "./modals/credit"
import { ModalContext } from "../context/ModalContext"
import ReactDOM from "react-dom"
import UploadModal from "./modals/upload"
import { motion } from "framer-motion"
import { styled } from "linaria/react"

const Modal = () => {
  const { modal, modalType, handleModal, modalContent } = useContext(
    ModalContext
  )

  if (modal) {
    return ReactDOM.createPortal(
      <React.Fragment>
        <Overlay
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          onClick={() => handleModal()}
        />
        <ModalStyles
          animate={{ opacity: 1, y: "-50%", x: "-50%" }}
          initial={{ opacity: 0, y: "50%", x: "-50%" }}
        >
          {/*<div className="close-modal">
            <CloseIcon onClick={() => handleModal()} />
    </div>*/}
          {modalType === "credit" && (
            <CreditModal
              handleModal={handleModal}
              modalContent={modalContent}
            />
          )}
          {modalType === "upload" && <UploadModal />}
          {modalType === "auth" && <AuthModal />}
        </ModalStyles>
      </React.Fragment>,
      document.querySelector("#main")
    )
  } else return null
}

export default Modal

const ModalStyles = styled(motion.div)`
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 500px;
  width: 100%;
  background: var(--c-bg-backdrop);
  color: var(--c-text);
  backdrop-filter: blur(30px);
  border-radius: var(--b-radius);
  overflow: hidden;

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: var(--b-radius);
  font-size: 0.9rem;
  .modal-header,
  .modal-content {
    padding: 1rem;
    @media (min-width: 600px) {
      padding: 2rem;
    }
  }

  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    svg {
      path {
        fill: var(--c-text) !important;
      }
    }
  }

  .modal-credit {
    padding: 2rem;
    svg {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      cursor: pointer;
      path {
        fill: var(--c-icon);
      }
    }
    h3 {
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
    }
    .attribution {
      a {
        color: var(--c-text);
      }
    }
  }
`

const Overlay = styled(motion.div)`
  z-index: 98;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background: var(--c-bg-overlay);
  backdrop-filter: blur(15px);
`
