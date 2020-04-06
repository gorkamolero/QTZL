import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

const Marco1 = () => {
  const marco = useStaticQuery(graphql`
    query {
      file(
        relativePath: { eq: "marco.png" },
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  console.log('MARCO', marco)

  return (
    <Img
      fluid={marco.file.childImageSharp.fluid}
      alt="Marco"
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 999,
        pointerEvents: 'none'
      }}
    />
  )
}

export default Marco1
