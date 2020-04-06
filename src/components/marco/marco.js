import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Parallax from 'parallax-js'
import { useWindowSize } from '@react-hook/window-size/throttled'

import AtlasPNG from 'images/Atlas.png'
import Marco1 from './marco1'
import Marco2Alt from './marco2alt'
import Marco3 from './marco3'

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

  const [width, height] = useWindowSize()

  const getDepth = (min, max) => Math.random() * (max - min) + min
  const getWidth = x => (x * width) / 1920
  const getHeight = x => (x * height) / 1080
  const getX = x => (x * width) / 1920 // const getX = x => (100 * (x * width)) / 1920 / width + '%'
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
        <Marco3
          getDepth={getDepth}
          getWidth={getWidth}
          getHeight={getHeight}
          getX={getX}
          getY={getY}
          width={width}
          height={height}
          setIsLoaded={setIsLoaded}
        />
        <Marco2Alt
          getWidth={getWidth}
          getHeight={getHeight}
          getDepth={getDepth}
          width={width}
          height={height}
        />

        <Marco1
          getWidth={getWidth}
          getHeight={getHeight}
          getDepth={getDepth}
          width={width}
          height={height}
        />

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
  transform: translate(-45%,50%);
`

export default Marco
