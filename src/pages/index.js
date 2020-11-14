import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import { Sec, Wrap, Grid } from "../components/styled"
import useLatestWallpapers from "../queries/useLatestWallpapers"
import Wallpaper from "../components/wallpaper"

const IndexPage = () => {
  const wallpapers = useLatestWallpapers()

  return (
    <Layout>
      <SEO title="Home" />
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

export default IndexPage
