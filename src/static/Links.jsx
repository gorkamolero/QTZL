import React from 'react'
import { darkest } from 'constants/theme'
import { SocialList } from 'components/qtzl/qtzl.css'
import { SocialIcon } from 'react-social-icons'

const Links = ({links}) => (
  <SocialList>
    {links.map((link, i) => (
      <SocialIcon key={i}
        url={link.URL}
        style={{ height: 25, width: 25 }}
        network={link.Name.toLowerCase()}
        target="_blank"
        rel="noopener noreferrer"
        bgColor={darkest} />
    ))}
  </SocialList>
)

export default Links
