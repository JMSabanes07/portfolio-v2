enum AppType {
  web,
  android,
  ios,
  desktop,
}

export interface Project {
  id: string
  collectionId: string
  collectionName: string
  name: string
  slug: string
  short_desc: string
  long_desc: string | null
  app_type: AppType
  go_to: string | null
  icons: string[]
  thumbnail: string
  images: string[]
  year: number
  created: string
  updated: string
}
