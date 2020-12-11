import React, { useState } from "react"
import styled, { FlattenSimpleInterpolation } from "styled-components"
import { Block, Button } from "~/components/atoms/Neumorphism"
import ReactModal from "react-modal"
import { firebase } from "~/firebase"
import { useAuth } from "~/hooks/useAuth"
import { Tasks } from "~/types"

type Props = {
  userName: string
  styles?: FlattenSimpleInterpolation
  tasks?: Tasks[]
}

const Item = Block.withComponent("div")

const Section = Block.withComponent("section")

const UserSections = styled(Section)`
  border-radius: 0;
  padding: 10px 0 0;
  text-align: center;
  height: fit-content;
  width: 100%;
`

const UserItem = styled(Item)<{ styles?: FlattenSimpleInterpolation }>`
  // width: 250px;
  ${({ styles }) => (styles ? styles : "height: 75px")};
  border-radius: 0;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px;
  font-size: 14px;
  &:hover {
    background: #8fbbd9;
  }
`

const UserName = styled("p")`
  margin-bottom: 10px;
  font-size: 18px;
`

const modalStyle = {
  overlay: {
    backgroundColor: "transparent",
  },
}

const Modal = styled(ReactModal)`
  width: 300px;
  height: 300px;
  background: #fff;
  outline: none;
  position: absolute;
  top: 35%;
  right: 35%;
  // box-shadow: inset 5px 5px 14px #c9c9c9, inset -5px -5px 14px #ffffff;
  box-shadow: inset 2px 2px 4px #c9c9c9, inset -2px -2px 4px #FFFFFF;
  padding: 15px 10px;
}
`

// const ModalInput = styled(Input)`
//   width: 78%;
//   height: 30px;
//   box-shadow: inset 2px 2px 4px #c9c9c9, inset -2px -2px 4px #ffffff;
//   background: #fff;
//   border-radius: 5px;
//   margin-right: 10px;
// `

const ModalForm = styled("form")`
  display: flex;
  align-items: center;
`
const ModalTextarea = styled("textarea")`
  border: none;
  resize: none;
  height: 70px;
  width: 78%;
  box-shadow: inset 2px 2px 8px #c9c9c9, inset -2px -2px 8px #ffffff;
  border-radius: 5px;
  margin-right: 10px;
`

const ModalButton = styled(Button)`
  width: 50px;
  box-shadow: 2px 2px 4px #c9c9c9, -2px -2px 4px #ffffff;
  background: #fff;

  &:hover {
    background: #fff;
  }
`

export const UserSection: React.FC<Props> = ({
  userName,
  styles,
  tasks,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const sortTasks = tasks?.sort(function (a, b) {
    if (a.timestamp > b.timestamp) return -1
    if (a.timestamp < b.timestamp) return 1
    return 0
  })

  const { user } = useAuth()
  const db = firebase.firestore()

  const sendTaskss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const task = target.text.value
    await db
      .collection(user?.email ? user?.email : "")
      .doc(userName)
      .collection("posts")
      .doc()
      .set({
        uid: user?.uid,
        name: user?.displayName,
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }

  const [isItemOpen, setIsItemOpen] = useState<boolean>(false)
  const openItem = () => {
    setIsItemOpen(!isItemOpen)
  }

  return (
    <UserSections>
      <UserName>{userName}</UserName>
      <UserItem onClick={() => handleClick()} styles={styles}></UserItem>
      <Modal
        closeTimeoutMS={300}
        isOpen={isOpen}
        onRequestClose={() => handleClick()}
        style={modalStyle}
        ariaHideApp={false}
      >
        <ModalForm
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendTaskss(e)}
        >
          <ModalTextarea name="text" autoFocus></ModalTextarea>
          <ModalButton>追加</ModalButton>
        </ModalForm>
      </Modal>
      {sortTasks &&
        sortTasks.map((d) => (
          <UserItem styles={styles} key={d.id} onClick={() => openItem()}>
            {d.task}
          </UserItem>
        ))}
      <Modal
        closeTimeoutMS={300}
        isOpen={isItemOpen}
        onRequestClose={() => openItem()}
        style={modalStyle}
        ariaHideApp={false}
      >
        <div></div>
      </Modal>
    </UserSections>
  )
}
