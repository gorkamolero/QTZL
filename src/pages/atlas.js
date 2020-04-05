import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Head from 'components/head'
import ListItem from 'components/list-item'
import Layout from 'components/layout'
import Box from 'components/box'
import Map from 'components/map'
import MapMarker from 'components/mapmarker'
import Marco from 'components/marco'


const Atlas = () => {
  const [markers, setMarkers] = React.useState(null)
  const { atlas } = useStaticQuery(graphql`
    query {
      atlas: allAirtable(
        filter: {
          table: { eq: "Atlas by QTZL" }
          data: { Published: { eq: true } }
        }
        sort: { fields: [data___Notation], order: DESC }
      ) {
        edges {
          node {
            data {
              Nombre
              Imagen {
                url
              }
              Longitud
              Latitud
              Texto
              URL
            }
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    if (!atlas) return
    const markers = atlas.edges.map(({node: { data }}) => {
      console.log(data)
      return ({
        coordinates: [data.Longitud, data.Latitud],
        element: <MapMarker title={data.Nombre} subtitle={data.Texto} bgPhoto={data.Imagen[0].url} {...data} />
      })
    })

    console.log('FX', markers)
    setMarkers(markers)
  }, [atlas])

  if (!markers) return null
  return (
    <Layout noBorder={true}>
      <Box>
        <Head />
        <Map markers={markers} height="100%" width="100%" />
        <Marco />
      </Box>
    </Layout>
  )
}
export default Atlas
