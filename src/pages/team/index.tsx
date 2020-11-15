import React from "react"
import { useAuth } from "~/hooks/useAuth"
import styled from "styled-components"
import { Box } from "~/components/atoms/Box"
import { Block } from "~/components/atoms/Neumorphism"
import { firebase } from "~/firebase"
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

const Team: React.FC = () => {
  const { user } = useAuth()

  const db = firebase.firestore()

  const sendTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const teamMember = target.teamMember.value
    const teamName = target.teamName.value
    const teamType = target.teams.value
    // const teamUser = user?.email as string
    await db.collection(teamName).doc(teamType).collection(teamMember).add({
      name: user?.uid,
    })
  }

  return (
    <Wrapper>
      <Header />
      <Content>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendTeam(e)}>
          <input
            name="teamName"
            placeholder="チームの名前を入れてね"
            autoFocus
          />
          <input name="teams" placeholder="チームの何？" autoFocus />
          <input
            name="teamMember"
            placeholder="チームメンバーのメールアドレスを入れてね"
            autoFocus
          />
          <button type="submit">押してね</button>
        </form>
      </Content>
    </Wrapper>
  )
}

export default Team
