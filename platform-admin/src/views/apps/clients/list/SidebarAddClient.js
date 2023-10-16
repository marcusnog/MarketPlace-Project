// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import InputMask from "react-input-mask"

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, FormGroup, Label, Form } from 'reactstrap'
import UILoader from '@components/ui-loader'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store & Actions
import { addClient, updateClient } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

const defaultValues = {
    name: '',
    documents: ''
}

const SidebarAddClient = ({ currentItem, open, toggleSidebar }) => {
    const store = useSelector(state => state.client)
    const dataSchema = yup.object().shape({
        id: yup.string().nullable(),
        name: yup.string().required(),
        CNPJ: yup.string().required()
    })
    const [data, setData] = useState(defaultValues)

    // ** Vars
    const {
        handleSubmit,
        control,
        errors,
        formState: { isSubmitted }
    } = useForm({ mode: 'onChange', resolver: yupResolver(dataSchema) })

    // ** States
    const [loading, setLoading] = useState(false)

    // ** Store Vars
    const dispatch = useDispatch()
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
        setCurrentState(currentItem)
    }, [currentItem])

    useEffect(() => {
        setLoading(!!store.loadingSidebar)
    }, [store.loadingSidebar])

    const handleToggleSidebar = () => {
        setCurrentState(undefined)
        toggleSidebar()
    }

    // ** Function to handle form submit  
    const onSubmit = values => {
        if (isObjEmpty(errors)) {
            dispatch({
                type: 'LOADING_CLIENT'
            })
            const { id, name, CNPJ } = values
            dispatch(!id ? addClient({ name, documents: [{ type: 'CNPJ', value: CNPJ }] }) : updateClient({ id, name, documents: [{ type: 'CNPJ', value: CNPJ }] }))
            handleToggleSidebar()
            setCurrentState(undefined)
        }
    }

    return (
        <UILoader blocking={loading}>
            <Sidebar
                size='lg'
                open={open}
                title={`${(!!currentItem ? 'Editar' : 'Novo')} Cliente`}
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
                        <Label for='name'>Cliente: <span className='text-danger'>*</span></Label>
                        <Controller
                            name="name"
                            rules={{
                                required: true
                            }}
                            control={control}
                            defaultValue={data.name}
                            as={<input placeholder="Ex: João da Silva"
                                className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['name'] })} />}
                        />
                        {/* {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>} */}
                    </FormGroup>
                    <FormGroup>
                        <Label for='CNPJ'>CNPJ: <span className='text-danger'>*</span></Label>
                        <Controller
                            name="CNPJ"
                            rules={{
                                required: true
                            }}
                            control={control}
                            defaultValue={data.CNPJ}
                            render={({ onChange, value, name, ref }) => {
                                return (
                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        className={classnames('form-control', { 'is-invalid': !!isSubmitted && !!errors['CNPJ'] })}
                                        placeholder="xx.xxx.xxx/xxxx-xx"
                                        onChange={val => {
                                            onChange(val)
                                        }}
                                    />)
                            }}

                        />
                        {/* {errors && errors.value && <FormFeedback>{errors.value.message}</FormFeedback>} */}
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

export default SidebarAddClient
