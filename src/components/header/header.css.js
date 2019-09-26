import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;

  a {
    color: var(--color-trans);
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover { color: var(--color); }
    &[aria-current] { font-weight: 400; }
  }

  filter: ${({ variant }) => () => {
    switch (variant) {
      case 'dark':
        return 'invert(1)'
      default:
        return 'none'
    }
  }};
`
