import "../styles/global.css"

import Filter from "./filter"
import Footer from "./footer"
import Header from "./header"
import PropTypes from "prop-types"
import React from "react"

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
