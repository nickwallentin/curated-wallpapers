import React from "react"

import Img from "gatsby-image"

import { styled } from "linaria/react"

const CreditModal = ({ modalContent, handleModal }) => {
  return (
    <CreditModalStyles>
      <div className="modal-image">
        <Img fluid={modalContent.Thumbnail.childImageSharp.fluid} />
      </div>
      <div className="modal-credit">
        <h3>Say thank you!</h3>
        <p>
          Give a shoutout to <strong>{modalContent.user.displayName}</strong> on
          social or copy the text below to attribute.
        </p>
        <div className="socials"></div>
        <div className="attribution">
          Designed by{" "}
          <strong>
            <a href="https://www.apple.com">{modalContent.user.displayName}</a>
          </strong>{" "}
          on{" "}
          <strong>
            <a href="https://www.apple.com">wallpapers.com</a>
          </strong>
        </div>
      </div>
    </CreditModalStyles>
  )
}

export default CreditModal

const CreditModalStyles = styled.div``
