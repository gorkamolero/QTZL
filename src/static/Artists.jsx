import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Head from 'components/head'
import ListItem from 'components/list-item'

const Artists = () => {
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
              BIO
              Releases
              Gallery {
                url
              }
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
              BIO,
              Releases,
              Gallery: {
                url
              }
            }
          }
        }) => (
          <ListItem key={id}>
            <Link to={`/artists/${Name}`}>
              <h2>{Name}</h2>
            </Link>
          </ListItem>
        ))}
      </div>
    </>
  )
}

export default Releases
