import { graphql, useStaticQuery } from "gatsby"

const useHeaderWallpaper = () => {
  const data = useStaticQuery(graphql`
    query getTopWallpaperForHeader {
      allAirtable(
        filter: { table: { eq: "Wallpapers" } }
        sort: { fields: data___Downloads, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            id
            data {
              Wallpaper {
                localFiles {
                  childImageSharp {
                    fluid(maxHeight: 500, maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return data.allAirtable.edges[0].node.data.Wallpaper.localFiles[0]
    .childImageSharp.fluid
}

export default useHeaderWallpaper
