import React from "react"
import Modal from "../components/modal"
import useModal from "../hooks/useModal"

export const ModalContext = React.createContext({})

export const ModalProvier = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal()
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  )
}
