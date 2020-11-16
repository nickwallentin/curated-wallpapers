import { graphql, useStaticQuery } from "gatsby"

const useCategoryGroups = () => {
  const data = useStaticQuery(graphql`
    query {
      allWallpaper(sort: { fields: downloads, order: DESC }) {
        group(field: categories___label, limit: 1) {
          fieldValue
          totalCount
          edges {
            node {
              title
              localImage {
                childImageSharp {
                  fluid(maxWidth: 1440) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return data.allWallpaper.group
}
export default useCategoryGroups
