import { Link, navigate } from "gatsby"
import { styled } from "linaria/react"
import PropTypes from "prop-types"
import React from "react"
import { Flex, Row, Wrap } from "./styled"

import CloseIcon from "../assets/icons/close.svg"

const Header = ({ siteTitle }) => (
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
        </Flex>
      </Row>
    </Wrap>
  </HeaderStyles>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

const HeaderStyles = styled.header`
  background: var(--c-bg);
`
