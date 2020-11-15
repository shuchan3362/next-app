import React from "react"
import styled from "styled-components"
import { Box } from "~/components/atoms/Box"
import { Block } from "~/components/atoms/Neumorphism"
import { Header } from "~/components/organisms/header"

const Wrapper = styled(Box)`
  height: 100vh;
  padding: 10px 30px;
`

const Content = styled(Block)`
  height: 90%;
  width: 100%;
  margin-top: 20px;
  display: flex;
  overflow: auto;
  padding: 0 0 0 10px;
  border-radius: 6px;
`

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Content></Content>
    </Wrapper>
  )
}

export default Home
