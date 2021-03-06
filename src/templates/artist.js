import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'

const Artist = ({
  data: {
    airtable: {
      data: { Name, BIO, Gallery },
    },
  },
}) => (
  <Layout>
    <Box className="read" style={{ maxWidth: '80ch' }}>
      <Title as="h1" size="large">
        {Name}
      </Title>

      <ReactMarkdown source={BIO} />
    </Box>
  </Layout>
)

export default Artist

export const pageQuery = graphql`
  query artistItemQuery($Name: String!) {
    airtable(table: { eq: "Artists" }, data: { Name: { eq: $Name } }) {
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
