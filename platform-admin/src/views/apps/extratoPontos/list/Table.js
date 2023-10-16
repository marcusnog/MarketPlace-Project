import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListPointsPurchase } from '../store/action/index'
import { columns } from './columns'
// ** Store & Actions
import { getData } from '../store/action'
import DataTable from 'react-data-table-component'
import UILoader from '@components/ui-loader'
import axios from 'axios'
import { statusOptions, ToastErrorContent } from './../../utils'
import { Card } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { useIntl, injectIntl } from 'react-intl'


const PointsPurchaseList = () => {
  // const [data, setData] = useState([])
  const intl = useIntl()
  const store = useSelector(state => state.user)
  const [currentStatus, setCurrentStatus] = useState(statusOptions.find(x => x.value === true))
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

 
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

  // ** Store Vars
  const dispatch = useDispatch()

  const getCurrentState = (args) => {
    const { page, limit, status, q } = args || {}
    if (!!page) setCurrentPage(page)
    if (!!limit) setRowsPerPage(limit)
    if (!!status) setCurrentStatus(status)
    if (!!q) setSearchTerm(q)

    dispatch(getData({
      page: page || currentPage,
      limit: limit || rowsPerPage,
      status: !!status ? status.value : currentStatus.value,
      q: q || searchTerm
    }))
  }


  const handlePagination = page => {
    getCurrentState({ page: page.selected + 1 })
  }

  // ** Get data on mount
  useEffect(() => {
    getCurrentState()
  }, [dispatch])

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
    <div>
      <h2>Points Purchase List</h2>

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
            data={dataToRender()}
          />
        </Card>
    </div>
  )
}

export default PointsPurchaseList