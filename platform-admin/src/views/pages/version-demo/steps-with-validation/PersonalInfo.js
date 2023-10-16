import { Fragment } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input } from 'reactstrap'

import '@styles/react/libs/react-select/_react-select.scss'

const PersonalInfo = ({ stepper, type, userData, handleInputChange }) => {
  const { register, errors, handleSubmit, trigger } = useForm()

  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  const languageOptions = [
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '5000', label: '5000' },
    { value: '10000', label: '10000' }
  ]

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Dados da Empresa</h5>
        <small>Precisamos agora dos dados da empresa..</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`cnpj${type}`}>
              CNPJ da Empresa
            </Label>
            <Input
            bsSize='lg'
              type='text'
              name={`cnpj`}
              id={`cnpj`}
              placeholder='CNPJ da Empresa'
              value={userData.cnpj}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`cnpj`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
          <Label className='form-label' for={`cliente`}>
              Razão Social
            </Label>
            <Input
            bsSize='lg'
              type='text'
              name={`cliente`}
              id={`cliente`}
              placeholder='   Razão Social'
              value={userData.cliente}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`cliente`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`last-name-${type}`}>
              Nome Fantasia
            </Label>
            <Input
            bsSize='lg'
              type='text'
              name={`last-name-${type}`}
              id={`last-name-${type}`}
              placeholder=' Nome Fantasia'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`last-name-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`last-name-${type}`}>
              Email da Empresa
            </Label>
            <Input
            bsSize='lg'
              type='text'
              name={`last-name-${type}`}
              id={`last-name-${type}`}
              placeholder='Doe'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`last-name-${type}`] })}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`last-name-${type}`}>
              Data da Abertura da Empresa
            </Label>
            <Input
            bsSize='lg'
              type='datetime'
              name={`last-name-${type}`}
              id={`last-name-${type}`}
              placeholder='xx/xx/xxxx'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`last-name-${type}`] })}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`phone`}>
            Telefone da Empresa
            </Label>
            <Input
            bsSize='lg'
              type='text'
              name={`phone`}
              id={`phone`}
              placeholder='Telefone da Empresa'
              innerRef={register({ required: false })}
              value={userData.phone}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className={classnames({ 'is-invalid': errors[`phone`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`language-${type}`}>
              Quantidade de Funcionarios
            </Label>
            <Select
              //isMulti
              bsSize='lg'
              isClearable={false}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={languageOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </FormGroup>

        </Row>
        
        <div className='d-flex justify-content-between mt-1'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
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

export default PersonalInfo
