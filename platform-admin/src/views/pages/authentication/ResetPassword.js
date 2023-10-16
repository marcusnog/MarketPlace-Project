import { useState, useEffect, Fragment } from 'react'
import { useSkin } from '@hooks/useSkin'
import classnames from 'classnames'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import queryString from 'query-string'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button, Input } from 'reactstrap'
import UILoader from '@components/ui-loader'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { toast, Slide } from 'react-toastify'
import { useIntl, injectIntl } from 'react-intl'

import '@styles/base/pages/page-auth.scss'
import InputPassword from '@components/input-password-toggle'

import useJwt from '@src/auth/jwt/useJwt'
import logo from '@src/assets/images/logo/logo-reconhece.png'

const TokenValidation = (props) => {
  const intl = useIntl()
  const { register, errors, handleSubmit } = useForm()

  const [token, setToken] = useState('')
  const [code, setCode] = useState('')

  const blockUI = (state) => {
    if (!!props.onLoading) props.onLoading(state)
  }
  const validateToken = (isValid) => {
    if (!!props.onTokenValidation) props.onTokenValidation(isValid, code)
  }

  useEffect(() => {
    setToken(props.token)
  }, [props])

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      blockUI(true)
      useJwt
        .validateRecoveryCodeToken({ tokenId: token, code })
        .then(res => {
          validateToken(true)
          blockUI(false)
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'codigo-validado-titulo' })}</h6>
                </div>
              </div>
              <div className='toastify-body'>
                <span>{intl.formatMessage({ id: 'codigo-validado-descri' })}</span>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: false, autoClose: 3000 }
          )
        })
        .catch(err => {
          blockUI(false)
          console.log(err)
          const errorMessage = err?.response?.data?.error || 'error'
          validateToken(false)
          toast.error(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'atencao' })}</h6>
                </div>
              </div>
              <div className='toastify-body'>
                <span>{intl.formatMessage({ id: 'codigo-invalido' })}</span>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: false, autoClose: 3000 }
          )
        })
    }
  }

  return (
    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
      <CardTitle tag='h2' className='font-weight-bold mb-1'>
        Informe o codigo que você recebeu por e-mail 🔒
      </CardTitle>
      <CardText className='mb-2'>digite o codigo enviado por e-mail:</CardText>
      <Form className='auth-reset-password-form mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input className='input-group-merge mr-xl-n75' id="login-email" name="login-email" placeholder="seu codigo enviado por e-mail: xxxxxx" autoFocus onChange={e => setCode(e.target.value)} className={classnames({ 'is-invalid': errors['login-email'] })} innerRef={register({ required: true, validate: value => value !== '' })} />
          </FormGroup>
        <Button.Ripple type="submit" color='primary' block>
          Validar codigo
        </Button.Ripple>
      </Form>
      <p className='text-center mt-2'>
        <Link to='/login'>
          <ChevronLeft className='mr-25' size={14} />
          <span className='align-middle'>voltar pro login.</span>
        </Link>
      </p>
    </Col>
  )
}

const NewPassword = withRouter((props) => {
  const { register, errors, handleSubmit } = useForm()

  const intl = useIntl()
  const [token, setToken] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')


  useEffect(() => {
    setToken(props.token)
    setCode(props.code)
  }, [props])

  const blockUI = (state) => {
    if (!!props.onLoading) props.onLoading(state)
  }

  const onSubmit = data => {
    if (password !== password2) {
      toast.error(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'atencao' })}</h6>
            </div>
          </div>
          <div className='toastify-body'>
            <span>{intl.formatMessage({ id: 'senhas-nao-conferem' })}</span>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: false, autoClose: 2000 })
        return
    }
    if (isObjEmpty(errors)) {
      blockUI(true)
      useJwt
        .updatePassword({ tokenId: token, code, password })
        .then(res => {
          blockUI(false)
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'Success' })}</h6>
                </div>
              </div>
              <div className='toastify-body'>
                <span>{intl.formatMessage({ id: 'forgot-password-success' })}</span>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
          )
          return props.history.push('/login')
        })
        .catch(err => {
          blockUI(false)
          console.log(err)
          const errorMessage = err?.response?.data?.error || 'error'
          toast.error(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'Error' })}</h6>
                </div>
              </div>
              <div className='toastify-body'>
                <span>{intl.formatMessage({ id: 'forgot-password-error' })}</span>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
          )
        })
    }
  }

  return (
    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
      <CardTitle tag='h2' className='font-weight-bold mb-1'>
        Digite sua nova senha 🔒
      </CardTitle>
      <CardText className='mb-2'>Sua nova senha deve ser diferente das senhas usadas anteriormente</CardText>
      <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className='form-label' for='new-password'>
            Senha
          </Label>
          <InputPassword className='input-group-merge' id='new-password' name="new-password" autoFocus onChange={e => setPassword(e.target.value)} className={classnames({ 'is-invalid': errors['new-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })} />
        </FormGroup>
        <FormGroup>
          <Label className='form-label' for='confirm-password'>
            Confirmar Senha
          </Label>
          <InputPassword className='input-group-merge' id='confirm-password' name="confirm-password" autoFocus onChange={e => setPassword2(e.target.value)} className={classnames({ 'is-invalid': errors['confirm-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}  />
        </FormGroup>
        <Button.Ripple type="submit" color='primary' block>
          Ok, redefinir senha.
        </Button.Ripple>
      </Form>
      <p className='text-center mt-2'>
        <Link to='/login'>
          <ChevronLeft className='mr-25' size={20} />
          <span className='align-middle'>Voltar para o login</span>
        </Link>
      </p>
    </Col>
  )
})


const ResetPassword = (props) => {
  const [token, setToken] = useState('')
  const [block, setBlock] = useState(true)
  const [returnToLogin, setReturnToLogin] = useState(false)
  const [validCode, setValidCode] = useState(false)
  const [code, setCode] = useState('')
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  useEffect(() => {

    const params = queryString.parse(props.location.search)

    if (!params.tokenId) {
      setReturnToLogin(true)
      return
    } else {
      setToken(params.tokenId)
    }

    useJwt
      .validateRecoveryIdToken({ tokenId: params.tokenId })
      .then(res => {
        setBlock(false)
      })
      .catch(err => {
        console.log(err)
        setReturnToLogin(true)
      })

  }, [props])

  const onTokenValidation = (isValid, code) => {
    setValidCode(!!isValid)
    if (!!isValid) setCode(code)
  }

  if (!!returnToLogin) return <Redirect to='/login' />

  return (
    <UILoader blocking={block}>
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <img src={logo} height='28' />
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            {!!validCode ? <NewPassword token={token} code={code} onLoading={setBlock} /> : <TokenValidation token={token} onTokenValidation={onTokenValidation} onLoading={setBlock} />}

          </Col>
        </Row>
      </div>
    </UILoader>
  )
}

export default injectIntl(ResetPassword)
