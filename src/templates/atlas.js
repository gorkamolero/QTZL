import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Viz from 'components/Viz'
import { navigate } from 'gatsby'

const Atlas = ({
  data: {
    airtable: {
      data,
    },
  },
}) => {
  return (
    <Layout bg={data.Imagen.localFiles[0].colors} variant="atlas">
      {typeof window === 'object' && <Viz {...data} />}
    </Layout>
  )
}

export default Atlas

export const pageQuery = graphql`
  query atlasItemQuery($Nombre: String!) {
    airtable(table: { eq: "Atlas by QTZL" }, data: { Nombre: { eq: $Nombre } }) {
      data {
        Nombre
        Imagen {
          localFiles {
            colors {
              ...GatsbyImageColors
            }
          }
        }
        Audio {
          localFiles {
            publicURL
            absolutePath
          }
        }
        Num
        Texto
        URL
      }
    }
  }
`

// publicURL
