// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import SidebarPartner from './SidebarPartner'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getData, editPartner, getClientes, getCampanhas } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Search } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
import { useIntl, injectIntl } from 'react-intl'
import UILoader from '@components/ui-loader'
import { Link } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { statusOptions, ToastErrorContent } from './../../utils'

const PartnersTable = () => {
    const intl = useIntl()

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.promotions)

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentStatus, setCurrentStatus] = useState(statusOptions.find(x => x.value === true))
    const [client, setClient] = useState(undefined)
    const [campaing, setCampaign] = useState(undefined)

    // ** Function to toggle sidebar
    const toggleSidebar = () => {
        if (sidebarOpen) {
            dispatch(editPartner(undefined))
        }
        setSidebarOpen(!sidebarOpen)
    }

    const getCurrentState = (args) => {
        const { page, limit, status, q, client } = args || {}
        if (!!page) setCurrentPage(page)
        if (!!limit) setRowsPerPage(limit)
        if (!!status) setCurrentStatus(status)
        if (!!q) setSearchTerm(q)
        if (!!client) setClient(client)
        if (!!campaing) setCampaign(campaing)

        dispatch(getData({
            page: page || currentPage,
            limit: limit || rowsPerPage,
            status: !!status ? status.value : currentStatus.value,
            q: q || searchTerm,
            clientId: client,
            campaaignId: campaing
        }))
    }

    // ** Get data on mount
    useEffect(() => {
        getCurrentState()
        dispatch(getClientes())
    }, [dispatch])

    useEffect(() => {
        if (!store.currentId) {
            setCurrentItem(undefined)
            return
        }
        const item = store.data.find(x => x.id === store.currentId)
        if (!item) return

        setCurrentItem(item)
        setSidebarOpen(true)

    }, [store.currentId])

    useEffect(() => {
        if (!store.errorMessage) return
        toast.error(
            <ToastErrorContent message={store.errorMessage} title={intl.formatMessage({ id: 'Error' })} />,
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
        )

    }, [store.errorMessage])
    useEffect(() => {
        console.log('loading', store.loading)
        setLoading(!!store.loading)
    }, [store.loading])

    // ** Function in get data on page change
    const handlePagination = page => {
        getCurrentState({ page: page.selected + 1 })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        getCurrentState({ page: 1, limit: parseInt(e.currentTarget.value) })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
    }
    const handleStatus = data => {
        getCurrentState({ page: 1, status: data })
    }

    const handleClientChange = (e) => {
        if (!!e) dispatch(getCampanhas(e.value))
        getCurrentState({ page: 1, client: e })
    }

    const handleCampaignChange = (e) => {
        getCurrentState({ page: 1, campaing: e })
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(store.total / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {

        const filters = {
            status: currentStatus.value,
            q: searchTerm
        }
        const isFiltered = Object.keys(filters).some(function (k) {
            return !!filters[k] && filters[k].length > 0
        })

        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    return (
        <UILoader blocking={loading}>
            <Fragment>
                <Breadcrumb className='md-3'>
                    <BreadcrumbItem>
                        <Link to='/'> Home </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/apps/partners'> Promoções </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Fragment>
            
            <Fragment>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Filtros</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='2'>
                                <Label>Status</Label>
                                <Select
                                    theme={selectThemeColors}
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={statusOptions}
                                    value={currentStatus}
                                    onChange={handleStatus}
                                />
                            </Col>

                            <Col md='2'>
                                <Label for='rows-per-page'>Mostrar:</Label>
                                <CustomInput
                                    className='form-control'
                                    type='select'
                                    id='rows-per-page'
                                    value={rowsPerPage}
                                    onChange={handlePerPage}>
                                    <option value='10'>10</option>
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                </CustomInput>
                            </Col>

                            <Col md='2'>
                                <Label>Cliente</Label>
                                <Select
                                    theme={selectThemeColors}
                                    isClearable={true}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={store.comboClients || []}
                                    onChange={handleClientChange}
                                />
                            </Col>
                            <Col md='2'>
                                <Label>Campanha</Label>
                                <Select
                                    theme={selectThemeColors}
                                    isClearable={true}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={store.comboCampaigns || []}
                                    onChange={handleCampaignChange}
                                />
                            </Col>

                            <Col md='2' className='d-flex align-items-end'>
                                <Button.Ripple className=' d-flex align-items-center' color='success' outline onClick={toggleSidebar}>
                                    Criar Promoção
                                </Button.Ripple>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <DataTable
                        noHeader
                        pagination
                        subHeader
                        responsive
                        paginationServer
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                    />
                </Card>

                <SidebarPartner open={sidebarOpen} toggleSidebar={toggleSidebar} currentItem={currentItem} />
            </Fragment>
        </UILoader>
    )
}

export default PartnersTable
