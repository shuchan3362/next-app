import React from "react"
import { useAuth } from "~/hooks/useAuth"
import styled, { css } from "styled-components"
import { Box } from "~/components/atoms/Box"
import { Block } from "~/components/atoms/Neumorphism"
import { UserSection } from "~/components/molecules/UserSction"
import { Header } from "~/components/organisms/header"
import { useFirestore } from "~/hooks/useFirestore"

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
  border-radius: 6px;
`

const Item = css`
  height: 150px;
`

export default function Projects(): JSX.Element {
  const { user } = useAuth()
  const { issues, progress, review, done } = useFirestore(user)

  return (
    <Wrapper>
      <Header />
      <Content>
        <UserSection tasks={issues} styles={Item} userName="Issues" />
        <UserSection tasks={progress} styles={Item} userName="Progress" />
        <UserSection tasks={review} styles={Item} userName="Review" />
        <UserSection tasks={done} styles={Item} userName="Done" />
      </Content>
    </Wrapper>
  )
}

// export default Projects
