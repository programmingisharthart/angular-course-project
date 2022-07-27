export interface auth {
  email: string,
  password: string
}
export interface AuthResponses {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  register?: boolean
}

