import * as yup from 'yup'
import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap'

const AccountDetails = ({ stepper, type, userData, handleInputChange }) => {
  const SignupSchema = yup.object().shape({
    [`cpf-${type}`]: yup.string()
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Criação da Demo</h5>
        <small className='text-muted'>Preencha os dados corretamente.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
            <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`cpf-${type}`}>
              CPF
            </Label>
            <Input
             bsSize='lg'
              name={`cpf-${type}`}
              id={`cpf-${type}`}
              placeholder='Seu CPF'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`cpf-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`nickname-${type}`}>
              Nome Completo
            </Label>
            <Input
            bsSize='lg'
              name={`nickname`}
              id={`nickname`}
              placeholder='Nome Completo'
              innerRef={register({ required: false })}
              value={userData.nickname}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className={classnames({ 'is-invalid': errors[`nickname`] })}
            />
          </FormGroup>
        </Row>
        {/* <Row>
          <div className='form-group form-password-toggle col-md-6'>
            <Label className='form-label' for={`password-val-${type}`}>
              Email
            </Label>
            <Input
              bsSize='lg'
              type='email'
              name={`password-val-${type}`}
              id={`password-val-${type}`}
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`password-val-${type}`] })}
            />
          </div>
          <div className='form-group form-password-toggle col-md-6'>
            <Label className='form-label' for='confirm-password-val'>
              Confirme seu E-mail
            </Label>
            <Input
              bsSize='lg'
              type='email'
              name='confirm-password-val'
              id='confirm-password-val'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors['confirm-password-val'] })}
            />
          </div>
        </Row> */}
        {/* <Row>
        <FormGroup tag={Col} md='6' className="">
            <Label className='form-label' for={`cnpj`}>
              CNPJ
            </Label>
            <Input
              bsSize='lg'
              name={`cnpj`}
              id={`cnpj`}
              placeholder='CNPJ da Empresa'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`cnpj`] })}
            />
          </FormGroup>
        </Row> */}
        <div className='d-flex justify-content-between mt-1'>
          <Button.Ripple color='secondary' className='btn-prev' outline disabled hidden>
            <ArrowLeft size={25} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Voltar Etapa Anterior</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Proxima Etapa</span>
            <ArrowRight size={25} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
