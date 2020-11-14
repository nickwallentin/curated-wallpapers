require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-linaria`,
    `gatsby-plugin-dark-mode`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-firestore-saphi`,
      options: {
        // credential or appConfig
        credential: {
          type: process.env.FB_TYPE,
          project_id: process.env.FB_PROJECT_ID,
          private_key_id: process.env.FB_PRIVATE_KEY_ID,
          private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.FB_CLIENT_EMAIL,
          client_id: process.env.FB_CLIENT_ID,
          auth_uri: process.env.FB_AUTH_URI,
          token_uri: process.env.FB_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER,
          client_x509_cert_url: process.env.FB_CLIENT_URL,
        },

        types: [
          {
            type: `Wallpaper`,
            collection: `wallpapers`,
            //custom query..
            query: ref => ref.limit(1000),
            map: doc => ({
              title: doc.title,
              imageSrc: doc.imageSrc,
              creditName: doc.creditName,
              downloads: doc.downloads,
              dateAdded: doc.dateAdded.toDate(),
              groupByMonth: doc.groupByMonth,
              categories___NODE: doc.categories.map(category => category.id),
            }),
          },
          {
            type: `Category`,
            collection: `categories`,
            //custom query..
            query: ref => ref.limit(1000),
            map: doc => ({
              label: doc.label,
              slug: doc.slug,
            }),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Wallpaper",
        imagePath: "imageSrc",
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
