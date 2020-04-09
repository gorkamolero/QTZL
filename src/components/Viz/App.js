import React from 'react'
import { appContext } from './Audioviz/context/app-context'
import Audio from './Audioviz/audio'

/**
 * music
 */
import rise from './Audioviz/assets/music/rise.mp3'
import fantastic from './Audioviz/assets/music/fantastic.mp3'
import legendsNeverDie from './Audioviz/assets/music/legends-never-die.mp3'
import shortLegendsNeverDie from './Audioviz/assets/music/short-legends-never-die.mp3'

function App(props) {

  const [oldTracks, setTracks] = React.useState([
    {
      name: 'Small Piece of music LND',
      artist: 'League of Legends',
      url: shortLegendsNeverDie,
    },
    {
      name: 'Legends Never Die',
      artist: 'League of Legends',
      url: legendsNeverDie,
    },
    {
      name: 'Rise',
      artist: 'League of Legends',
      url: rise,
    },
    {
      name: 'Fantastic - Cinematic Sound',
      artist: 'AudioJungle',
      url: fantastic,
    },
  ])

  const tracks = props.Audio.localFiles.map(track => ({
    name: `#ATLAS${props.Num} - ${props.Nombre}`,
    artist: props.Nombre,
    url: track.publicURL,
  }))

  console.log('IN APP', tracks)

  const main = () => {
    return (
      <div className="app">
        <Audio
          {...props}
          key="audio-component"
          tracks={tracks}
          thread="main"
        />
      </div>
    )
  }

  return <appContext.Consumer>{context => main(context)}</appContext.Consumer>
}

export default App
