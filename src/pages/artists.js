import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Head from 'components/head'
import ListItem from 'components/list-item'
import Layout from 'components/layout'
import Box from 'components/box'
import Title from 'components/title'

const Artists = () => (
  <Layout>
    <Box>
      <Title as="h2" size="large">Artists</Title>

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
      <div>
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
            <ListItem key={id}>
              <Link to={`/artists/${Name}`}>
                <h2>{Name}</h2>
              </Link>
            </ListItem>
          )
        })}
      </div>
    </>
  )
}

export default Artists
