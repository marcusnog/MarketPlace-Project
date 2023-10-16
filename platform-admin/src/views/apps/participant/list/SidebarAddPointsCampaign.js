// ** React Import
import { useEffect, useState, useCallback, Fragment } from 'react'

// ** Custom Components
import { toast, Slide } from 'react-toastify'

// ** Custom Components
import Sidebar from '@components/sidebar'
import axios from 'axios'
// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { PlusCircle } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { Button, FormGroup, Label, Form, CustomInput } from 'reactstrap'
import UILoader from '@components/ui-loader'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store & Actions
import { useIntl, injectIntl } from 'react-intl'
import { addClient, uploadPointsFileWithCampaignId } from '../store/action'
import { useDispatch, useSelector, connect } from 'react-redux'

const defaultValues = {
    id: '',
    name: '',
    documents: ''
}

const SidebarAddClient = ({ currentItem, open, toggleSidebar }) => {
    const store = useSelector(state => state.client)
    const [data, setData] = useState(defaultValues)
    const [campaignId, setCampaignId] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const intl = useIntl()
    
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
    const ToastContent = ({ title, message }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<PlusCircle size={12} />} />
                    <h6 className='toast-title font-weight-bold'>{title}</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span>{message}</span>
            </div>
        </Fragment>
    )
    
    const emitSuccess = () => {
        toast.success(
            <ToastContent message={intl.formatMessage({
                id: 'participant-point-create-success-toast-message'
            })} title={intl.formatMessage({ id: 'toast-create-title' })} />,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
        )
    }
    
    const emitError = (errorMessage) => {
        toast.error(
            <ToastErrorContent message={intl.formatMessage({
                id: 'participant-point-create-error-toast-message',
                defaultMessage: errorMessage
            })} title={intl.formatMessage({ id: 'toast-error-title' })} />,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
        )
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const getCurrentCampaign = () => {
        return location.href.split('/').pop()
    }

    const {
        control
    } = useForm({ mode: 'onChange' })

    // ** States
    const [loading, setLoading] = useState(false)

    // ** Store Vars
    const dispatch = useDispatch()
    
    const handleFileUpload = useCallback(() => {
        if (selectedFile && dispatch) {
            dispatch(uploadPointsFileWithCampaignId(selectedFile, campaignId))
                .then(() => {
                    emitSuccess()
                    toggleSidebar()
                }).catch((error) => {
                    emitError(error.getMessage)
                })
        }
    }, [selectedFile, dispatch])

    const setCurrentState = (currentItem) => {
        if (!!currentItem) {
            setData({
                id: currentItem.id,
                name: currentItem.name,
                CNPJ: (currentItem.documents || []).find((d) => d.type === "CNPJ")?.value
            })
        } else {
            setData(defaultValues)
        }
    }

    useEffect(() => {
        setCampaignId(getCurrentCampaign())
    }, [getCurrentCampaign()])

    useEffect(() => {
        setCurrentState(currentItem)
    }, [currentItem])

    useEffect(() => {
        setLoading(!!store.loadingSidebar)
    }, [store.loadingSidebar])

    const handleToggleSidebar = () => {
        setCurrentState(undefined)
        toggleSidebar()
    }

    return (
        <UILoader blocking={loading}>
            <Sidebar
                size='lg'
                open={open}
                title="Adicionar Pontos"
                headerClassName='mb-1'
                contentClassName='pt-0'
                toggleSidebar={handleToggleSidebar}
            >

                <p>Para de pontos para os participantes da campanha é necessário o envio do arquivo no formato XLS com os seguintes itens: </p>

                <div className='d-flex justify-content-between mt-2'>
                    <p className='btn btn-light text-nowrap'>Cpf</p>
                    <p className='btn btn-light'>Nome</p>
                    <p className='btn btn-light'>Pontos</p>
                    <p className='btn btn-light'>Observação</p>
                </div>

                <p className='mt-1'>Baixe o arquivo com o padrão aqui.</p>

                <a href="/examples/Modelo Pontos Distribuidos.xlsx" className='btn btn-outline-primary mt-1' target="_blank">
                    Clique aqui para baixar o arquivo de modelo .xlsx
                </a>

                <hr className='mb-2 mt-2 ' />

                <Form>
                    <Controller
                        name="id"
                        control={control}
                        defaultValue={data.id}
                        as={<input type="hidden" />}
                    />

                    <FormGroup className="border p-3 rounded border-dotted border-info">
                        <Label for='name' className="h4 text-center mb-2">Arraste para cá o arquivo com a lista de pontos ou: </Label>

                        <CustomInput
                            type="file"
                            id="exampleCustomFileBrowser"
                            name="customFile"
                            label={'Selecione o Arquivo'}
                            onChange={handleFileChange}
                        />
                    </FormGroup>
                    
                    <Button type='button' className='mr-1' color='primary' onClick={handleFileUpload}>
                        Distribuir Pontos
                    </Button>

                    <Button type='reset' color='secondary' outline onClick={handleToggleSidebar}>
                        Cancelar Envio
                    </Button>
                </Form>
            </Sidebar>
        </UILoader>
    )
}

export default connect(null, { uploadPointsFileWithCampaignId })(SidebarAddClient)