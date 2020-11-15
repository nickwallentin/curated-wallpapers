import React, { useState } from "react"

const useModal = () => {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalType, setModalType] = useState("")

  const handleModal = (content, type) => {
    setModal(!modal)
    setModalType("")
    if (content) {
      setModalContent(content)
      setModalType(type)
    }
  }

  return { modal, modalType, handleModal, modalContent }
}

export default useModal
