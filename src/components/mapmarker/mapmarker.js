import React from "react";
import { Player } from 'components/qtzl/qtzl.css'
import PropTypes from "prop-types";
import styled from "styled-components";
import { RingSpinner } from 'components/ringspinner'
import BackgroundImage from 'gatsby-background-image'
import CloseSVG from './cancel'
import Color from 'color'

const Container = styled.div`
  position: relative;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.8) 80%
    );
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ContentColumn = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  display: block;
  margin-bottom: 8px;
  color: ${props => props.color};
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${props => props.color};
`;

const TagContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: ${props => props.tagBg};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 3px;
  width: 60px;
  border-radius: 3px;
  text-align: center;
  color: ${props => props.color};
`;

const TagText = styled.span``;

const IconContainer = styled.div`
  color: white;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  cursor: pointer;
  svg {
    fill: white;
    color: white;
    width: 12px;
    height: 12px;
  }
`

const MapMarker = ({
  title,
  titleColor = "white",
  subtitleColor = "white",
  subtitle,
  tag,
  tagBg = "#E33C36",
  tagColor = "white",
  bottomIconName,
  bottomIconSize = 1,
  bgPhoto,
  bgImage,
  colors,
  URL
}) => {
  const [reveal, setReveal] = React.useState(false)


  const palette = {
    main: colors ? Color(colors.vibrant): '',
    shadow: colors ? Color(colors.vibrant).alpha(0.8).lighten(0.2): '',
    background: colors ? Color(colors.vibrant).alpha(0.8): ''
  }

  console.log('COLORS', colors)

  if (!reveal) return (
    <div
      onMouseOver={() => setReveal(true)}
      onFocus={() => console.log('Setting')}
      style={{
        borderRadius: '100%',
        boxShadow: `${palette.shadow} 0px 0px 20px 20px`,
        background: palette.background,
      }}
      className="glower"
    >
      <RingSpinner hoverRef color={palette.main} />
    </div>
  )
  return (
    <Container>
      <CloseIcon className="cancel" onClick={() => setReveal(false)}>
        <CloseSVG />
      </CloseIcon>
      <BackgroundImage
        fluid={bgImage}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          zIndex: '-1'
        }}
      />

      {tag && (
        <TagContainer tagBg={tagBg} color={tagColor}>
          <TagText>{tag}</TagText>
        </TagContainer>
      )}
      <Content>
        <ContentColumn>
          {(title || subtitle) && (
            <>
              <Title color={titleColor}>{title}</Title>
              <Subtitle color={subtitleColor}>{subtitle}</Subtitle>
            </>
          )}
          {URL && <Player className={Player} url={URL} />}
        </ContentColumn>
        {bottomIconName && (
          <IconContainer>
            <i className={`${bottomIconName} fa-${bottomIconSize}x`} />
          </IconContainer>
        )}
      </Content>
    </Container>
  )
};

MapMarker.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  subtitleColor: PropTypes.string,
  subtitle: PropTypes.string,
  tag: PropTypes.string,
  tagBg: PropTypes.string,
  tagColor: PropTypes.string,
  bottomIconName: PropTypes.string,
  bottomIconSize: PropTypes.number,
  bgPhoto: PropTypes.string,
  totalReviews: PropTypes.number,
  ratingAverage: PropTypes.oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
};

export default MapMarker;
