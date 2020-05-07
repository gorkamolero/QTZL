import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Viz from 'components/Viz'
import { navigate } from 'gatsby'
import { useNetworkStatus } from 'react-adaptive-hooks/network'
import { Player } from 'components/qtzl/qtzl.css'

const Atlas = ({
  data: {
    airtable: { data },
  },
}) => {
  const { connection } = useNetworkStatus()
  return (
    <Layout bg={data.Imagen.localFiles[0].colors} variant="atlas">
      {['slow-2g', '2g', '3g'].includes(connection) ? (
        <Player url={data.URL} />
      ) : (
        typeof window === 'object' && data.Audio.localFiles && <Viz {...data} />
      )}
    </Layout>
  )
}

export default Atlas

export const pageQuery = graphql`
  query atlasItemQuery($Nombre: String!) {
    airtable(
      table: { eq: "Atlas by QTZL" }
      data: { Nombre: { eq: $Nombre } }
    ) {
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
