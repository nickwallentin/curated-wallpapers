import { styled } from "linaria/react"
import { motion } from "framer-motion"
import React, { useContext } from "react"
import ReactDOM from "react-dom"
import { ModalContext } from "../context/ModalContext"

import CreditModal from "./modals/credit"
import UploadModal from "./modals/upload"

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
          {modalType === "credit" && (
            <CreditModal
              handleModal={handleModal}
              modalContent={modalContent}
            />
          )}
          {modalType === "upload" && <UploadModal />}
        </ModalStyles>
      </React.Fragment>,
      document.querySelector("#main")
    )
  } else return null
}

export default Modal

const ModalStyles = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 700px;
  width: 100%;
  background: var(--c-bg-backdrop);
  color: var(--c-text);
  backdrop-filter: blur(10px);

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: var(--b-radius);
  font-size: 0.9rem;
  & > div {
    padding: 1rem;
  }

  .modal-image {
    height: 100%;
    margin: 0px;
    border-radius: var(--b-radius);
    overflow: hidden;
    .gatsby-image-wrapper {
      height: 100%;
    }
  }
  .modal-credit {
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
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background: var(--c-bg-overlay);
  backdrop-filter: blur(6px);
`
