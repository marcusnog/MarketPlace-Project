import moment from 'moment'
import Select from 'react-select'

// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addPartner, updatePartner } from '../store/action'
import { useDispatch } from 'react-redux'

const SidebarPartner = ({ currentItem, open, toggleSidebar }) => {
  // ** States
  const [id, setId] = useState(undefined)
  const [name, setName] = useState('')
  const [acceptCardPayment, setAcceptCardPayment] = useState(true)
  const acceptCardPaymentOptions = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' }
  ]
  // ** Store Vars
  const dispatch = useDispatch()
  const setCurrentState = (currentItem) => {
    if (!!currentItem) {
      setId(currentItem.id)
      setName(currentItem.name)
      setAcceptCardPayment(currentItem.acceptCardPayment)
    } else {
      setId(undefined)
      setName('')
      setAcceptCardPayment(true)
    }
  }
  useEffect(() => {
    setCurrentState(currentItem)
  }, [currentItem])
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    dispatch({
      type: 'LOADING_PARTNER'
    })
    if (isObjEmpty(errors)) {
      dispatch(!id ? addPartner({ name, acceptCardPayment }) : updatePartner({ id, name, acceptCardPayment }))
      toggleSidebar()
      setCurrentState(undefined)
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={`${(!!currentItem ? 'Editar' : 'Novo')} Parceiro`}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='full-name'>
            Nome: <span className='text-danger'>*</span>
          </Label>
          <Input
            name='full-name'
            id='full-name'
            placeholder='Ex: Casas Bahia'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['full-name'] })}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for='full-name'>
            Aceita Cartão: <span className='text-danger'>*</span>
          </Label>
          <Select
            className='react-select'
            classNamePrefix='select'
            options={acceptCardPaymentOptions}
            defaultValue={acceptCardPaymentOptions.find(x => x.value === acceptCardPayment)}
            onChange={({ value }) => {
              setAcceptCardPayment(value)
            }}

          />
        </FormGroup>
        <Button type='submit' className='mr-1' color='primary'>
          {(!!currentItem ? 'Salvar' : 'Adicionar')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarPartner
