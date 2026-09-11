export const API = {
  login: '/api/login',
  stories: '/api/insta-share/stories',
  posts: '/api/insta-share/posts',
  like: postId => `/api/insta-share/posts/${postId}/like`,
  myProfile: '/api/insta-share/my-profile',
  userProfile: userId =>
    `/api/insta-share/users/${userId}`,
  search: value =>
    `/api/insta-share/posts?search=${encodeURIComponent(
      value,
    )}`,
}

export const getJwt = () => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt_token='))

  return cookie
    ? decodeURIComponent(cookie.split('=')[1])
    : ''
}

export const authOptions = (
  method = 'GET',
  body = null,
) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getJwt()}`,
  },
  ...(body !== null
    ? {body: JSON.stringify(body)}
    : {}),
})