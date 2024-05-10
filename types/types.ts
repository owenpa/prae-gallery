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
  imageurl: string
  likes: number
  shares: number
  price: string
  description: string
  descriptionfooter: string
  date: string
}

export interface vgyResponse {
  delete: string
  error: boolean
  ext: string
  filename: string
  image: string
  size: number
  url: string
}

export interface CommissionPageObj {
  commissionstatus: string
  configversion: number
  contactinfo: string
  pricelist: string
  textafterprice: string
  textbeforeprice: string
}
