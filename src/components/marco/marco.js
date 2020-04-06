import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Parallax from 'parallax-js'
import Img from 'gatsby-image'
import { useWindowSize } from '@react-hook/window-size/throttled'

import AtlasPNG from 'images/Atlas.png'
import Marco1 from './marco1'

export const useParallax = () => {
  const ref = useRef(null)

  useEffect(() => {
    const p = new Parallax(ref.current)
    return () => p.destroy()
  }, [ref])

  return ref
}

const Marco = ({setIsLoaded}) => {
  const parallaxElement = useParallax()
  const [loaded, setLoaded] = React.useState(0)

  const {
    marcos: { edges },
  } = useStaticQuery(graphql`
    query {
      marcos: allAirtable(filter: { table: { eq: "Marcos" } }) {
        edges {
          node {
            id
            data {
              Image {
                localFiles {
                  childImageSharp {
                    fixed(width: 400) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
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


  React.useEffect(() => {
    if (loaded > 100) setIsLoaded()
  }, [loaded])

  const [width, height] = useWindowSize()

  const getDepth = (min, max) => Math.random() * (max - min) + min
  const getWidth = x => (x * width) / 1920
  const getHeight = x => (x * height) / 1080
  const getX = x => (x * width) / 1920
  // const getX = x => (100 * (x * width)) / 1920 / width + '%'
  const getY = y => (y * height) / 1080


  return (
    <>
      <div
        ref={parallaxElement}
        id="scene"
        // data-relative-input="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {edges.sort((a, b) => b.node.data.Sort - a.node.data.Sort).filter(el => !el.node.data.Marco.includes('1') ).map(
          (
            {
              node: {
                id,
                data: { Image, Depth, Width, Height, CoordsX, CoordsY, Sort, Marco, Name: Position },
              },
            },
            i
          ) => {
            return (
              <div
                key={id}
                data-depth={(Depth * Sort * 1) / 100}
                className={Marco}
              >
                <Img
                  fixed={Image.localFiles[0].childImageSharp.fixed}
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
                    objectFit: "contain",
                    objectPosition: `center ${Position}`
                  }}

                  onLoad={() => setLoaded(loaded + 1)}
                />
              </div>
            )
          }
        )}

        <Marco1 getWidth={getWidth} getHeight={getHeight} getDepth={getDepth} width={width} height={height} />

        <div data-depth="0.05">
          <AtlasLogo className="atlas-logo">
            <img src={AtlasPNG} alt="Atlas by QTZL" />
          </AtlasLogo>
        </div>
      </div>
    </>
  )
}

const AtlasLogo = styled.div`
  position: fixed;
  /* top: 6em; */
  left: 50vw;
  transform: translate(-50%, 100%)
`

export default Marco
