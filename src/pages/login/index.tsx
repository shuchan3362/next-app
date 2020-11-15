import React, { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { useAuth } from "~/hooks/useAuth"
import { useRouter } from "next/router"
import { Button, Input } from "~/components/atoms/Neumorphism"
import styled from "styled-components"
import { FlexBox, NeumoBox, Loading, LoadingBox } from "~/components/atoms/Box"
import { Title } from "~/components/atoms/Text"

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`
const Container = styled(NeumoBox)`
  flex-direction: column;
  width: 400px;
  padding: 20px;
  align-items: center;
`

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginButton = styled(Button)`
  width: 200px;
  padding: 10px 0;
  margin: 20px 0;
`

const LoginInput = styled(Input)`
  margin-top: 20px;
`

const LinkToReset = styled("a")`
  font-size: 12px;
  color: #888888;
  margin-top: 10px;
`

const LoginBox = styled(FlexBox)`
  flex-direction: column;
`

const ErrMessage = styled("p")`
  color: #ff0000;
  margin-top: 10px;
`

type ErrType =
  | "パスワードが違います"
  | "不正なメールアドレスです"
  | "そのユーザーは使用できません"
  | "ユーザーが見つかりません"
  | undefined

const Login: React.FC = () => {
  const router = useRouter()
  const { url } = router.query
  const { user, handleLogin, loginErr } = useAuth()
  const [nowLoading, setNowLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user && nowLoading) {
      setNowLoading(false)
      router.push("/") //もともといたページにリダイレクトしたい
    }
    if (loginErr) {
      setNowLoading(false)
    }
  }, [user, nowLoading, loginErr])

  const handleSiginIn = (e: React.FormEvent<HTMLFormElement>, url: string) => {
    handleLogin(e, url)
    setNowLoading(true)
  }

  // const provider = new firebase.auth.GoogleAuthProvider()

  const errMessage: ErrType = useMemo(() => {
    if (loginErr === "auth/wrong-password") {
      return "パスワードが違います"
    }
    if (loginErr === "auth/invalid-email") {
      return "不正なメールアドレスです"
    }
    if (loginErr === "auth/user-disabled") {
      return "そのユーザーは使用できません"
    }
    if (loginErr === "auth/user-not-found") {
      return "ユーザーが見つかりません"
    }
  }, [loginErr])

  return (
    <Wrapper>
      {nowLoading && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
      <Container>
        <Title>ログイン</Title>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSiginIn(e, url as string)
          }
        >
          <LoginBox>
            <LoginInput name="email" placeholder="Email Address" type="text" />
            <LoginInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Link href="/reset_password" passHref>
              <LinkToReset>パスワードを忘れた方</LinkToReset>
            </Link>
            <ErrMessage>{errMessage}</ErrMessage>
          </LoginBox>
          <LoginButton type="submit">Login</LoginButton>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default Login
