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
  if (node.internal.type === "Airtable" && node.table === "Wallpapers") {
    const slug = `/wallpaper/${slugify(node.data.Title)}-${
      node.id.split("-")[0]
    }`
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
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

  sortings.forEach(sorting => {
    createPage({
      component: archiveTemplate,
      path: `/wallpapers/${sorting.path}`,
      context: {
        sortingEnum: sorting.enum,
        sorting: sorting.path,
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
        },
      })
    })
  })
}
