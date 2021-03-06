import { Flex, Row, Wrap } from "./styled"
import React, { useContext } from "react"

import AddIcon from "../assets/icons/add.svg"
import AuthContext from "../context/AuthContext"
import { Link } from "gatsby"
import { ModalContext } from "../context/ModalContext"
import PropTypes from "prop-types"
import User from "./user"
import { styled } from "linaria/react"

const Header = () => {
  const auth = useContext(AuthContext)
  const user = auth && auth.user
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
                className="icon-link"
                onClick={() =>
                  user ? handleModal(true, "upload") : handleModal(true, "auth")
                }
                style={{ color: "var(--c-text)" }}
              >
                <AddIcon />
              </div>
              <User />
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
  font-family: "Inter Medium", sans-serif;

  .actions {
    display: flex;
    align-items: center;
    div {
      margin-right: 0.5rem;
    }
  }
`
