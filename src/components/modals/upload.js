import React, { useContext, useEffect, useRef, useState } from "react"

import AuthContext from "../../context/AuthContext"
import Dropzone from "react-dropzone"
import LoadingIcon from "../../assets/icons/loading.svg"
import { ModalContext } from "../../context/ModalContext"
import SuccessIcon from "../../assets/icons/success.svg"
import UploadIcon from "../../assets/icons/uploadToCloud.svg"
import _debounce from "lodash/debounce"
import { motion } from "framer-motion"
import { styled } from "linaria/react"
import useCategoryData from "../../queries/useCategoryData"

const UploadModal = () => {
  const categoryOptions = useCategoryData()
  const dropzoneRef = useRef()
  const { user } = useContext(AuthContext)
  const { handleModal } = useContext(ModalContext)
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dragging, setDragging] = useState(false)

  const resetForm = () => {
    setCategories([])
    setTitle("")
    setImage("")
    setFile("")
  }

  const handleSelectCategory = category => {
    const array = [...categories]
    if (!array.includes(category)) {
      array.push(category)
      setCategories(array)
    }
    console.log(array)
  }

  const readImage = file => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener("load", () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const onImage = async dropFile => {
    const droppedFile = await dropFile[0]
    setFile(droppedFile)
    const imageSrc = await readImage(droppedFile)
    setImage(imageSrc)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("upload_preset", "wallpaperDefault")
    formData.append("file", file)
    const cloudinaryRes = await fetch(
      "https://api.cloudinary.com/v1_1/dgjw7vfqd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
    const cloudinaryData = await cloudinaryRes.json()
    console.log("Cloudinarydata:", cloudinaryData)

    const date = new Date()
    const dateString = JSON.stringify(date)

    const dateGroup = dateString.split("-")[0] + dateString.split("-")[1]

    const body = {
      user: user.uid,
      title: title,
      categories: categories,
      imageSrc: cloudinaryData.secure_url,
      groupByMonth: dateGroup.replace('"', ""),
      downloads: 0,
      colors: cloudinaryData.colors,
      size: `${cloudinaryData.width}x${cloudinaryData.height}`,
    }
    const netlifyRes = await fetch("/.netlify/functions/uploadWallpaper", {
      method: "POST",
      body: JSON.stringify(body),
    })

    if (netlifyRes.status === 200) {
      setLoading(false)
      setSuccess(true)
      resetForm()
      const nextStep = _debounce(() => handleModal(), 1500)
      nextStep()
    }
  }

  return (
    <UploadModalStyles>
      {success ? (
        <motion.div
          className="modal-state"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <SuccessIcon className="success" />
          <strong>Successfully uploaded</strong>
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
            style={{ width: "56px", height: "56px" }}
          >
            <LoadingIcon className="loading" />
          </motion.span>
          <strong>Uploading</strong>
        </motion.div>
      ) : (
        <form onSubmit={event => handleSubmit(event)}>
          <div className="modal-header">
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Enter a title"
              autoFocus
            />
          </div>
          <div style={{ marginBottom: "0px" }} className="modal-image">
            {!image ? (
              <Dropzone
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}
                onDrop={file => onImage(file)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className={dragging ? "dropping" : null}
                    id="dropzone"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="dropzone-content">
                      <UploadIcon />
                      {dragging ? (
                        <motion.p
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Drop it like it's hot
                        </motion.p>
                      ) : (
                        <motion.p
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Drop or choose an image
                        </motion.p>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            ) : (
              <img src={image} alt="Preview wallpaper" />
            )}
          </div>
          <div className="modal-content">
            <strong style={{ marginBottom: "0.5rem", display: "block" }}>
              Pick categories
            </strong>
            <div
              onDragEnter={() => console.log("Dragging over")}
              className="categories"
            >
              {categoryOptions.map(({ node: category }) => (
                <span key={category.label}>
                  <input
                    key={category.label}
                    type="checkbox"
                    value={category.label}
                    name={category.label}
                    onChange={() => handleSelectCategory(category.label)}
                  />
                  <label htmlFor={category.label}>{category.label}</label>
                </span>
              ))}
            </div>
            <button
              className={title && image && categories ? null : "disabled"}
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      )}
    </UploadModalStyles>
  )
}

export default UploadModal

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676"
  }
  if (props.isDragReject) {
    return "#ff1744"
  }
  if (props.isDragActive) {
    return "#2196f3"
  }
  return "#eeeeee"
}

const UploadModalStyles = styled.div`
  .dropping {
    svg {
      path {
        fill: var(--c-action);
      }
    }
  }
  .modal-state {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      width: 56px;
      height: 56px;
      margin-bottom: 1rem;
      path {
        fill: var(--c-text);
      }
    }
  }
  img {
    margin-bottom: 0px;
  }
  .state {
    text-align: center;
    font-family: "Inter Medium";
  }
  #dropzone {
    height: 350px;
    border-radius: var(--b-radius);
    border: none;
    padding: 1rem;
    background: var(--c-bg-backdrop);
    display: flex;
    justify-content: center;
    align-items: center;

    .dropzone-content {
      width: 200px;
      text-align: center;
      font-family: "Inter Medium";
      color: var(--c-text-sub);
    }
  }
  form {
    margin: 0px;
  }
  input[type="text"] {
    background: transparent;
    outline: none;
    color: var(--c-text);
    padding: 0.5rem 0px;
    display: block;
    font-size: 1.2rem;
    font-family: "Inter Medium";
    border: none;
  }
  .categories {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    span {
    }
    input[type="checkbox"] {
      margin-right: 0.5rem;
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
`
