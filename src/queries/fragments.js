import { graphql } from "gatsby"

export const WallpaperFragments = graphql`
  fragment WallpaperPreviewData on Wallpaper {
    id
    user {
      displayName
    }
    imageSrc
    dateAdded
    Thumbnail: localImage {
      childImageSharp {
        fluid(maxWidth: 600, maxHeight: 400, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    Download: localImage {
      publicURL
    }
  }

  fragment WallpaperFullData on Wallpaper {
    title
    dateAdded
    user {
      displayName
    }
    id
    imageSrc
    Download: localImage {
      publicURL
    }
    Desktop: localImage {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    Thumbnail: localImage {
      childImageSharp {
        fluid(maxWidth: 600, maxHeight: 400, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
