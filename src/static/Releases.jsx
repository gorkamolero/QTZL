import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
// import SEO from "components/common/SEO"

const Releases = () => {
  const { airtable } = useStaticQuery(graphql`
    query {
      airtable: allAirtable(
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
              Notation
              Artist
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      {/* <SEO title="Scenes" /> */}
      <h1>Static Releases</h1>
      <div>
        {airtable.edges.map(({
          node: {
            id,
            data: {
              Notation,
              Name,
              Artist
            }
          }
        }) => (
          <div key={id}>
            <Link to={id}>
              <h3>{Artist}</h3>
            <h2>{Notation} - {Name}</h2>
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Releases
