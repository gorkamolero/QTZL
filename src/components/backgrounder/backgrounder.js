/* global window */
import React from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import ProgressiveImage from 'react-progressive-bg-image';
// import landscapeX60 from '../statics/images/landscapeX60.jpg';
// import landscape from '../statics/images/landscape.jpg';
// import portraitX60 from '../statics/images/portraitX60.jpg';
// import portrait from '../statics/images/portrait.jpg';

/**
 * matchMedia polyfill
 * set default value to true
 * ref: https://github.com/WickyNilliams/enquire.js/issues/82#issuecomment-26990494
 * @author Michael Hsu
 */
window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: true, // Desktop First
      addListener: () => {},
      removeListener: () => {},
    };
  };

const StyledProgressiveImage = styled(ProgressiveImage)`
  width: 100%; height: 100%;
  position: absolute;
  top: 0; bottom: 0; right: 0; left: 0;
  background-position: center center;
  background-size: cover;
  z-index: -1;
`;

const CoverImage = props => (
  <Media query={{ minWidth: 1024 }}>
    {matches => (
      <StyledProgressiveImage
        src={matches ? props.hi : props.lo}
        placeholder={props.thumb}
      />
    )}
  </Media>
);

CoverImage.displayName = 'CoverImage';

export default CoverImage;
