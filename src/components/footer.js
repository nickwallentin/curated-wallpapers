import { Grid, Row, Sec, Wrap } from "./styled"

import DarkModeIcon from "../assets/icons/darkmode.svg"
import LightModeIcon from "../assets/icons/lightmode.svg"
import { Link } from "gatsby"
import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { styled } from "linaria/react"
import useCategoryData from "../queries/useCategoryData"

const Footer = () => {
  const categories = useCategoryData()
  return (
    <FooterStyles>
      <Sec>
        <Wrap>
          <Row>
            <div className="footer-main">
              <div className="info" style={{ maxWidth: "500px" }}>
                <h3>Wallpapers</h3>
                <p>
                  Beautifully designed wallpapers gifted by the world's most
                  generous designers. All wallpapers are free to use, no strings
                  attached.
                </p>
                <strong>
                  Make sure to checkout the designers and give them a shoutout
                  on social.
                </strong>
              </div>
              <div className="categories">
                <h4>Categories</h4>
                <ul>
                  {categories.map(category => (
                    <li key={category.node.label}>
                      <Link to={`/wallpapers/popular/${category.node.slug}`}>
                        {category.node.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Row>
          <Row>
            <div className="footer-bottom">
              <div className="footer-pages">
                <ul>
                  <li>
                    <Link to="/">License</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy</Link>
                  </li>
                  <li>
                    <Link to="/">Sustainability</Link>
                  </li>
                </ul>
              </div>
              <ThemeToggler>
                {({ theme, toggleTheme }) => (
                  <React.Fragment>
                    {theme === "light" ? (
                      <div
                        onClick={() => toggleTheme("dark")}
                        className="icon-link"
                      >
                        <LightModeIcon />
                      </div>
                    ) : (
                      <div
                        onClick={() => toggleTheme("light")}
                        className="icon-link"
                      >
                        <DarkModeIcon />
                      </div>
                    )}
                  </React.Fragment>
                )}
              </ThemeToggler>
            </div>
          </Row>
        </Wrap>
      </Sec>
    </FooterStyles>
  )
}

export default Footer

const FooterStyles = styled.div`
  border-top: 1px solid var(--c-bg-secondary);
  .footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 2rem;

    ul {
      list-style-type: none;
      margin: 0px;
      li {
        a {
          text-decoration: none;
        }
      }
    }
  }
  .footer-bottom {
    padding: 1rem 0px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--c-bg-secondary);

    ul {
      list-style-type: none;
      margin: 0px;
      display: flex;
      li {
        margin-right: 1rem;
        a {
          text-decoration: none;
        }
      }
    }
  }
`
