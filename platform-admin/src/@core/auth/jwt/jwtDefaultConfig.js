// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_AUTH_API}/connect/token`,
  forgotPasswordEndpoint: `${process.env.REACT_APP_USER_API}/api/User/forgot-password/recovery`,
  tokenEndpoint: `${process.env.REACT_APP_USER_API}/api/User/forgot-password/validate`,
  updatePasswordEndpoint: `${process.env.REACT_APP_USER_API}/api/User/forgot-password/update`,
  // registerEndpoint: '/jwt/register',
  // refreshEndpoint: '/jwt/refresh-token',
  // logoutEndpoint: '/jwt/logout',
  tokenType: 'Bearer',
  storageTokenKeyName: 'accessToken'
}
