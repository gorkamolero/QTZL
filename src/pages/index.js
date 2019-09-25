import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'
import { SuperFooter } from 'components/qtzl/qtzl.css'
import { graphql } from 'gatsby'
import Releases from 'static/Releases'

const Index = ({ data }) => (
  <Layout className="index">
    <Box>
      <Title as="h2" size="large">
        {data.homeJson.content.childMarkdownRemark.rawMarkdownBody}
      </Title>

      <Releases />

      <SuperFooter>
        <small>
          <span style={inverseDragon} role="img" aria-label="fuck accesibility">🐉</span>
          ©QTZL by QTZLCTL 2019
          <span role="img" aria-label="fuck accesibility">🐉</span>
        </small>
        <br/>
        <small>
          WORK IN PROGRESS <br/>
          Designed by <a href="https://blitz.media" rel="noopener noreferrer" target="_blank">Blitz!</a>
          <span role="img" aria-label="fuck accesibility">⚡️</span>
        </small>
      </SuperFooter>
    </Box>
  </Layout>
)

Index.propTypes = {
  data: PropTypes.object.isRequired,
}

const inverseDragon = {
  transform: 'scaleX(-1)',
  display: 'inline-block'
}

export default Index

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
    }
  }
`
