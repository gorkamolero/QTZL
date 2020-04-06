import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

const Marco2Alt = ({ width, height, getWidth, getHeight, getDepth }) => {
  const { marcos } = useStaticQuery(graphql`
    query {
      marcos: allAirtable(
        filter: {
          table: { eq: "Marcos" }
          data: { Marco: { eq: "Marco 2 Alt" } }
        }
      ) {
        edges {
          node {
            id
            data {
              Image {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 2500) {
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
              Name
              Sort
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {marcos.edges.map(
        (
          {
            node: {
              id,
              data: { Image, Depth, Width, Height, Name: Position },
            },
          },
          i
        ) => {
          const isVertical = ['top', 'bottom'].includes(Position)
          const isTop = Position.includes('top')
          const isBottom = Position.includes('bottom')
          const isLeft = Position.includes('left')
          const isRight = Position.includes('right')

          const objectPosition = () => {
            if (isTop) return 'center top'
            if (isBottom) return 'center bottom'
            if (isLeft) return 'left center'
            if (isRight) return 'center right'
          }

          return (
            <div key={id} data-depth={getDepth(0, Depth)} className="full">
              <Img
                fluid={Image.localFiles[0].childImageSharp.fluid}
                alt=""
                className={`MarcoItem Position ${Position}`}
                style={{
                  position: 'absolute',
                  width: getWidth(Width) + 10,
                  height: getHeight(Height) + 10,
                }}
                imgStyle={{
                  objectFit: isVertical ? 'cover' : 'cover',
                  objectPosition: objectPosition(),
                }}
              />
            </div>
          )
        }
      )}
    </>
  )
}

export default Marco2Alt
