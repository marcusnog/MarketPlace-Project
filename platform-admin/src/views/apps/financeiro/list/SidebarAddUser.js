
// ** React Select
import Select from 'react-select'

// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, FormFeedback } from 'reactstrap'
import UILoader from '@components/ui-loader'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store & Actions
import { addUser, updateUser, getSystems, getProfiles } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
// import { defaultOptions } from '../../utils'

const defaultValues = {
  nickname: '',
  email: '',
  phone: '',
  idProfile: null,
  idSystem: null
}

const SidebarAddUser = ({ currentItem, open, toggleSidebar }) => {
  const store = useSelector(state => state.user)
  const dataSchema = yup.object().shape({
    id: yup.string().nullable(),
    nickname: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    idSystem: yup.object().nullable().required(),
    idProfile: yup.object().nullable().required()
  })
  const [data, setData] = useState(defaultValues)

  // ** Vars
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitted },
    setValue
  } = useForm({ mode: 'onChange', resolver: yupResolver(dataSchema) })

  // ** States
  const [loading, setLoading] = useState(false)
  const [idProfileOptions, setidProfileOptions] = useState(null)
  const [isProfileSelectDisabled, setIsProfileSelectDisabled] = useState(true)
  const [idSystemOptions, setidSystemOptions] = useState([])
  const [firstRun, setFirstRun] = useState(true)
  // ** Store Vars
  const dispatch = useDispatch()
  const setCurrentState = (currentItem) => {
    if (!!currentItem) {
      setData({
        id: currentItem.id,
        nickname: currentItem.nickname,
        email: currentItem.email,
        phone: currentItem.phone,
        idProfile: { value: currentItem.idProfile, label: currentItem.profileName },
        idSystem: { value: currentItem.idSystem, label: currentItem.systemName }
      })
      setFirstRun(true)
    } else {
      setData(defaultValues)
    }
  }
  useEffect(() => {
    setCurrentState(currentItem)
    if (!((currentItem || {}).id)) dispatch(getSystems())
    else dispatch(getProfiles(currentItem.idSystem))
  }, [currentItem])

  useEffect(() => {
    setLoading(!!store.loadingSidebar)
  }, [store.loadingSidebar])

  useEffect(() => {
    setidSystemOptions([...(store.comboSystem || [])])
  }, [store.comboSystem])

  useEffect(() => {
    setidProfileOptions([...(store.comboProfile || [])])
    setIsProfileSelectDisabled(!(store.comboProfile || []).length)
    if (!!firstRun) {
      setFirstRun(false)
      setValue('idSystem', (store.comboSystem || []).find(x => x.value === data.idSystem?.value))
      setValue('idProfile', (store.comboProfile || []).find(x => x.value === data.idProfile?.value))
    }
  }, [store.comboProfile])


  const handleSelectSystem = (systemId) => {
    setValue('idProfile', null)
    dispatch(getProfiles(systemId))
  }
  const handleSelectProfile = (profileId) => {
    setSelectedProfile(idProfileOptions.find(x => x.value === profileId))
  }

  const handleToggleSidebar = () => {
    setCurrentState(undefined)
    toggleSidebar()
  }
  // ** Function to handle form submit  
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch({
        type: 'LOADING_USER'
      })
      const { id, nickname, email, phone, idProfile, idSystem } = values
      dispatch(!id ? addUser({ nickname, password: '', email, phone, idProfile: idProfile?.value, idSystem: idSystem?.value }) : updateUser({ id, nickname, phone, idProfile: idProfile?.value }))
      handleToggleSidebar()
      setCurrentState(undefined)
    }
  }

  return (
    <UILoader blocking={loading}>
      <Sidebar
        size='lg'
        open={open}
        title={`${(!!currentItem ? 'Editar' : 'Novo')} Usuario`}
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={handleToggleSidebar}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="id"
            control={control}
            defaultValue={data.id}
            as={<input type="hidden" />}
          />
          <FormGroup>
            <Label for='nickname'>Nickname: <span className='text-danger'>*</span></Label>
            <Controller
              name="nickname"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.nickname}
              as={<input placeholder="Ex: João da Silva"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['nickname'] })} />}
            />
            {/* {errors && errors.nickname && <FormFeedback>{errors.nickname.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup className={classnames({ hidden: !!data.id })}>
            <Label for='email'>E-mail: <span className='text-danger'>*</span></Label>
            <Controller
              name="email"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.email}
              as={<input placeholder="Preencha seu email xxxx@digi.ag" type="email"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['email'] })} />}
            />
            {/* {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='phone'>Celular: <span className='text-danger'>*</span></Label>
            <Controller
              name="phone"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.phone}
              as={<input placeholder="(xx) xxxxx-xxxx"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['phone'] })} />}
            />
            {/* {errors && errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup className={classnames({ hidden: !!data.id })}>
            <Label for='idSystem'>Sistema: <span className='text-danger'>*</span></Label>
            <Controller
              isClearable
              // as={Select}
              render={({ onChange, value, name, ref }) => {

                return (
                  <Select
                    isClearable
                    options={idSystemOptions}
                    defaultValue={data.idSystem}
                    className={classnames('react-select', { 'is-invalid': !!isSubmitted && !!errors['idSystem'] })}
                    classNamePrefix='select'
                    onChange={val => {
                      handleSelectSystem(val?.value)
                      onChange(val)
                    }}
                    placeholder="Selecione..."
                    noOptionsMessage={() => 'nenhuma opção encontrada!'}
                  />)
              }}
              control={control}
              rules={{ required: true }}
              name='idSystem'
            />
            {/* {errors && errors.idSystem && <FormFeedback>{errors.idSystem.message}</FormFeedback>} */}
          </FormGroup>

          <FormGroup>
            <Label for='idProfile'>Perfil: <span className='text-danger'>*</span></Label>
            <Controller
              isClearable
              as={Select}
              placeholder="Selecione..."
              noOptionsMessage={() => 'nenhuma opção encontrada!'}
              control={control}
              name='idProfile'
              options={idProfileOptions}
              rules={{ required: true }}
              defaultValue={(idProfileOptions || []).find(x => x.value === data.idProfile?.value)}
              className={classnames('react-select', { 'is-invalid': !!isSubmitted && !!errors['idProfile'] })}
              classNamePrefix='select'
              isDisabled={isProfileSelectDisabled}
            />
            {/* {errors && errors.idProfile && <FormFeedback>{errors.idProfile.message}</FormFeedback>} */}
          </FormGroup>
          <Button type='submit' className='mr-1' color='primary'>
            {(!!currentItem ? 'Salvar' : 'Adicionar')}
          </Button>

          <Button type='reset' color='secondary' outline onClick={handleToggleSidebar}>
            Cancelar
          </Button>
        </Form>
      </Sidebar>
    </UILoader>
  )
}

export default SidebarAddUser
