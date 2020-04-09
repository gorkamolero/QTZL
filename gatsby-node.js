const path = require('path')
const slug = require('slug')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions

  const ReleaseTemplate = path.resolve('./src/templates/release.js')
  const ArtistTemplate = path.resolve('./src/templates/artist.js')
  const AtlasTemplate = path.resolve('./src/templates/atlas.js')

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
    } } }) => {
      createPage({
        path: `artists/${Name}`,
        component: ArtistTemplate,
        context: { Name }
      })
    })
  })

  const atlas = graphql(`
    {
      allAirtable(
        filter: {
          table: { eq: "Atlas by QTZL" }
          data: { Published: { eq: true } }
        }
      ) {
        edges {
          node {
            data {
              Nombre
              Num
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) Promise.reject(result.errors)
    const { edges } = result.data.allAirtable
    console.log(edges)

    edges.forEach(({ node: { data: {
      Nombre,
      Num
    } } }) => {
      createPage({
        path: `atlas/${Num}-${slug(Nombre)}`,
        component: AtlasTemplate,
        context: { Nombre }
      })
    })
  })

  return Promise.all([releases, artists, atlas])
}

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  let preConfig = {
    node: { fs: 'empty' },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.worker.js$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                publicPath: '/',
              },
            },
          ],
        },
      ],
    },
    output: {
      libraryTarget: 'this',
    },
  }

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === "build-html") {
    preConfig.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
        {
          test: /worker-loader/,
          use: loaders.null(),
        },
      ],
    }
  }

  actions.setWebpackConfig(preConfig)

  const config = getConfig()

  config.output.globalObject = 'this'
  // config.output.publicPath = '/'
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.worker.js$/i,
      exclude: /node_modules/,
      use: [
        {
          loader: 'worker-loader',
          options: {
            publicPath: '/',
          },
        },
      ],
    },
  ]
  actions.replaceWebpackConfig(config)
}
