import { Link, navigate } from "gatsby"
import { styled } from "linaria/react"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { Flex, Row, Wrap } from "./styled"

import CloseIcon from "../assets/icons/close.svg"
import Auth from "./auth"
import { ModalContext } from "../context/ModalContext"

const Header = ({ siteTitle }) => {
  const { handleModal } = useContext(ModalContext)
  return (
    <HeaderStyles>
      <Wrap>
        <Row>
          <Flex justify="space-between" align="center">
            <div className="brand">
              <Link
                to="/"
                style={{
                  color: `var(--c-text)`,
                  textDecoration: `none`,
                }}
              >
                Wallpapers
              </Link>
            </div>
            <div className="actions">
              <div
                onClick={() => handleModal(true, "upload")}
                style={{ color: "var(--c-text)" }}
              >
                Upload
              </div>
              <Auth />
            </div>
          </Flex>
        </Row>
      </Wrap>
    </HeaderStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

const HeaderStyles = styled.header`
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-bg-secondary);
  font-family: "Inter Medium";

  .actions {
    display: flex;
    align-items: center;
    div {
      margin-right: 0.5rem;
    }
  }
`
