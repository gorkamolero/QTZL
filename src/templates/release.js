import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'
import BackgroundImage from 'gatsby-background-image'
import Overlay from 'components/overlay'


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
  console.log(Background)
  return (

    <BackgroundImage
      Tag="section"
      fluid={Background.localFiles[0].childImageSharp.fluid}
      style={{ minHeight: '100vh' }}
      className="overlayed"
      // backgroundColor={`#040e18`}
    >
      <Overlay />
      <Layout>

        <Box>
          <Title as="h2" size="large">{Name}</Title>

          <ReactMarkdown source={Info}/>
          <p>{SoundCloud}</p>
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
