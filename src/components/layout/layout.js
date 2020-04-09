import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Head from 'components/head'
import Header from 'components/header'
import GlobalStyle from 'global.css.js'


const Layout = ({ data, children, noBorder, noHead, variant, bg }) => {
  React.useEffect(() => {
    if (noBorder) document.body.classList.add('noBorder')

    if (bg) {
      document.documentElement.style.setProperty('--bgLight', bg.lightVibrant)
      document.documentElement.style.setProperty('--bgDark', bg.vibrant)
      document.documentElement.style.setProperty('--siteBorder', bg.darkVibrant)
    }
  }, [noBorder, bg])
  return (
    <>
      <GlobalStyle />
      <Head />
      {noHead || <Header variant={variant} title={data.site.siteMetadata.siteTitle} />}
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
}

const LayoutWithQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            siteTitle
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)

LayoutWithQuery.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutWithQuery
