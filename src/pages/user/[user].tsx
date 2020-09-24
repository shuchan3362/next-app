import React from "react"
import { GetServerSideProps } from "next"

type Props = {
  user: string
}

const User: React.FC<Props> = ({ user }: Props) => {
  return <p>{user}</p>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.query
  return {
    props: {
      user,
    },
  }
}

export default User
