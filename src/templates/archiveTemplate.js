import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Sec, Wrap, Row, Grid } from "../components/styled"
import Wallpaper from "../components/wallpaper"

const ArchiveTemplate = ({ pageContext, data }) => {
  let { sorting, category } = pageContext

  const wallpapers = data.allWallpaper.edges

  sorting = sorting.charAt(0).toUpperCase() + sorting.slice(1)
  return (
    <Layout>
      <SEO title={`${sorting} ${category ? category : ""} Wallpapers`} />
      <Sec space="0px">
        <Wrap>
          <Grid>
            {wallpapers.map(({ node: wallpaper }) => (
              <Wallpaper key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </Grid>
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default ArchiveTemplate

export const pageQuery = graphql`
  query getArchiveWallpapers(
    $category: String
    $sortingEnum: [WallpaperFieldsEnum]
  ) {
    allWallpaper(
      sort: { fields: $sortingEnum, order: DESC }
      filter: { categories: { elemMatch: { label: { eq: $category } } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          ...WallpaperPreviewData
        }
      }
    }
  }
`
