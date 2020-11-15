import { graphql, Link, navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import Button from "../components/button"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Sec, Wrap, Row, Grid, Flex } from "../components/styled"
import Wallpaper from "../components/wallpaper"
import { usePaginate } from "../hooks/usePaginate"

const ArchiveTemplate = ({ pageContext, data, location }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { paginate, hasNextPage } = usePaginate()
  const hasData = data.allWallpaper.edges.length > 0 ? true : false
  let { sorting, category, group } = pageContext

  const wallpapers = data.allWallpaper.edges

  sorting = sorting.charAt(0).toUpperCase() + sorting.slice(1)

  useEffect(() => {
    const dom = document.querySelector("#wallpapers")

    var scrollviewOffsetY = dom.scrollTop
    var scrollviewFrameHeight = dom.clientHeight
    var scrollviewContentHeight = dom.scrollHeight
    var scrollMargin = 500
    var sum = scrollviewOffsetY + scrollviewFrameHeight

    return () => {
      document.removeEventListener("scroll", () => {
        console.log("Remove listener")
      })
    }
  })

  return (
    <Layout>
      <SEO title={`${sorting} ${category ? category : ""} Wallpapers`} />
      <Sec space="0px">
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
