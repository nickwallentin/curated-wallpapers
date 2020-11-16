import { graphql, useStaticQuery } from "gatsby"

const useTopWallpapers = () => {
  const data = useStaticQuery(graphql`
    query {
      allWallpaper(sort: { fields: downloads, order: DESC }) {
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

export default useTopWallpapers
