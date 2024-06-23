export const getLocalStorageAccessToken = () => {
  try {
    const user = localStorage.getItem('user')
    if (!user) return
    const parsedUser = JSON.parse(user)
    return parsedUser.accessToken as string
  } catch {
    return
  }
}
