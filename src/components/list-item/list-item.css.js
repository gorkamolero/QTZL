import styled from 'styled-components'
import MEDIA from 'helpers/mediaTemplates'

export const Item = styled.article`
  display: block;
  padding: 1.618rem 0;
  border-bottom: 1px solid transparent;
  font-weight: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '400'
      default:
        return '500'
    }
  }};
  font-size: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '3.2rem'
      default:
        return '2rem'
    }
  }};
  line-height: 1.2;

  ${MEDIA.TABLET`
    font-size: ${({ size }) => () => {
      switch (size) {
        case 'large':
          return '2.6rem'
        default:
          return '2rem'
      }
    }};
  `};

  a {
    text-decoration: none;
    display: block;
  }

  position: relative;
  &:after {
    content: '';
    transition: width 1s ease;
    width: 0;
    height: 1px;
    background: var(--accent);
    position: absolute;
    bottom: 0; left: 0;
  }

  &:hover:after {
    width: 100%;
  }
`
