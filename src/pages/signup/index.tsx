import React, { useEffect, useState, useMemo } from "react"
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

const SignUp: React.FC = () => {
  const router = useRouter()
  const { url } = router.query
  const { user, signUpErr, handleSignUp } = useAuth()

  const [nowLoading, setNowLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user && nowLoading) {
      setNowLoading(false)
      router.push("/") //もともといたページにリダイレクトしたい
    }
    if (signUpErr) {
      setNowLoading(false)
    }
  }, [user, nowLoading, signUpErr, router])

  const signUp = (e: React.FormEvent<HTMLFormElement>, url: string) => {
    handleSignUp(e, url)
    setNowLoading(true)
  }

  // const provider = new firebase.auth.GoogleAuthProvider()

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
      {nowLoading && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
      <Container>
        <Title>新規登録</Title>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            signUp(e, url as string)
          }
        >
          <LoginBox>
            <LoginInput
              name="userName"
              placeholder="ユーザーネーム"
              type="text"
              id="userName"
              required
            />
            <LoginInput name="email" placeholder="Email Address" type="email" />
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
          <LoginButton type="submit">SignUp</LoginButton>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default SignUp
