// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Form, Input, CustomInput, Tooltip } from 'reactstrap'
import { AlertCircle } from 'react-feather'
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

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const toggleTooltip = () => {
      setTooltipOpen(!tooltipOpen)
    }

    const [tooltipOpen2, setTooltipOpen2] = useState(false)

    const toggleTooltip2 = () => {
      setTooltipOpen2(!tooltipOpen2)
    }

    const [tooltipOpen3, setTooltipOpen3] = useState(false)

    const toggleTooltip3 = () => {
      setTooltipOpen3(!tooltipOpen3)
    }
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
            title={`${(!!currentItem ? 'Editar' : 'Nova')} Promoção`}
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='full-name'>
                        Titulo: <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='full-name'
                        id='full-name'
                        placeholder='Preencha o nome da promoção'
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
                        Descrição: <span className='text-danger'>*</span>
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
                        Banner: (Web) <span className='text-danger'>*</span>
                    </Label>
                    <AlertCircle size={20} className='ml-1' id="tooltipTarget" />
                        <Tooltip isOpen={tooltipOpen} target="tooltipTarget" toggle={toggleTooltip}>
                            300×600 pixels
                        </Tooltip>
                    <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        label={'Envie o Banner Web'}
                    //onChange={}
                    //invalid={} 
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='full-name'>
                        Banner: (Celular) <span className='text-danger'>*</span>
                    </Label>
                    <AlertCircle size={20} className='ml-1' id="tooltipTarget2" />
                        <Tooltip isOpen={tooltipOpen2} target="tooltipTarget2" toggle={toggleTooltip2}>
                            700x700
                        </Tooltip>
                    <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        label={'Envie o Banner Celular'}
                    //onChange={}
                    //invalid={} 
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='full-name'>
                        Produtos (Planilha SKUs): <span className='text-danger'>*</span>
                    </Label>
                    <AlertCircle size={20} className='ml-1' id="tooltipTarget3" />
                        <Tooltip isOpen={tooltipOpen3} target="tooltipTarget3" toggle={toggleTooltip3}>
                            Enviar planilha com Skus e descrição dos produtos
                        </Tooltip>
                    <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        label={'Envie a Planilha de SKUS'}
                    //onChange={}
                    //invalid={} 
                    />
                </FormGroup>

                <Button type='submit' className='mr-1' color='primary'>
                    {(!!currentItem ? 'Editar' : 'Salvar')}
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancelar
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarPartner
