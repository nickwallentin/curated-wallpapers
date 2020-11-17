import { Flex, Grid, Sec, Wrap } from "../components/styled"
import React, { useEffect } from "react"

import Button from "../components/button"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Wallpaper from "../components/wallpaper"
import { graphql } from "gatsby"
import store from "store"
import { usePaginate } from "../hooks/usePaginate"

const ArchiveTemplate = ({ pageContext, data, location }) => {
  const { paginate, hasNextPage } = usePaginate()

  let { sorting, category, group } = pageContext

  const wallpapers = data.allWallpaper.edges

  sorting = sorting.charAt(0).toUpperCase() + sorting.slice(1)

  return (
    <Layout pageContext={pageContext}>
      <SEO title={`${sorting} ${category ? category : ""} Wallpapers`} />
      <Sec style={{ paddingTop: "0px" }}>
        <Wrap>
          <Grid id="wallpapers">
            {wallpapers.map(({ node: wallpaper }) => (
              <Wallpaper key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </Grid>
        </Wrap>
      </Sec>
      {hasNextPage(location.pathname, group) && (
        <Sec>
          <Wrap>
            <Flex justify="center">
              <Button to={paginate(location.pathname, group)}>Show more</Button>
            </Flex>
          </Wrap>
        </Sec>
      )}
    </Layout>
  )
}

export default ArchiveTemplate

export const pageQuery = graphql`
  query getArchiveWallpapers(
    $category: String
    $sortingEnum: [WallpaperFieldsEnum]
    $group: String
  ) {
    allWallpaper(
      sort: { fields: $sortingEnum, order: DESC }
      filter: {
        categories: { elemMatch: { label: { eq: $category } } }
        groupByMonth: { eq: $group }
      }
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
