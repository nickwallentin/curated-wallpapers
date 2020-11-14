import { graphql, navigate } from "gatsby"
import React, { useContext } from "react"
import Img from "gatsby-image"
import { ModalContext } from "../context/ModalContext"

import Layout from "../components/layout"
import { Flex, Grid, Row, Sec, Wrap } from "../components/styled"
import { styled } from "linaria/react"

import CloseIcon from "../assets/icons/close.svg"
import DownloadIcon from "../assets/icons/download.svg"
import Button from "../components/button"

const WallpaperTemplate = ({ data }) => {
  const wallpaper = data.wallpaper
  const { handleModal } = useContext(ModalContext)

  const handleDownload = () => {
    handleModal(wallpaper)
    fetch("/.netlify/functions/incrementDownloads", {
      method: "POST",
      body: JSON.stringify({ id: wallpaper.id }),
    })
      .then(res => res.text())
      .then(text => console.log(text))
  }
  return (
    <Layout single={true}>
      <SingleWallpaperStyles>
        <Sec space="0px">
          <Wrap>
            <Row>
              <Flex justify="space-between" align="center">
                <div className="credit">
                  <strong>{wallpaper.creditName}</strong>
                  <small>@username</small>
                </div>
                <Button
                  handleDownload={handleDownload}
                  file={wallpaper.Download.publicURL}
                  download
                />
              </Flex>
            </Row>
            <div className="wallpaper-wrapper">
              <div className="desktop-wallpaper wallpaper">
                <Img
                  className="wallpaper"
                  fluid={wallpaper.Desktop.childImageSharp.fluid}
                />
              </div>
            </div>
          </Wrap>
        </Sec>
      </SingleWallpaperStyles>
    </Layout>
  )
}

export default WallpaperTemplate

const SingleWallpaperStyles = styled.div`
  .wallpaper {
    border-radius: var(--b-radius);
    overflow: hidden;
  }
  .wallpaper-wrapper {
    max-width: 100vmin;
    margin: 0 auto;
  }
  .credit {
    strong {
      display: block;
    }
  }
`

export const pageQuery = graphql`
  query getWallpaperByID($id: String!) {
    wallpaper(id: { eq: $id }) {
      ...WallpaperFullData
    }
  }
`
