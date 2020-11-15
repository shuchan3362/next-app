import React from "react"
import { InferGetServerSidePropsType } from "next"

export default function User({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div>
      <p>{user}</p>
    </div>
  )
}

type Props = {
  user: string
}

export async function getServerSideProps({
  params,
}: {
  params: Props
}): Promise<{ props: Props }> {
  const { user } = params
  const props: Props = {
    user: user,
  }
  return {
    props,
  }
}
