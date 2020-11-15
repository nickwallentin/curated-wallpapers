import { styled } from "linaria/react"
import React, { useContext } from "react"
import Img from "gatsby-image"

import DownloadIcon from "../assets/icons/download.svg"
import { Link } from "gatsby"
import { ModalContext } from "../context/ModalContext"

const Wallpaper = ({ wallpaper }) => {
  const image = wallpaper.Thumbnail.childImageSharp.fluid
  const imageSrc = wallpaper.Download.publicURL

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
    <WallpaperStyles>
      <div className="wallpaper-image">
        <Link to={wallpaper.fields.slug}>
          <Img fluid={image} />
        </Link>
        <div className="wallpaper-details-bottom">
          <Link to="/" className="credit">
            {wallpaper.user.displayName}
          </Link>
          <a
            onClick={() => handleDownload()}
            className="download"
            href={imageSrc}
            download
          >
            <DownloadIcon />
          </a>
        </div>
      </div>
    </WallpaperStyles>
  )
}

export default Wallpaper

const WallpaperStyles = styled.div`
  transition: transform 200ms;
  position: relative;
  border-radius: var(--b-radius);
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    .wallpaper-details-bottom {
      opacity: 1;
      transform: translateY(0px);
    }
    .wallpaper-image {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
  .wallpaper-image {
    .gatsby-image-wrapper {
      transition: all 1s;
    }
  }
  .credit {
    font-family: "Inter Bold";
    font-size: 80%;
    color: var(--c-text);
    text-decoration: none;
  }
  .wallpaper-details-bottom {
    transform: translateY(50%);
    opacity: 0;
    backdrop-filter: blur(6px);
    transition: all 200ms;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    width: 100%;
    background: #00000050;
    overflow: hidden;
    border-bottom-left-radius: var(--b-radius);
    border-bottom-right-radius: var(--b-radius);

    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem;
    }

    .download {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 200ms;

      border-radius: var(--b-radius);
      svg {
        path {
          fill: white;
        }
      }
      &:hover {
        background: #ffffff30;
      }
    }
  }
`
