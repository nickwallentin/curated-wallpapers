import React from "react"
import { styled } from "linaria/react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link } from "gatsby"
import store from "store"

import SEO from "../components/seo"

import { Sec, Wrap, Grid } from "../components/styled"
import useTopWallpapers from "../queries/useTopWallpapers"
import Wallpaper from "../components/wallpaper"
import useCategoryGroups from "../queries/useCategoryGroups"
import { motion } from "framer-motion"

const IndexPage = () => {
  const categoryGroups = useCategoryGroups()

  return (
    <Layout>
      <SEO title="Free wallpapers" />
      <Sec style={{ paddingTop: "0px" }}>
        <Wrap>
          <GroupGrid>
            {categoryGroups.map((group, index) => (
              <GroupCard
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className={
                  index === 0 ? "first" : index === 1 ? "second" : null
                }
              >
                <Link
                  to={`/wallpapers/${
                    store.get("filterSort")
                      ? store.get("filterSort")
                      : "popular"
                  }/${group.fieldValue.toLowerCase()}`}
                >
                  <Img
                    fluid={group.edges[0].node.localImage.childImageSharp.fluid}
                  />
                  <div className="group-content">
                    <h2>{group.fieldValue}</h2>
                  </div>
                </Link>
              </GroupCard>
            ))}
          </GroupGrid>
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default IndexPage

const GroupGrid = styled.grid`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const GroupCard = styled(motion.div)`
  border-radius: var(--b-radius);
  overflow: hidden;
  &.first {
    grid-column: span 2;
    grid-row: span 2;
    h2 {
      font-size: 2rem;
    }
  }
  grid-column: auto;
  grid-row: auto;

  .gatsby-image-wrapper {
    transition: transform 1s;
    height: 100%;
    border-radius: var(--b-radius);
    overflow: hidden;
    img {
      border-radius: var(--b-radius);
      overflow: hidden;
    }
  }
  &:hover .gatsby-image-wrapper {
    transform: scale(1.2);
    border-radius: var(--b-radius);
    overflow: hidden;
  }

  position: relative;

  .group-content {
    position: absolute;
    top: 1rem;
    left: 1rem;
    h2 {
      color: var(--c-text);
    }
  }
  h2 {
    font-size: 1rem;
    padding: 0.3rem 0.5rem;
    background: var(--c-bg-backdrop);
    border-radius: var(--b-radius);
    backdrop-filter: blur(15px);
  }
  @media (min-width: 600px) {
    h2 {
      font-size: 1.2rem;
    }
    .group-content {
      top: 2rem;
      left: 2rem;
    }
  }
  @media (min-width: 980px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`
