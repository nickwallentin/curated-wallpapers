import { styled } from "linaria/react"
import { Link, navigate } from "gatsby"
import React from "react"
import useCategoryData from "../queries/useCategoryData"
import { Row, Sec, Wrap, Flex } from "./styled"
import store from "store"
import { useState } from "react"

const Filter = () => {
  const categories = useCategoryData()
  const [sorting, setSorting] = useState(
    store.get("filterSort") ? store.get("filterSort") : "latest"
  )
  const [category, setCategory] = useState(
    store.get("filterCategory") ? store.get("filterCategory") : "all"
  )

  const handleFilter = (type, content) => {
    store.set(`filter${type}`, content.toLowerCase())
  }

  return (
    <FilterStyles>
      <Sec space="1rem 0px">
        <Wrap>
          <Row>
            <Flex align="center" justify="space-between">
              <div className="sort">
                <div onClick={() => handleFilter("Sort", "latest")}>
                  <Link
                    to={
                      category === "all"
                        ? `/wallpapers/latest`
                        : `/wallpapers/latest/${category}`
                    }
                  >
                    Latest
                  </Link>
                </div>
                <div onClick={() => handleFilter("Sort", "popular")}>
                  <Link
                    to={
                      category === "all"
                        ? `/wallpapers/popular`
                        : `/wallpapers/popular/${category}`
                    }
                  >
                    Popular
                  </Link>
                </div>
              </div>
              <div className="categories">
                <ul>
                  <li>
                    <Link
                      onClick={() => handleFilter("Category", "All")}
                      activeClassName="active"
                      to={`/wallpapers/${sorting}`}
                    >
                      All
                    </Link>
                  </li>
                  {categories.map(edge => (
                    <li key={edge.node.label}>
                      <Link
                        onClick={() =>
                          handleFilter("Category", edge.node.label)
                        }
                        activeClassName="active"
                        partiallyActive={true}
                        to={`/wallpapers/${sorting}/${edge.node.label.toLowerCase()}`}
                      >
                        {edge.node.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filter">Filters</div>
            </Flex>
          </Row>
        </Wrap>
      </Sec>
    </FilterStyles>
  )
}

export default Filter

const FilterStyles = styled.div`
  .categories {
    ul {
      list-style-type: none;
      margin: 0px;
      display: flex;
      li {
        a {
          color: var(--c-text);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: var(--b-radius);
          transition: all 200ms;
          background: var(--c-bg);
          &.active {
            background: var(--c-bg-secondary);
          }
        }
      }
    }
  }
`
