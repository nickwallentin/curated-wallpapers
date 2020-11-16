import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import Filter from "./filter"

import "../styles/global.css"

const Layout = ({ children, single, pageContext }) => {
  return (
    <React.Fragment>
      <Header />
      <main id="main">
        {!single && <Filter pageContext={pageContext} />}
        {children}
      </main>
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
