import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'

const Artist = ({
  data: {
    airtable: {
      data: { Nombre, Imagen },
    },
  },
}) => (
  <Layout>
    <Box className="read">
      <Title as="h1" size="large">
        {Nombre}
      </Title>
    </Box>
  </Layout>
)

export default Artist

export const pageQuery = graphql`
  query atlasQuery($Name: String!) {
    airtable(table: { eq: "Atlas by QTZL" }, data: { Name: { eq: $Name } }) {
      data {
        Name
        BIO
        Gallery {
          url
          thumbnails {
            small {
              url
            }
            large {
              url
            }
            full {
              url
            }
          }
        }
      }
    }
  }
`
