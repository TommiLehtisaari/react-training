import { css, Global } from '@emotion/core'
import React, { useState } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { App } from './App'
import { styled } from '../utils/styled'

const DarkModeToggle = styled.div((props) => ({
  backgroundColor: '#fff',
  width: 32,
  height: 16,
  position: 'absolute',
  float: 'right',
  top: 0,
  right: 0,
  borderRadius: 20,
  margin: 30,
  padding: 4,
  display: 'flex',
  ...(props.theme.isDark && { justifyContent: 'flex-end', border: 'solid 1px #fff' }),
  ...(!props.theme.isDark && { justifyContent: 'flex-start', border: 'solid 1px #514d54' })
}))

const Circle = styled.div({
  backgroundColor: '#514d54',
  width: 16,
  height: 16,
  borderRadius: '50%'
})

const lightTheme = {
  colors: {
    primary: '#fff',
    secondary: '#fff',
    text: '#000',
    textSecondary: '#777',
    shadow: '#999'
  }
}

const darkTheme = {
  colors: {
    primary: '#342c3a',
    secondary: '#62576b',
    text: 'hotpink',
    textSecondary: '#fff',
    shadow: 'hotpink'
  }
}

export function Root() {
  const [isDark, setIsDark] = useState(false)

  return (
    <>
      <Global
        styles={css`
          html {
            font-family: -apple-system, Ubuntu, sans-serif;
            background-color: ${isDark ? '#342c3a' : '#fff'};
          }
        `}
      />
      <ThemeProvider theme={{ ...(isDark ? darkTheme : lightTheme), isDark }}>
        <DarkModeToggle onClick={() => setIsDark(!isDark)}>
          <Circle />
        </DarkModeToggle>
        <App />
      </ThemeProvider>
    </>
  )
}
