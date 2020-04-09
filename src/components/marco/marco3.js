import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

const Marco3 = ({setIsLoaded, getDepth, getWidth, getHeight, getX, getY}) => {
  const [loaded, setLoaded] = React.useState(0)

  React.useEffect(() => {
    if (loaded > 56) setIsLoaded()
  }, [loaded])

  const {
    marcos: { edges },
  } = useStaticQuery(graphql`
  query {
    marcos: allAirtable(
      filter: {
        table: { eq: "Marcos" }
        data: { Marco: { eq: "Marco 3" } }
      }
      ) {
        edges {
          node {
            id
            data {
              Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 50) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              Width
              Height
              CoordsX
              CoordsY
              Depth
              Sort
              Marco
              Name
            }
          }
        }
      }
    }
    `)


  return (
    <>
    {edges
      .sort((a, b) => b.node.data.Sort - a.node.data.Sort)
      .map(
        ({
          node: {
            id,
            data: { Image, Depth, Width, Height, CoordsX, CoordsY, Sort, Marco, Name: Position, },
          },
        },i) => {
          return (
            <div
              key={id}
              data-depth={(Depth * Sort * 1) / 100}
              className={Marco}
            >
            <Img
              fluid={Image.localFiles[0].childImageSharp.fluid}
              alt=""
              style={{
                position: 'absolute',
                width: getWidth(Width),
                height: getHeight(Height),
                left: getX(CoordsX),
                top: getY(CoordsY),
                // zIndex: Sort
              }}
              imgStyle={{
                objectFit: 'contain',
                objectPosition: `center ${Position}`,
              }}
              onLoad={() => setLoaded(loaded + 1)}
            />
            </div>
          )
        }
    )}
    </>
  )
}

export default Marco3
