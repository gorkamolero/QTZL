import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'
import BackgroundImage from 'gatsby-background-image'
import Overlay from 'components/overlay'
import { Player } from 'components/qtzl/qtzl.css'
import {darkest} from 'constants/theme'


const Release = ({
  data: {
    airtable: {
      data: {
        Info,
        Name,
        Notation,
        SoundCloud,
        Release,
        Video,
        Background
      }
    }
  }
}) => {

  useEffect(() => {
    if(!Background || !Background.localFiles || !Background.localFiles[0].colors) return
    document.documentElement.style.setProperty('--siteBorder', Background.localFiles[0].colors.vibrant);

    return () => { document.documentElement.style.setProperty('--siteBorder', darkest); }
  }, [])

  return (
    <BackgroundImage
      Tag="section"
      fluid={Background.localFiles[0].childImageSharp.fluid}
      style={{ minHeight: '100vh' }}
      className="overlayed"
      // backgroundColor={`#040e18`}
    >
      <Overlay />
      <Layout variant="dark">

        <Box>
          <div className="read">
            <Title as="h2" size="large">{Name}</Title>

            <ReactMarkdown source={Info}/>
            { Video && <Player className={Player} url={Video} playing/> }
            { SoundCloud && (<Player className={Player} url={SoundCloud} playing />) }
          </div>
        </Box>
      </Layout>
    </BackgroundImage>
  )
}

export default Release

export const pageQuery = graphql`
  query releaseItemQuery($slug: String!) {
    airtable(table: {eq: "Releases"}, data: {Release: {eq: $slug}}) {
      data {
        Info
        Name
        Notation
        SoundCloud
        Release
        Video
        Background {
          localFiles {
            colors {
              ...GatsbyImageColors
            }
            childImageSharp {
              fluid(quality: 90, maxWidth: 2500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
