import DownloadIcon from "../assets/icons/download.svg"
import { Link } from "gatsby"
import React from "react"
import { styled } from "linaria/react"

const Button = ({ download, file, to, children, handleDownload }) => {
  return (
    <ButtonStyles>
      {download ? (
        <a onClick={() => handleDownload()} href={file} download>
          <DownloadIcon /> Download
        </a>
      ) : (
        <Link to={to}>{children}</Link>
      )}
    </ButtonStyles>
  )
}

export default Button

const ButtonStyles = styled.span`
  &:hover {
    cursor: pointer;
  }
  a,
  span {
    text-decoration: none;
    color: var(--c-text);
    padding: 0.5rem 0.8rem;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: var(--b-radius);
    font-size: 0.9rem;
    font-family: "Inter Bold";
    transition: all 200ms;

    &:hover {
      background: var(--c-bg-secondary);
    }

    svg {
      margin-right: 0.5rem;
      width: 18px;
      height: 18px;
    }
  }
`
