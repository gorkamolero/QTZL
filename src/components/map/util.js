import geoViewport from '@mapbox/geo-viewport'

/**
 * Calculate the appropriate center and zoom to fit the bounds, given padding.
 * @param {Element} - map DOM node used to calculate height and width in screen pixels of map
 * @param {Array(number)} bounds - [xmin, ymin, xmax, ymax]
 * @param {float} padding - proportion of calculated zoom level to zoom out by, to pad the bounds
 */
export const getCenterAndZoom = (mapNode, bounds, padding = 0) => {
  const { width, height } = mapNode
  const viewport = geoViewport.viewport(
    bounds,
    [width, height],
    undefined,
    undefined,
    undefined,
    true
  )

  // Zoom out slightly to pad around bounds

  const zoom = Math.max(viewport.zoom - 1, 0) * (1 - padding)

  return { center: viewport.center, zoom }
}

export const hasWindow = typeof window !== 'undefined' && window

export const isUnsupported =
  hasWindow &&
  navigator !== undefined &&
  (/MSIE 9/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent) ||
    /Trident/i.test(navigator.userAgent))

export const isDebug = hasWindow && process.env.NODE_ENV === 'development'
