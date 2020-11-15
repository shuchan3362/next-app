import React, { useEffect, useState } from "react"
import { useAuth } from "~/hooks/useAuth"
import { useRouter } from "next/router"
import { Button, Input, Block } from "~/components/atoms/Neumorphism"
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

const TextBlock = styled(Block)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  padding: 30px 20px;
`

const ResetPassword: React.FC = () => {
  const router = useRouter()
  const { user, loginErr, resetPassword } = useAuth()
  const [nowLoading, setNowLoading] = useState<boolean>(false)
  const [sendEmail, setSendEmail] = useState<boolean>(false)
  useEffect(() => {
    if (user && nowLoading) {
      setNowLoading(false)
      router.push("/")
    }
    if (loginErr) {
      setNowLoading(false)
    }
  }, [user, nowLoading, loginErr, router])

  const sendResetEmail = (e: React.FormEvent<HTMLFormElement>) => {
    resetPassword(e)
    setSendEmail(true)
  }

  return (
    <Wrapper>
      {nowLoading && (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
      <Container>
        <Title>パスワード再設定</Title>
        {!sendEmail && (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              sendResetEmail(e)
            }
          >
            <LoginBox>
              <LoginInput
                name="email"
                placeholder="Email Address"
                type="email"
              />
            </LoginBox>
            <LoginButton type="submit">送信</LoginButton>
          </Form>
        )}
        {sendEmail && (
          <TextBlock>
            <p>メールを送信しました</p>
          </TextBlock>
        )}
      </Container>
    </Wrapper>
  )
}

export default ResetPassword
