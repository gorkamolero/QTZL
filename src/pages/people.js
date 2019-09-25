import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Head from 'components/head'
import ListItem from 'components/list-item'
import Layout from 'components/layout'
import Box from 'components/box'

const Artists = () => (
  <Layout>
    <Box>
      <ArtistList />
    </Box>
  </Layout>
)

const ArtistList = () => {
  const { qtzlctl } = useStaticQuery(graphql`
    query {
      qtzlctl: allAirtable(
        filter: { table: { eq: "Artists" } },
        sort: {
          fields: [data___Notation],
          order: DESC
        }
      ) {
        edges {
          node {
            id
            data {
              Name
              Releases
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Head pageTitle="Releases" />
      <>
        {qtzlctl.edges.map(({
          node: {
            id,
            data: {
              Name,
              Releases
            }
          }
        }) => {
          if(Releases !== null) return (
            <ListItem size="small" key={id}>
              <Link to={`/artists/${Name}`}>
                <h2>{Name}</h2>
              </Link>
            </ListItem>
          )
        })}
      </>
    </>
  )
}

export default Artists
