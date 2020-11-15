import { AppProps } from "next/app"
import React from "react"
import { neumoTheme } from "~/theme"
import { ThemeProvider } from "styled-components"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    color: #55616f;
    line-height: 1;
    background: ${({ theme }) => theme.body};
  }
  button, input {
    color: #55616F;
    font-size: 14px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
  .MuiTooltip-popper{
    height: auto;
  }
  `

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={neumoTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
