import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'react-feather'
import { Label, FormGroup, Row, Col, Button, Form, Input } from 'reactstrap'
import axios from 'axios'

const SocialLinks = ({ stepper, userData, handleInputChange, handleSubmit }) => {
  const { register, errors, trigger } = useForm()

  const onSubmit = () => {
      
    trigger()
    if (isObjEmpty(errors)) {
      
    }
  }

  
  return (
    <Fragment>
      <div className='content-header'>
        <h1 className='mb-1 text-center bs-color_text'>Pronto! Seus dados foram enviados.</h1>
        <p className='mb-0 text-center h4 lead'>Agora precisamos que você crie seu ID e senha de acesso</p>
      </div>
      <Form>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`email`}>
              Email
            </Label>
            <Input
             bsSize='lg'
              type='text'
              id={`email`}
              name={`email`}
              placeholder='Digite seu e-mail corporativo'
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`email`] })}
            />

            <label className='form-label mt-1' >
                Deve ser seu e-mal corporativo
            </label>
          </FormGroup>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`password`}>
            Senha
            </Label>
            <Input
              type="password"
              name="password"
              value={userData.password}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder="Senha"
            />
          </FormGroup>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Voltar Etapa Anterior</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='success' onClick={e => {
            e.preventDefault()
            handleSubmit(e)
          }} className='btn-submit'>
            ir para criação da campanha
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default SocialLinks
