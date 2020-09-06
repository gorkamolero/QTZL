import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Head from 'components/head'
import LoadingScreen from 'components/loadingScreen'
import Layout from 'components/layout'
import Box from 'components/box'
import Map from 'components/map'
import MapMarker from 'components/mapmarker'
import Marco from 'components/marco'
import MarcoMobile from 'components/marcomobile/marco'
import Fade from 'react-reveal/Fade'
import useMedia from 'use-media'

const Atlas = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [markers, setMarkers] = React.useState(null)
  const isPortrait = useMedia('all and (orientation: portrait)')
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
                localFiles {
                  colors {
                    ...GatsbyImageColors
                  }
                  childImageSharp {
                    fixed {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                  }
                }
              }
              Longitud
              Latitud
              Texto
              URL
              Num
            }
          }
        }
      }
    }
  `)


  console.log('PORTRAIT', isPortrait)

  React.useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000)
    if (!atlas) return
    const markers = atlas.edges.map(({ node: { data } }) => {
      console.log(data)
      return {
        coordinates: [data.Longitud, data.Latitud],
        element: (
          <MapMarker
            Num={data.Num}
            title={data.Nombre}
            subtitle={data.Texto}
            colors={data.Imagen.localFiles[0].colors}
            bgImage={data.Imagen.localFiles[0].childImageSharp.fixed}
            {...data}
          />
        ),
      }
    })



    setMarkers(markers)
  }, [atlas])

  if (!markers) return null
  return (
    <>
      <Layout noBorder={true}>
        <Box>
          <Head />
          <Fade ssrFadeout top collapse when={!isLoaded}>
            <LoadingScreen />
          </Fade>

          <Fade ssrFadeout top collapse when={isLoaded}>
            <Map markers={markers} height="100%" width="100%" />
          </Fade>

          {!isPortrait ? (
            <Marco
              setIsLoaded={() => {
                console.log('Vamonos')
                setTimeout(() => setIsLoaded(true), 2000)
              }}
            />
          ) : (
            <MarcoMobile
              setIsLoaded={() => {
                console.log('Vamonos')
                setTimeout(() => setIsLoaded(true), 2000)
              }}
            />
          )}
        </Box>
      </Layout>
    </>
  )
}
export default Atlas
