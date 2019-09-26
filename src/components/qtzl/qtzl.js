import React from 'react'
import { Link } from 'gatsby'
import {
  QTZLBody,
  Logo,
  PostLogo,
  QTZLHeader,
  SocialList,
  SuperFooter,
  ListItem,
} from './qtzl.css'
import { SocialIcon } from 'react-social-icons'

const inverseDragon = {
  transform: 'scaleX(-1)',
  display: 'inline-block',
}

const Home = ({ content, links }) => {
  useEffect(() => {
    console.log(`
Welcome to 🐉 QTZLCTL 🐉

This website is built by Gorka Molero with some help from his friends
Made with React, Gatsby, Airtable & Styled Components
-> https://gorka.space
-> https://blitz.media
          `)
  }, [])

  return (
    <QTZLBody>
      <QTZLHeader>
        <div>
          <Logo>QTZLCTL</Logo>
          <PostLogo>A Transatlantic Musical Collective</PostLogo>
        </div>

        <nav>
          <NavLink strict to="/artists">
            Artists
          </NavLink>
          <span className="navSeparator"> / </span>
          <NavLink strict to="/">
            Releases
          </NavLink>
        </nav>
      </QTZLHeader>

      <section className="content">
        {content.map((item, i) => (
          <NavLink key={i} to={item.url} className={ListItem}>
            {item.name}
          </NavLink>
        ))}
      </section>

      <SocialList>
        {links.map((link, i) => (
          <SocialIcon
            key={i}
            url={link.fields.URL}
            style={{ height: 25, width: 25 }}
            color="black"
            network={link.fields.Name.toLowerCase()}
          />
        ))}
      </SocialList>

      <SuperFooter>
        <small>
          <span style={inverseDragon}>🐉</span> ©QTZL/QTZLCTL 2019 All Rights
          Reserved 🐉
        </small>
        <br />
        <small>
          Designed by{' '}
          <a
            href="https://blitz.media"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blitz!
          </a>
          ⚡️
        </small>
      </SuperFooter>
    </QTZLBody>
  )
}

export default Home
