import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: -1;
`

export default Overlay
