import React, { useRef } from "react"
import { useAuth } from "~/hooks/useAuth"
import { useFirestore } from "~/hooks/useFirestore"
import styled, { css } from "styled-components"
import { FlexBox, Box } from "~/components/atoms/Box"
import { Block } from "~/components/atoms/Neumorphism"
import { UserSection } from "~/components/molecules/UserSction"
import { Header } from "~/components/organisms/header"

const Wrapper = styled(Box)`
  height: 100vh;
  padding: 10px 30px;
`

const Content = styled(Block)`
  height: 90vh;
  width: 100%;
  margin-top: 20px;
  display: flex;
  overflow: auto;
  border-radius: 6px;
`

const DateList = styled("ul")`
  margin: 30px 10px 0 0;
  text-align: center;
  list-style: none;
  height: 90vh;
  overflow: auto;
`

const DateItem = styled("li")`
  height: 75px;
`

const Item = css`
  width: 300px;
  height: 150px;
`

const Container = styled(FlexBox)``

const times = [
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
]

const Tasks: React.FC = () => {
  const { user } = useAuth()
  // const { issues, progress, review, done } = useFirestore(user)
  const { issues } = useFirestore(user)

  const contentRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLUListElement>(null)

  const handleScroll = () => {
    if (contentRef && contentRef.current) {
      const scrollTop = contentRef.current.scrollTop
      dateRef.current?.scrollTo(0, scrollTop)
    }
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <DateList id="data" ref={dateRef}>
          {times.map((time) => (
            <DateItem key={time}>{time}</DateItem>
          ))}
        </DateList>
        <Content id="content" ref={contentRef} onScroll={handleScroll}>
          <UserSection tasks={issues} styles={Item} userName="user1" />
          <UserSection tasks={issues} styles={Item} userName="user2" />
          <UserSection tasks={issues} styles={Item} userName="user3" />
          <UserSection tasks={issues} styles={Item} userName="user4" />
          <UserSection tasks={issues} styles={Item} userName="user5" />
          <UserSection tasks={issues} styles={Item} userName="user6" />
          <UserSection tasks={issues} styles={Item} userName="user7" />
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Tasks
