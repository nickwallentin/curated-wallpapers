import { graphql } from "gatsby"

export const WallpaperFragments = graphql`
  fragment WallpaperPreviewData on Wallpaper {
    id
    user {
      displayName
    }
    imageSrc
    dateAdded
    localImage {
      publicURL
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 250, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }

  fragment WallpaperFullData on Wallpaper {
    title
    dateAdded
    user {
      displayName
    }
    id

    localImage {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
