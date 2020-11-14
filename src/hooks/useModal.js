import React, { useState } from "react"

const useModal = () => {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const handleModal = content => {
    setModal(!modal)
    if (content) {
      setModalContent(content)
    }
  }

  return { modal, handleModal, modalContent }
}

export default useModal
