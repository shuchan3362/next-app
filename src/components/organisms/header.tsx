import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { Button, Block } from "~/components/atoms/Neumorphism"
import { useRouter } from "next/router"
import { useAuth } from "~/hooks/useAuth"

const HeaderWrapper = styled("header")`
  display: flex;
  justify-content: flex-end;
`
const NeumorphismButton = styled(Button)<{ isActive?: boolean }>`
  height: 45px;
  padding: 10px;
  margin-left: 15px;
  min-width: 100px;
  background: ${({ isActive }) => (isActive ? "#8fbbd9" : "#bfd2df")};
`
const UserBlock = styled(Block)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-left: 15px;
`

export const Header: React.FC = () => {
  const router = useRouter()
  const { signOut, user } = useAuth()
  const { pathname } = router
  return (
    <HeaderWrapper>
      {!user && (
        <>
          <NeumorphismButton
            type="button"
            onClick={() => {
              router.push("/login")
            }}
          >
            Login
          </NeumorphismButton>
          <NeumorphismButton
            type="button"
            onClick={() => {
              router.push("/signup")
            }}
          >
            SignUp
          </NeumorphismButton>
        </>
      )}
      {user && (
        <>
          <NeumorphismButton onClick={signOut}>ログアウト</NeumorphismButton>
          <Link href="/">
            <NeumorphismButton isActive={pathname === "/"}>
              Home
            </NeumorphismButton>
          </Link>
          <Link href="/delete">
            <NeumorphismButton isActive={pathname === "/delete"}>
              アカウント
            </NeumorphismButton>
          </Link>
          <Link href="/team">
            <NeumorphismButton isActive={pathname === "/team"}>
              チーム
            </NeumorphismButton>
          </Link>
          <Link href="/projects">
            <NeumorphismButton isActive={pathname === "/projects"}>
              プロジェクト
            </NeumorphismButton>
          </Link>
          <Link href="/tasks">
            <NeumorphismButton isActive={pathname === "/tasks"}>
              タスク
            </NeumorphismButton>
          </Link>
          <UserBlock>
            <p>Login as {user?.displayName}</p>
          </UserBlock>
        </>
      )}
    </HeaderWrapper>
  )
}
