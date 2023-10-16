import { useState, Fragment } from 'react'
import { isUserLoggedIn, isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { HashRouter as AppRouter, Route, Switch, Redirect, Link, useHistory } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useForm } from 'react-hook-form'

import { useIntl, injectIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import useJwt from '@src/auth/jwt/useJwt'
import logo from '@src/assets/images/logo/logo-reconhece.png'
import UILoader from '@components/ui-loader'

const ForgotPassword = (props) => {
    const intl = useIntl()

    const [block, setBlock] = useState(false)
    const [skin, setSkin] = useSkin()
    const [email, setEmail] = useState('')

    const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const { register, errors, handleSubmit } = useForm()

    const onSubmit = data => {
        if (isObjEmpty(errors)) {
            setBlock(true)
            useJwt
                .forgotPassword({ email, locale: intl.locale })
                .then(res => {
                    setBlock(false)
                    toast.success(
                        <Fragment>
                            <div className='toastify-header'>
                                <div className='title-wrapper'>
                                    <h6 className='toast-title font-weight-bold'>{intl.formatMessage({ id: 'Success' })}</h6>
                                </div>
                            </div>
                            <div className='toastify-body'>
                                <span>{intl.formatMessage({ id: 'codigo-enviado-successo' })}</span>
                            </div>
                        </Fragment>,
                        { transition: Slide, hideProgressBar: false, autoClose: 3000 }
                    )
                    return props.history.push('/login')
                })
                .catch(err => {
                    setBlock(false)
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
                        { transition: Slide, hideProgressBar: false, autoClose: 3000 }

                    )
                })
        }
    }


    if (!isUserLoggedIn()) {
        return (
            <UILoader blocking={block}>
                <div className='auth-wrapper auth-v2'>
                    <Row className='auth-inner m-0'>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={logo} height='28' />
                        </Link>

                        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                                <img className='img-fluid' src={source} alt='Login V2' />
                            </div>
                        </Col>

                        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                <CardTitle tag='h2' className='font-weight-bold mb-1'>
                                    Textos do Termo de Uso
                                </CardTitle>

                                <CardText className='mb-2'>
                                    <p>Aqui vai o texto dos termos de uso</p>
                                </CardText>

                                <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type='radio' name='ex1' defaultChecked /> Aceito os termos de uso
                                        </Label>
                                    </FormGroup>
                                    <Button.Ripple type="submit" color='primary' block>
                                        Aceitar a Politica de Privacidade
                                    </Button.Ripple>
                                </Form>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </UILoader>
        )
    } else {
        return <Redirect to='/' />
    }
}

export default injectIntl(ForgotPassword)
