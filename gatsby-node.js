const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions

  const ReleaseTemplate = path.resolve('./src/templates/release.js')
  const ArtistTemplate = path.resolve('./src/templates/artist.js')
  const Atlas = path.resolve('./src/templates/atlas.js')

  const releases = graphql(`
    {
      allAirtable(filter: {table: {eq: "Releases"}}) {
        edges {
          node {
            data {
              Name
              Release
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) Promise.reject(result.errors)
    const { edges } = result.data.allAirtable

    edges.forEach(({ node: { data: {
      Release,
    }}}) => {
      createPage ({
        path: `releases/${Release}`,
        component: ReleaseTemplate,
        context: { slug: Release }
      })
    })
  })

  const artists = graphql(`
    {
      allAirtable(filter: {table: {eq: "Artists"}}) {
        edges {
          node {
            data {
              Name
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) Promise.reject(result.errors)
    const { edges } = result.data.allAirtable

    edges.forEach(({ node: { data: {
      Name,
    }}}) => {
      createPage ({
        path: `artists/${Name}`,
        component: ArtistTemplate,
        context: { Name }
      })
    })
  })

  return Promise.all([releases, artists])
}

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  const config = {
    node: { fs: 'empty' },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
  }

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === "build-html") {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
      ],
    }
  }

  actions.setWebpackConfig(config)
}
