export type ImageDataToDB = Record<string, string>

export interface User {
  userid: string
  email: string
  password: string
}

export interface FileObj {
  imageid: number
  imagename: string
  imagetitle: string
  likes: number
  price: string
  description: string
  descriptionfooter: string
  date: string
}
