import React from "react"
import { Sec, Wrap } from "./styled"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

const Footer = () => {
  return (
    <Sec>
      <Wrap>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <span
              onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
            >
              {theme}
            </span>
          )}
        </ThemeToggler>
      </Wrap>
    </Sec>
  )
}

export default Footer
