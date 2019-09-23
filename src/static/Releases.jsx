import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Head from 'components/head'
import ListItem from 'components/list-item'

const Releases = () => {
  const { qtzlctl } = useStaticQuery(graphql`
    query {
      qtzlctl: allAirtable(
        filter: { table: { eq: "Releases" } },
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
              Release
              Artist_Name
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
              Release,
              Name,
              Artist_Name
            }
          }
        }) => (
          <ListItem key={id}>
            <Link to={`/releases/${Release}`}>
              <h2>{Release} - {Artist_Name} - {Name}</h2>
              </Link>
          </ListItem>
        ))}
      </div>
    </>
  )
}

export default Releases
