import { graphql, useStaticQuery } from "gatsby"
import _uniq from "lodash/uniq"

const useCategoryData = () => {
  const data = useStaticQuery(graphql`
    query getAllCategories {
      allAirtable(filter: { table: { eq: "Categories" } }) {
        edges {
          node {
            data {
              Category
            }
          }
        }
      }
    }
  `)
  return data.allAirtable.edges
}
export default useCategoryData
