import { useIntl, injectIntl } from 'react-intl'
import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import UILoader from '@components/ui-loader'
// import logo from '@src/assets/images/logo/logo-reconhece.png'

import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import jwt from 'jwt-decode'
import '@styles/base/pages/page-auth.scss'
const ToastErrorContent = ({ title, message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title font-weight-bold'>{title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)
const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Bem-vindo, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Você logou como {role}</span>
    </div>
  </Fragment>
)

const Login = props => {
  const intl = useIntl()
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [block, setBlock] = useState(false)

  const { register, errors, handleSubmit } = useForm()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      setBlock(true)
      useJwt
        .login({ email, password })
        .then(res => {
          setBlock(false)
          const userData = jwt(res.data.access_token)
          userData.abilities = JSON.parse(userData.abilities || '[]')
          const data = { ...userData, accessToken: res.data.access_token, refreshToken: null, role: 'Admin' }
          dispatch(handleLogin(data))
          ability.update(userData.abilities)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent name={userData.nickname} role={data.role} />,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
          )
          console.log(data.role)
        })
        .catch(err => {
          setBlock(false)
          console.log(err)
          const errorMessage = err?.response?.data?.error || 'error'
          toast.error(
            <ToastErrorContent message={intl.formatMessage({
              id: 'login-error',
              defaultMessage: errorMessage
            })} title={intl.formatMessage({ id: 'Error' })} />,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
          )
        })
    }
  }

  return (
    <UILoader blocking={block}>
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <img src="https://memorabiliadoesporte.com.br/wp-content/uploads/2020/12/MDE-1.jpg" height='60' />
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login V2' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                {intl.formatMessage({ id: 'login-welcome' })}
              </CardTitle>
              <CardText className='mb-2'>{intl.formatMessage({ id: 'login-instructions' })}</CardText>
              <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    {intl.formatMessage({ id: 'login-lbl-email' })}
                  </Label>
                  <Input
                    autoFocus
                    type='email'
                    value={email}
                    id='login-email'
                    name='login-email'
                    placeholder='john@mail.com'
                    onChange={e => setEmail(e.target.value)}
                    className={classnames({ 'is-invalid': errors['login-email'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
                <FormGroup>
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label' for='login-password'>
                      {intl.formatMessage({ id: 'login-lbl-password' })}
                    </Label>
                    <Link to='/forgot-password'>
                      <small>{intl.formatMessage({ id: 'login-lbl-forgot' })}</small>
                    </Link>
                  </div>
                  <InputPasswordToggle
                    value={password}
                    id='login-password'
                    name='login-password'
                    onChange={e => setPassword(e.target.value)}
                    className={classnames({ 'input-group-merge': true, 'is-invalid': errors['login-password'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
                <FormGroup>
                  <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label={intl.formatMessage({ id: 'login-lbl-remember' })} />
                </FormGroup>
                <Button.Ripple type='submit' color='primary' block>
                  {intl.formatMessage({ id: 'login-btn-login' })}
                </Button.Ripple>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    </UILoader>
  )
}

export default injectIntl(Login)
