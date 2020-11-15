import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/layout"
import { Sec, Wrap } from "../components/styled"
import AuthContext from "../context/AuthContext"
import useCategoryData from "../queries/useCategoryData"
import Dropzone from "react-dropzone"
import { styled } from "linaria/react"

const UploadPage = () => {
  const user = useContext(AuthContext)
  const categoryOptions = useCategoryData()
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  const handleSelectCategory = category => {
    const array = [...categories]
    array.push(category)
    setCategories(array)
    console.log(array)
  }

  const onImage = async dropFile => {
    const file = await dropFile[0]
    setFile(file[0])
    console.log(file)
    const formData = new FormData()
    formData.append("upload_preset", "wallpaperDefault")
    formData.append("file", file)
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgjw7vfqd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
    const data = await response.json()

    setImage(data.secure_url)
  }

  const uploadCloudinary = () => {}

  const onSubmit = event => {
    event.preventDefault()
  }

  return (
    <Layout single={true}>
      <UploadStyles>
        <Sec>
          <Wrap style={{ maxWidth: "800px" }}>
            {image && <img src={image} />}
            <form onSubmit={event => onSubmit(event)}>
              <Dropzone onDrop={file => onImage(file)}>
                {({ getRootProps, getInputProps }) => (
                  <div id="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
              <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
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
          </Wrap>
        </Sec>
      </UploadStyles>
    </Layout>
  )
}

export default UploadPage

const UploadStyles = styled.div``
