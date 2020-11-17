import { Flex, Row, Sec, Wrap } from "./styled"
import { Link, navigate } from "gatsby"
import React, { useEffect, useRef } from "react"

import FilterIcon from "../assets/icons/filter.svg"
import LatestIcon from "../assets/icons/latest.svg"
import PopularIcon from "../assets/icons/popular.svg"
import store from "store"
import { styled } from "linaria/react"
import useCategoryGroups from "../queries/useCategoryGroups"
import { useState } from "react"

const Filter = ({ pageContext }) => {
  const contextCategory = pageContext && pageContext.category

  const categoryGroups = useCategoryGroups()
  const scrollRef = useRef(null)
  const [sorting, setSorting] = useState(
    store.get("filterSort") ? store.get("filterSort") : "popular"
  )
  const [category, setCategory] = useState(
    store.get("filterCategory") ? store.get("filterCategory") : "all"
  )

  const handleScroll = left => {
    if (typeof window !== undefined) {
      const session = window.sessionStorage
      session.setItem("subnav-scroll", left)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const session = window.sessionStorage
      const scrollPosition = session.getItem("subnav-scroll")
      if (scrollPosition) {
        scrollRef.current.scrollLeft = scrollPosition
      }
    }
    if (pageContext && contextCategory) {
      store.set("filterCategory", contextCategory.toLowerCase())
      setCategory(contextCategory.toLowerCase())
    }
  }, [])

  const handleFilter = (type, content) => {
    store.set(`filter${type}`, content.toLowerCase())
    if (type === "Sort") {
      setSorting(content.toLowerCase())
    }
    if (type === "Category") {
      setCategory(content.toLowerCase())
    }
  }

  return (
    <FilterStyles>
      <Sec space="1rem 0px">
        <Wrap>
          <Row>
            <Flex align="center" justify="space-between">
              <div className="sort">
                <div onClick={() => handleFilter("Sort", "popular")}>
                  <Link
                    className={sorting === "popular" ? "active" : null}
                    to={
                      category === "all"
                        ? `/wallpapers/popular`
                        : `/wallpapers/popular/${category}`
                    }
                  >
                    <PopularIcon />
                  </Link>
                </div>
                <div onClick={() => handleFilter("Sort", "latest")}>
                  <Link
                    className={sorting === "latest" ? "active" : null}
                    to={
                      category === "all"
                        ? `/wallpapers/latest`
                        : `/wallpapers/latest/${category}`
                    }
                  >
                    <LatestIcon />
                  </Link>
                </div>
              </div>
              <div
                ref={scrollRef}
                onScroll={e => handleScroll(e.target.scrollLeft)}
                className="categories"
              >
                <ul>
                  <li>
                    <Link
                      onClick={() => handleFilter("Category", "All")}
                      className={category === "all" ? "active" : null}
                      to={`/wallpapers/${sorting}`}
                    >
                      All
                    </Link>
                  </li>
                  {categoryGroups.map(group => {
                    return (
                      <li key={group.fieldValue}>
                        <Link
                          onClick={() =>
                            handleFilter("Category", group.fieldValue)
                          }
                          activeClassName="active"
                          partiallyActive={true}
                          to={`/wallpapers/${sorting}/${group.fieldValue.toLowerCase()}`}
                        >
                          {group.fieldValue}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="filter">
                <span className="icon">
                  <FilterIcon />
                </span>
              </div>
            </Flex>
          </Row>
        </Wrap>
      </Sec>
    </FilterStyles>
  )
}

export default Filter

const FilterStyles = styled.div`
  a {
    font-size: 0.9rem;
  }

  .sort {
    display: flex;
    a {
      padding: 0.3rem;
      display: flex;
      align-items: center;
      border-radius: var(--b-radius);
      box-sizing: border-box;
      margin-right: 0.2rem;
      &.active {
        svg {
          path {
            fill: var(--c-text);
          }
        }
        &:hover {
          svg {
            path {
              fill: var(--c-text);
            }
          }
        }
      }

      &:hover {
        background: var(--c-bg-secondary);
        svg {
          path {
            fill: var(--c-icon-hover);
          }
        }
      }
    }
  }
  .categories {
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 600px) {
      white-space: nowrap; /* [1] */
      overflow: auto; /* [2] */
      -webkit-overflow-scrolling: touch; /* [3] */
      min-height: 35px;
      padding-left: 10px;
      padding-right: 10%;
      mask-image: linear-gradient(
        to right,
        transparent,
        var(--c-bg) 10px,
        var(--c-bg) 90%,
        transparent
      );
    }
    ul {
      list-style-type: none;
      margin: 0px;
      display: flex;
      align-items: center;
      li {
        margin: 0px;
        a {
          color: var(--c-text-idle);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: var(--b-radius);
          font-family: "Inter Medium", sans-serif;
          &:hover {
            color: var(--c-text-sub);
          }
          &.active {
            background: var(--c-bg-secondary);
            color: var(--c-text);
          }
        }
      }
    }
  }
  .filter {
    .icon {
      padding: 0.3rem;
      display: flex;
      align-items: center;
      border-radius: var(--b-radius);
      box-sizing: border-box;
      margin-right: 0.2rem;

      &:hover {
        background: var(--c-bg-secondary);
        svg {
          path {
            fill: var(--c-icon-hover);
          }
        }
      }
    }
  }
`
