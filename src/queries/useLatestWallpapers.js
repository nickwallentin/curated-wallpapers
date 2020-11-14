import { graphql, useStaticQuery } from "gatsby"

const useLatestWallpapers = () => {
  const data = useStaticQuery(graphql`
    query {
      allWallpaper {
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
  `)
  return data.allWallpaper.edges
}

export default useLatestWallpapers
