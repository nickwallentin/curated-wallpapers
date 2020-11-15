import React, { useContext, useState } from "react"
import { styled } from "linaria/react"
import Dropzone from "react-dropzone"
import useCategoryData from "../../queries/useCategoryData"
import AuthContext from "../../context/AuthContext"
import { ModalContext } from "../../context/ModalContext"

const UploadModal = () => {
  const categoryOptions = useCategoryData()
  const user = useContext(AuthContext)
  const { handleModal } = useContext(ModalContext)
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [file, setFile] = useState(null)

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
      resetForm()
      handleModal()
    }
  }

  return (
    <UploadModalStyles>
      <div className="modal-header">
        <h3>Upload</h3>
      </div>
      <div className="modal-content">
        <form onSubmit={event => handleSubmit(event)}>
          {!image ? (
            <Dropzone onDrop={file => onImage(file)}>
              {({ getRootProps, getInputProps }) => (
                <div id="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
          ) : (
            <img src={image} alt="Preview wallpaper" />
          )}

          <input
            onChange={e => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="title"
          />
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
          <button type="submit">Upload</button>
        </form>
      </div>
    </UploadModalStyles>
  )
}

export default UploadModal

const UploadModalStyles = styled.div`
  #dropzone {
    height: 350px;
    border-radius: var(--b-radius);
    border: 2px solid var(--c-bg-secondary);
    padding: 1rem;
  }
`
