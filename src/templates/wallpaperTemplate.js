import { graphql } from "gatsby"
import React, { useContext } from "react"
import Img from "gatsby-image"
import { ModalContext } from "../context/ModalContext"

import Layout from "../components/layout"
import { Flex, Row, Sec, Wrap } from "../components/styled"
import { styled } from "linaria/react"

import Button from "../components/button"
import { motion } from "framer-motion"

const WallpaperTemplate = ({ data }) => {
  const wallpaper = data.wallpaper
  const { handleModal } = useContext(ModalContext)

  const handleDownload = () => {
    handleModal(wallpaper, "credit")
    fetch("/.netlify/functions/incrementDownloads", {
      method: "POST",
      body: JSON.stringify({ id: wallpaper.id }),
    })
      .then(res => res.text())
      .then(text => console.log(text))
  }
  return (
    <Layout single={true}>
      <SingleWallpaperStyles animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Sec style={{ paddingTop: "0px" }}>
          <Wrap>
            <Row>
              <Flex justify="space-between" align="center">
                <div className="credit">
                  <strong>{wallpaper.user.displayName}</strong>
                  <small>@{wallpaper.user.displayName}</small>
                </div>
                <Button
                  handleDownload={handleDownload}
                  file={wallpaper.localImage.publicURL}
                  download
                />
              </Flex>
            </Row>
            <div className="wallpaper-wrapper">
              <div className="desktop-wallpaper wallpaper">
                <Img
                  className="wallpaper"
                  fluid={wallpaper.localImage.childImageSharp.fluid}
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

const SingleWallpaperStyles = styled(motion.div)`
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
