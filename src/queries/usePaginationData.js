import { graphql, useStaticQuery } from "gatsby"

const usePaginationData = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `)
  return data.allSitePage.edges
}
export default usePaginationData
