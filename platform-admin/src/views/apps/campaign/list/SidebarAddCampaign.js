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
import { Button, FormGroup, Label, Form, FormFeedback, CustomInput, Row, Tooltip } from 'reactstrap'
import UILoader from '@components/ui-loader'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AlertCircle } from 'react-feather'

// ** Store & Actions
import { AddCampaign, updateCampaign, getSystems } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { booleanOptions } from '../../utils'

const defaultValues = {
  clientId: '',
  name: '',
  coinConversionFactor: 1,
  allowCardPayment: null,
  allowedCardPaymentPercentage: 100,
  allowPointAmountSelection: null,
  primaryColor: '',
  secondaryColor: ''
}


const SidebarAddCampaign = ({ currentItem, open, toggleSidebar }) => {
  const store = useSelector(state => state.campaign)
  const dataSchema = yup.object().shape({
    id: yup.string().nullable(),
    name: yup.string().min(3).required(),
    coinConversionFactor: yup.number().min(0.01).required(),
    allowCardPayment: yup.object().nullable().required(),
    allowedCardPaymentPercentage: yup.number().min(0).max(100).required(),
    allowPointAmountSelection: yup.object().nullable().required(),
    primaryColor: yup.string().min(3).required(),
    secondaryColor: yup.string().min(3).required()
  })

  const [data, setData] = useState(defaultValues)

  // ** States
  const [loading, setLoading] = useState(false)
  const [idSystemOptions, setidSystemOptions] = useState([])
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [loggedUserData, setLoggedUserData] = useState(undefined)

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen)
  }

  const [tooltipOpen2, setTooltipOpen2] = useState(false)

  const toggleTooltip2 = () => {
    setTooltipOpen2(!tooltipOpen2)
  }

  useEffect(() => {
    setLoggedUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  // ** Store Vars
  const dispatch = useDispatch()
  const setCurrentState = (currentItem) => {
    if (!!currentItem) {
      setData({
        id: currentItem.id,
        clientId: { value: currentItem.clientId, label: currentItem.clientName },
        name: currentItem.name,
        coinConversionFactor: currentItem.coinConversionFactor,
        allowCardPayment: booleanOptions.find(x => x.value === currentItem.allowCardPayment),
        allowedCardPaymentPercentage: currentItem.allowedCardPaymentPercentage,
        allowPointAmountSelection: booleanOptions.find(x => x.value === currentItem.allowPointAmountSelection),
        primaryColor: currentItem.primaryColor,
        secondaryColor: currentItem.secondaryColor
      })
    } else {
      setData(defaultValues)
    }
  }
  useEffect(() => {
    setCurrentState(currentItem)
    if (!((currentItem || {}).id)) dispatch(getSystems())
  }, [currentItem])

  useEffect(() => {
    setLoading(!!store.loadingSidebar)
  }, [store.loadingSidebar])

  useEffect(() => {
    setidSystemOptions([...(store.comboSystem || [])])
  }, [store.comboSystem])

  // ** Vars
  const {
    handleSubmit,
    control,
    register,
    errors,
    formState: { isSubmitted }
  } = useForm({ mode: 'onChange', resolver: yupResolver(dataSchema) })

  const handleSelectSystem = (systemId) => {
    setclientId(systemId)
  }

  const handleToggleSidebar = () => {
    setCurrentState(undefined)
    toggleSidebar()
  }

  
  // ** Function to handle form submit
  const onSubmit = values => {

    if (isObjEmpty(errors)) {
      dispatch({
        type: 'LOADING_CAMPAIGN'
      })
      const { id, clientId, name, coinConversionFactor, allowCardPayment, allowedCardPaymentPercentage, allowPointAmountSelection, primaryColor, secondaryColor } = values
      dispatch(!id ? AddCampaign({ clientId: loggedUserData?.ClientId, name, coinConversionFactor, allowCardPayment: allowCardPayment?.value, allowedCardPaymentPercentage, allowPointAmountSelection: allowPointAmountSelection?.value, primaryColor, secondaryColor }) : updateCampaign({ id, clientId: clientId?.value, name, coinConversionFactor, allowCardPayment: allowCardPayment?.value, allowedCardPaymentPercentage, allowPointAmountSelection: allowPointAmountSelection?.value, primaryColor, secondaryColor }))
      handleToggleSidebar()
      setCurrentState(undefined)
    }
  }

  return (
    <UILoader blocking={loading}>
      <Sidebar
        size='lg'
        open={open}
        title={`${(!!currentItem ? 'Editar' : 'Nova')} Campanha`}
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
            <Label for='name'>Nome da campanha: <span className='text-danger'>*</span></Label>
            <Controller
              name="name"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.name}
              as={<input placeholder="Ex: Reconhece em Ação"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['name'] })} />}
            />
            {/* {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='coinConversionFactor'>Fator de conversão: <span className='text-danger'>*</span></Label>
            <Controller
              name="coinConversionFactor"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.coinConversionFactor}
              as={<input type="number" placeholder="Ex: 0, 1, 2, 3"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['coinConversionFactor'] })} />}
            />
            {/* {errors && errors.coinConversionFactor && <FormFeedback>{errors.coinConversionFactor.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='allowCardPayment'>Aceita cartão: <span className='text-danger'>*</span></Label>
            <Controller
              isClearable
              as={Select}
              placeholder="Selecione..."
              noOptionsMessage={() => 'nenhuma opção encontrada!'}
              control={control}
              name='allowCardPayment'
              options={booleanOptions}
              defaultValue={booleanOptions.find(x => x.value === data.allowCardPayment?.value)}
              rules={{ required: true }}
              className={classnames('react-select', { 'is-invalid': !!isSubmitted && !!errors['allowCardPayment'] })}
              classNamePrefix='select'
            />
            {/* {errors && errors.allowCardPayment && <FormFeedback>{errors.allowCardPayment.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='allowedCardPaymentPercentage'>Qual percentual de pagamento por cartão: <span className='text-danger'>*</span></Label>
            <Controller
              name="allowedCardPaymentPercentage"
              rules={{
                required: true
              }}
              control={control}
              defaultValue={data.allowedCardPaymentPercentage}
              as={<input type="number" placeholder="Ex: 5%, 10%, 20%, 30%"
                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['allowedCardPaymentPercentage'] })} />}
            />
            {/* {errors && errors.allowedCardPaymentPercentage && <FormFeedback>{errors.allowedCardPaymentPercentage.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='allowPointAmountSelection'>Permite seleção de quantidade de pontos: <span className='text-danger'>*</span></Label>
            <Controller
              isClearable
              as={Select}
              placeholder="Selecione..."
              noOptionsMessage={() => 'nenhuma opção encontrada!'}
              control={control}
              name='allowPointAmountSelection'
              options={booleanOptions}
              defaultValue={booleanOptions.find(x => x.value === data.allowPointAmountSelection?.value)}
              rules={{ required: true }}
              className={classnames('react-select d-block', { 'is-invalid': !!isSubmitted && !!errors['allowPointAmountSelection'] })}
              classNamePrefix='select'
            />
            {/* {errors && errors.allowPointAmountSelection && <FormFeedback>{errors.allowPointAmountSelection.message}</FormFeedback>} */}
          </FormGroup>

          <FormGroup>
            <Label for='campaignLogo'>
                Logo da Campanha<span className='text-danger'>*</span>
            </Label>
            <AlertCircle size={20} className='ml-1' id="tooltipTarget" />
                        <Tooltip isOpen={tooltipOpen} target="tooltipTarget" toggle={toggleTooltip}>
                            300×600 pixels
                        </Tooltip>
            <CustomInput
                type="file"       
                accept="image/*"         
                name="campaignLogo"
                label={'Enviar o logo da Campanha'}
                
            //onChange={}
            //invalid={} 
            />
        </FormGroup>

        <FormGroup>
            <Label for='full-name'>
                Banner da Campanha<span className='text-danger'>*</span>
            </Label>
            <AlertCircle size={20} className='ml-1' id="tooltipTarget2" />
                        <Tooltip isOpen={tooltipOpen2} target="tooltipTarget2" toggle={toggleTooltip2}>
                            300×600 pixels
                        </Tooltip>
            <CustomInput
                type="file"
                id="exampleCustomFileBrowser"
                name="customFile"
                label={'Envie o Banner da Campanha'}
            //onChange={}
            //invalid={} 
            />
        </FormGroup>
            
        <div className='d-flex'>
            <FormGroup className="pr-1">
                <Label for='primaryColor'>Cor Pimaria: <span className='text-danger'>*</span></Label>
                <Controller
                name="primaryColor"
                rules={{
                    required: true
                }}
                control={control}
                defaultValue={data.primaryColor}
                as={<input placeholder="Cor Primaria"
                    className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['name'] })} />}
                />
                {/* {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>} */}
            </FormGroup>

            <FormGroup className="pl-1">
                <Label for='secondaryColor'>Cor Secundaria: <span className='text-danger'>*</span></Label>
                <Controller
                name="secondaryColor"
                rules={{
                    required: true
                }}
                control={control}
                defaultValue={data.secondaryColor}
                as={<input placeholder="Cor Secundaria"
                    className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['name'] })} />}
                />
                {/* {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>} */}
            </FormGroup>
        </div>

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

export default SidebarAddCampaign
