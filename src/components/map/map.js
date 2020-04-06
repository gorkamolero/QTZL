/* eslint-disable max-len, no-underscore-dangle */
import React, { useEffect, useRef } from 'react'
import * as turf from '@turf/turf'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'
import { hasWindow, getCenterAndZoom } from './util'

// import { siteMetadata } from '../../../gatsby-config'

// This wrapper must be positioned relative for the map to be able to lay itself out properly
const Wrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  left: 0;
  top: 0;
  flex: 1 0 auto;
`

const Map = ({
  width,
  height,
  zoom,
  center,
  bounds,
  padding,
  styles,
  sources,
  layers,
  markers,
  minZoom,
  maxZoom,
}) => {

  // TODO PASS TO CONFIG
  const mapboxToken  = `pk.eyJ1IjoiZ29ya2Ftb2xlcm8iLCJhIjoiY2s4ZGI4anVrMDkxZTNtcGdubzdhMWY2aCJ9.-rS_HIB4lf1vH2L2pEzEjg`

  if (!mapboxToken) {
    console.error(
      'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
    )
  }

  // if there is no window, we cannot render this component
  if (!hasWindow) return null

  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef(null)

  // this ref holds the map object once we have instantiated it, so that we
  // can use it in other hooks
  const mapRef = useRef(null)

  // construct the map within an effect that has no dependencies
  // this allows us to construct it only once at the time the
  // component is constructed.
  useEffect(() => {
    let mapCenter = center
    let mapZoom = zoom

    // If bounds are available, use these to establish center and zoom when map first loads
    if (bounds && bounds.length === 4) {
      const { center: boundsCenter, zoom: boundsZoom } = getCenterAndZoom(
        mapNode.current,
        bounds,
        padding
      )
      mapCenter = boundsCenter
      mapZoom = boundsZoom
    }

    // Token must be set before constructing map
    mapboxgl.accessToken = mapboxToken

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/gorkamolero/ck8hm088d0i3y1iohvu0dywky`,
      center: mapCenter,
      zoom: mapZoom,
      minZoom,
      maxZoom,
      attributionControl: false,
    })
    mapRef.current = map
    window.map = map // for easier debugging and querying via console

    // map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // if (styles.length > 1) {
    //   map.addControl(
    //     new StyleSelector({
    //       styles,
    //       token: mapboxToken,
    //     }),
    //     'bottom-left'
    //   )
    // }

    map.on('load', () => {
      console.log('map onload')
      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach(layer => {
        map.addLayer(layer)
      })

      markers.forEach(marker => {
        const placeholder = document.createElement('div')
        placeholder.className = 'marker'

        ReactDOM.render(marker.element, placeholder)

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(placeholder)
          .setLngLat(marker.coordinates)
          .addTo(map);
      })

      if (markers) {
        const coordinator = markers.map(marker => marker.coordinates)
        const line = turf.lineString(coordinator)
        const bbox = turf.bbox(line)
        const padding = 300
        map.fitBounds(bbox, {
          padding: {top: padding, bottom: padding, left: padding, right: padding}
        })
      }
    })

    // hook up map events here, such as click, mouseenter, mouseleave
    // e.g., map.on('click', (e) => {})

    // when this component is destroyed, remove the map
    return () => {
      map.remove()
    }
  }, [])

  // You can use other `useEffect` hooks to update the state of the map
  // based on incoming props.  Just beware that you might need to add additional
  // refs to share objects or state between hooks.

  return (
    <Wrapper width={width} height={height}>
      <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
    </Wrapper>
  )
}

Map.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  bounds: PropTypes.arrayOf(PropTypes.number),
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  styles: PropTypes.arrayOf(PropTypes.string),
  padding: PropTypes.number,
  // sources: PropTypes.object,
  markers: PropTypes.arrayOf(PropTypes.object),
  // layers: PropTypes.arrayOf(PropTypes.object),
}

Map.defaultProps = {
  width: '100vw',
  height: '100vh',
  center: [0, 0],
  zoom: 0,
  bounds: null,
  minZoom: 0,
  maxZoom: 24,
  // styles: ['light-v9', 'dark-v9', 'streets-v11'],
  padding: 0.1, // padding around bounds as a proportion
  sources: {},
  layers: [],
}

export default Map
