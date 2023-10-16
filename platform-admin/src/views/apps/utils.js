import { Fragment } from 'react'

export const defaultOptions = [{ value: undefined, label: 'Selecione', number: 0 }]

export const booleanOptions = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' }
]
export const statusOptions = [
    { value: undefined, label: 'Todos', number: 0 },
    { value: true, label: 'Ativo', number: 2 },
    { value: false, label: 'Inativo', number: 3 }
]

export const ToastErrorContent = ({ title, message }) => (
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