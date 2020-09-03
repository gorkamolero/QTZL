import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Viz from 'components/Viz'
import { navigate } from 'gatsby'
import { useNetworkStatus } from 'react-adaptive-hooks/network'
import { Player } from 'components/qtzl/qtzl.css'
import ReactJkMusicPlayer from 'static/react-jinke-music-player/lib'
import 'static/react-jinke-music-player/lib/styles/index.less'
import '../overrides.less'

const JinkeOptions = {
  glassBg: true,
  mode: 'full',
  toggleMode: false,
  showPlayMode: false,
  showThemeSwitch: false,
  showDownload: false,
}

const Atlas = ({
  data: {
    airtable: { data },
  },
}) => {
  const { connection } = useNetworkStatus()
  console.log(data)
  return (
    <Layout bg={data.Imagen.localFiles[0].colors} variant="atlas">
      {/* {['slow-2g', '2g', '3g'].includes(connection) ? (
        <Player url={data.URL} />
      ) : (
        typeof window === 'object' && data.Audio.localFiles && <Viz {...data} />
      )} */}
      {/* <Player url={data.URL} /> */}

      <ReactJkMusicPlayer
        {...JinkeOptions}
        audioLists={[
          {
            musicSrc: data.Audio.localFiles[0].publicURL,
            name: `ATLAS${data.Num} by QTZL - ${data.Nombre}`,
            singer: `ATLAS${data.Num} by QTZL - ${data.Nombre}`,
            cover: data.Imagen.localFiles[0].childImageSharp.fixed.src,
          },
        ]}
      />
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
                   childImageSharp {
                     fixed {
                       ...GatsbyImageSharpFixed_withWebp_tracedSVG
                     }
                   }
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
