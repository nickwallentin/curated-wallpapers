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

  .credit {
    font-family: "Inter Bold";
    font-size: 80%;
    color: var(--c-text);
    text-decoration: none;
  }

  .wallpaper-details-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    a {
      color: var(--c-text);
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
          fill: var(--c-icon);
        }
      }
      &:hover {
        svg {
          path {
            fill: var(--c-text);
          }
        }
        background: var(--c-bg-secondary);
      }
    }
  }

  @media (min-width: 800px) {
    .wallpaper-details-bottom {
      transform: translateY(50%);
      opacity: 0;
      backdrop-filter: blur(6px);
      transition: all 200ms;
      position: absolute;
      bottom: 0px;
      left: 0px;

      width: 100%;
      background: #00000050;
      overflow: hidden;
      border-bottom-left-radius: var(--b-radius);
      border-bottom-right-radius: var(--b-radius);
    }
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
  }
`
