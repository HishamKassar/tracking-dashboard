export const setLocalStorageTokens = (accessToken: string) => {
  try {
    const user = localStorage.getItem('user')
    if (!user) return
    const parsedUser = JSON.parse(user)
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...parsedUser,
        accessToken: accessToken
      })
    )
  } catch {
    return
  }
}
