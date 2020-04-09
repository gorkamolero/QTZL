import React from 'react'
import MyAppContext from './Audioviz/context/app-context'
import App from './App'

export default function Viz(props) {
  return (
    <MyAppContext>
      <App {...props} />
    </MyAppContext>
  )
}
