import React from "react";
import { Link } from 'gatsby'
import slug from 'slug'
import { PlayArrow } from '@material-ui/icons'
import PropTypes from "prop-types";
import styled from "styled-components";
import { keyframes } from 'styled-components'
import Fade from 'react-reveal/Fade'
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
  max-width: ${props => (props.reveal ? '340px' : '0px')};
  max-height: ${props => (props.reveal ? '2000px' : '0px')};
`

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


export const QTZLPlay = styled(Link)`
  background: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 108px;
  animation: ${playAnimate} 2s linear infinite;
  cursor: pointer;
  width: 100px;
  height: 100px;

  margin-top: 2em;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => Color(props.color.string())};
  color: rgba(255, 255, 255, .7)

  i {
    color: #ffc107;
    font-size: 102px;
  }

  svg {
    width: 3em;
    height: 3em;
    fill: ${props => Color(props.color.string())};
    color: ${props => Color(props.color.string())};
    color: rgba(255, 255, 255, .7)
    fill: rgba(255, 255, 255, .7)
  }
`

export const playAnimate = keyframes`
  0%{
    box-shadow: 0 0 0 0 rgba(255,193,7,0.7);
  }
  40%{
    box-shadow: 0 0 0 50px rgba(255,193,7,0);
  }
  80%{
    box-shadow: 0 0 0 50px rgba(255,193,7,0);
  }
  100%{
    box-shadow: 0 0 0 rgba(255,193,7,0);
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
  URL,
  Num
}) => {
  const [reveal, setReveal] = React.useState(false)


  const palette = {
    main: colors ? Color(colors.vibrant): '',
    shadow: colors ? Color(colors.vibrant).alpha(0.8).lighten(0.2): '',
    background: colors ? Color(colors.vibrant).alpha(0.8): ''
  }

  console.log(palette)
  return (
    <>
      {reveal || (
        <div
          onMouseOver={() => setReveal(true)}
          onFocus={() => console.log('Setting')}
          style={{
            borderRadius: '100%',
            boxShadow: `${palette.shadow} 0px 0px 20px 20px`,
            background: palette.background,
            width: 30,
            height: 30,
          }}
          className="glower"
        >
          <RingSpinner size={30} hoverRef color={palette.main} />
        </div>
      )}

      <Fade collapse when={reveal}>
        <Container reveal={reveal}>
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
              zIndex: '-1',
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
              <QTZLPlay
                to={`/atlas/${Num}-${slug(title)}`}
                style={{ color: palette.main }}
                color={palette.main}
              >
                <PlayArrow />
              </QTZLPlay>
            </ContentColumn>

            {bottomIconName && (
              <IconContainer>
                <i className={`${bottomIconName} fa-${bottomIconSize}x`} />
              </IconContainer>
            )}
          </Content>
        </Container>
      </Fade>
    </>
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
