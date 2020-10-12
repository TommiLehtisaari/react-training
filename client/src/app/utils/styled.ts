import emotionStyled, { CreateStyled } from '@emotion/styled'

type Theme = {
  colors: {
    primary: string
    secondary: string
    text: string
    textSecondary: string
    shadow: string
  }
  isDark: boolean
}

const styled = emotionStyled as CreateStyled<Theme>

export { styled }
