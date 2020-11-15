export type Post = {
  name: string
}

export type Tasks = {
  id?: string
  task?: string
  uid?: string
  user?: string
  timestamp: { seconds?: number; nanoseconds?: number }
}
