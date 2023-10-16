import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }


  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  login(args) {
    const { email, password } = args
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('username', email)
    params.append('password', password)
    params.append('scope', 'admin')
    params.append('client_id', 'plataform-admin')
    params.append('client_secret', '3f366146-b73c-48aa-9e5b-38de80f10bc0')

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      strictSSL: false
      
    }
    return axios.post(this.jwtConfig.loginEndpoint, params, config)
  }

  forgotPassword(args) {
    const { email, locale } = args
    const params = {
      username: email,
      scope: 'admin',
      lang: locale
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      strictSSL: false
      
    }
    return axios.post(this.jwtConfig.forgotPasswordEndpoint, params, config)
  }

  validateRecoveryIdToken(args) {
    const { tokenId, code } = args    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      strictSSL: false
    }
    
    const url = `${this.jwtConfig.tokenEndpoint}/${tokenId}`

    return axios.post(url, null, config)
  }

  validateRecoveryCodeToken(args) {
    const { tokenId, code } = args    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      strictSSL: false
    }
    
    const url = `${this.jwtConfig.tokenEndpoint}/${tokenId}/code/${code}`

    return axios.post(url, null, config)
  }

  updatePassword(args) {
    const { tokenId, code, password } = args    
    const params = {
      tokenId,
      code,
      password
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      strictSSL: false
      
    }
    return axios.post(this.jwtConfig.updatePasswordEndpoint, params, config)
  }
  register(...args) {
    return Promise.reject('Not implemented')
  }

  refreshToken() {
    return Promise.reject('Not implemented')
  }
}
