import { graphql, useStaticQuery } from "gatsby"
import _uniq from "lodash/uniq"

const useCategoryData = () => {
  const data = useStaticQuery(graphql`
    query getAllCategories {
      allCategory {
        edges {
          node {
            label
          }
        }
      }
    }
  `)
  return data.allCategory.edges
}
export default useCategoryData
