const path = require("path")

const slugify = name => {
  const slug = name
    .replace(/\s+/g, "-")
    .replace(/[åä]+/g, "a")
    .replace(/ö+/g, "o")
    .toLowerCase()
  return slug
}

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "Wallpaper") {
    const partOfId = node.id.slice(0, 8)
    const slug = `/wallpaper/${slugify(node.title)}-${partOfId}`
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const wallpaperTemplate = path.resolve("./src/templates/wallpaperTemplate.js")
  const archiveTemplate = path.resolve("./src/templates/archiveTemplate.js")
  const wallpapers = await graphql(`
    query {
      allWallpaper {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const paginate = await graphql(`
    query {
      allWallpaper {
        group(field: groupByMonth) {
          fieldValue
          edges {
            node {
              categories {
                label
                slug
              }
            }
          }
        }
      }
    }
  `)
  const categories = await graphql(`
    query {
      allCategory {
        edges {
          node {
            id
            label
            slug
          }
        }
      }
    }
  `)

  const lastGroupIndex = paginate.data.allWallpaper.group.length - 1
  const lastGroupItem = paginate.data.allWallpaper.group[lastGroupIndex]

  const sortings = [
    { path: "latest", enum: "dateAdded" },
    { path: "popular", enum: "downloads" },
  ]

  wallpapers.data.allWallpaper.edges.forEach(edge => {
    createPage({
      component: wallpaperTemplate,
      path: edge.node.fields.slug,
      context: {
        id: edge.node.id,
      },
    })
  })

  // Top level pages (No groups)
  sortings.forEach(sorting => {
    createPage({
      component: archiveTemplate,
      path: `/wallpapers/${sorting.path}`,
      context: {
        sortingEnum: sorting.enum,
        sorting: sorting.path,
        group: lastGroupItem.fieldValue,
      },
    })
    categories.data.allCategory.edges.forEach(edge => {
      const category = edge.node.label
      createPage({
        component: archiveTemplate,
        path: `/wallpapers/${sorting.path}/${category.toLowerCase()}`,
        context: {
          sortingEnum: sorting.enum,
          sorting: sorting.path,
          category: category,
          group: lastGroupItem.fieldValue,
        },
      })
    })
  })

  //Group pages
  paginate.data.allWallpaper.group.map((group, index) => {
    if (index !== lastGroupIndex) {
      group.edges.forEach(edge => {
        sortings.forEach(sorting => {
          createPage({
            component: archiveTemplate,
            path: `wallpapers/${sorting.path}/${group.fieldValue}`,
            context: {
              sortingEnum: sorting.enum,
              sorting: sorting.path,
              group: group.fieldValue,
            },
          })
          edge.node.categories.forEach(category => {
            createPage({
              component: archiveTemplate,
              path: `wallpapers/${sorting.path}/${category.slug}/${group.fieldValue}`,
              context: {
                sortingEnum: sorting.enum,
                sorting: sorting.path,
                category: category.label,
                group: group.fieldValue,
              },
            })
          })
        })
      })
      // sortings.forEach(sorting => {
      //   createPage({
      //     component: archiveTemplate,
      //     path: `/wallpapers/${sorting.path}/${group.fieldValue}`,
      //     context: {
      //       sortingEnum: sorting.enum,
      //       sorting: sorting.path,
      //       group: group.fieldValue,
      //     },
      //   })
      //   categories.data.allCategory.edges.forEach(edge => {
      //     const category = edge.node.label
      //     createPage({
      //       component: archiveTemplate,
      //       path: `/wallpapers/${sorting.path}/${category.toLowerCase()}/${
      //         group.fieldValue
      //       }`,
      //       context: {
      //         sortingEnum: sorting.enum,
      //         sorting: sorting.path,
      //         category: category,
      //         group: group.fieldValue,
      //       },
      //     })
      //   })
      // })
    }
  })
}
