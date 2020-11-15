import React, { useEffect, useState, useMemo } from "react"
import { useAuth } from "~/hooks/useAuth"
import { useRouter } from "next/router"
import { Button, Input, Block } from "~/components/atoms/Neumorphism"
import styled from "styled-components"
import { FlexBox, NeumoBox, Loading, LoadingBox } from "~/components/atoms/Box"
import { Title } from "~/components/atoms/Text"
import { Header } from "~/components/organisms/header"

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Container = styled(NeumoBox)`
  flex-direction: column;
  width: 400px;
  padding: 20px;
  align-items: center;
`
const Content = styled(Block)`
  height: 90%;
  width: 100%;
  margin-top: 20px;
  display: flex;
  overflow: auto;
  padding: 0 0 0 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
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

const LoginBox = styled(FlexBox)`
  flex-direction: column;
`

const ErrMessage = styled("p")`
  color: #ff0000;
  margin-top: 10px;
`

type PwError =
  | "auth/operation-not-allowed"
  | "安全性が低いパスワードです。<br />６文字以上にしてください。"
  | undefined

type MailError =
  | "このメールアドレスは既に使用されています"
  | "不正なメールアドレスです"
  | undefined

const Delete: React.FC = () => {
  const router = useRouter()
  const { user, signUpErr, deleteAccount } = useAuth()

  const [nowLoading, setNowLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user && nowLoading) {
      setNowLoading(false)
      router.push("/") //もともといたページにリダイレクトしたい
    }
    if (signUpErr) {
      setNowLoading(false)
    }
  }, [user, nowLoading, signUpErr])

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    deleteAccount(e)
    setNowLoading(true)
  }

  const mailErr: MailError = useMemo(() => {
    if (signUpErr === "auth/email-already-in-use") {
      return "このメールアドレスは既に使用されています"
    } else if (signUpErr === "auth/invalid-email") {
      return "不正なメールアドレスです"
    }
  }, [signUpErr])

  const pwErr: PwError = useMemo(() => {
    if (signUpErr === "auth/operation-not-allowed") {
      return "auth/operation-not-allowed"
    } else if (signUpErr === "auth/weak-password") {
      return "安全性が低いパスワードです。<br />６文字以上にしてください。"
    }
  }, [signUpErr])

  return (
    <Wrapper>
      <Header />
      {nowLoading && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
      <Content>
        <Container>
          <Title>アカウント削除</Title>
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleDelete(e)}
          >
            <LoginBox>
              <LoginInput
                name="email"
                placeholder="Email Address"
                type="email"
              />
              {mailErr && <ErrMessage>{mailErr}</ErrMessage>}
              <LoginInput
                name="password"
                placeholder="Password"
                type="password"
              />
              {pwErr && (
                <ErrMessage
                  dangerouslySetInnerHTML={{ __html: pwErr }}
                ></ErrMessage>
              )}
            </LoginBox>
            <LoginButton type="submit">削除</LoginButton>
          </Form>
        </Container>
      </Content>
    </Wrapper>
  )
}

export default Delete
