import styled from 'styled-components'
import ReactPlayer from 'react-player'

export const Player = styled(ReactPlayer)`
  max-width: 100%;
  @media (max-width: 640px) { width: 100% !important; }
  @media (min-width: 768px) {
    opacity: .85;
    transition: opacity .25s ease;
    &:hover { opacity: 1 }
  }
`

export const Logo = styled('h1')`
  font-size: 1.6em;
  letter-spacing: 1em;
  text-transform: uppercase;

  @media (max-width: 640px) {
    letter-spacing: .5em;
  }
`

export const PostLogo = styled('h2')`
  font-size: 0.6em;
  letter-spacing: 0.34em;
  margin-top: 8px;
  text-transform: uppercase;
  font-family: 'Dosis';
  @media (max-width: 640px) {
    font-size: .8em;
  }
`

export const QTZLHeader = styled('header')`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  nav {
    &:hover * { opacity: .5; }
    a {
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.2em;
      font-size: 0.8em;
      padding: .5rem;
      transition: opacity .15s ease;
      &:hover { opacity: 1; }
    }
  }
`

export const SocialList = styled('aside')`
  display: flex;
  align-items: center;

  & > * { margin: 1rem; }
`

export const SuperFooter = styled('footer')`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACKklEQVQ4EWNgIAH4GDCIXahj8MOlhQkoQRCHWTJI/J7DeDDJhkEEh3qwITBLYAaC+CA2GIRbMYj93sZz8Ww7XyNQAC6OxsbrGoZwSwaxn1vkLv88avnS01RQAKoZZiEyDbYUKwHyzvdNwhf/vWj/v7pFtwSrIjRBdOcyeViwS3zdyH/x39eV/7+esn9soivDg6YHg4vsPDDb3ZJD4ssqvsv/38/+//99x/8VPVIZQF0Y6pDFGKHGghT9A7F9bVkllqYy7+RxadRjEHdlYLjjxfDt6etrvz4w/GL485+B8SdQ0Segtn+Mj8pW/Y+fffjvB5A+GAAZxBBizyDxeQ7TxX83Y/7/+3fo/7+/e/7/+zn9/78fM4F41f//Pzb+/3/G4f+XWYI3UxxZlWCaQTTIRWBDPMwZuNYXM6xle8egw8DCxMTA/5+BgR2shIWRiUOEwWEZA+PjLQzvTm4+EzLxu+/+859egWQxACsLAxMPJwMLGHMAaSAW5mNmOdwuWPXvXtX/f9cy/j+bJ7bXTIMblASIAmAXglSm+4jr/T7o9v3/tcz/dyaLrdZV5uDCZwJIIwaWlxTjeLtM4/S/C5H/TzTLzpQTY2fDpg5JDLsdexvkav4dtvh/rJavVYSPGe5K7KqxizJV+PPr/d0o/nVfCXsBLwfxhqB4S0eajePjDL6ja3I4YzhYMb2M5BUUfRhuOl4hULA4ickHQ4IUgQofDrFJEexmpOiBqQUAmROuoDB3XTYAAAAASUVORK5CYII=), auto;

  opacity: .05;
  text-align: center;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  transform: rotate(0deg);
  transform-origin: bottom left;
  position: fixed;
  transition: opacity .15s ease;
  a {color: white;}

  &:hover { opacity: .75 }
  user-select: none;
`

export const Cluster = styled('section')`
  --space: 1rem;
  overflow: hidden;

  & > * {
    display: inline-block;
    & + * { margin: var(--space) }
  }
`
