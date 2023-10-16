import moment from 'moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { deleteUser, editUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Edit2, MoreVertical, Trash2, Check } from 'react-feather'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  return <Avatar color={color || 'primary'} className='mr-1' content={row.nickname} initials />
}

const statusObj = {
  true: 'light-success',
  false: 'light-secondary'
}

export const columns = [
  {
    name: 'pointsId',
    minWidth: '150px',
    selector: 'name',
    sortable: false,
    cell: row => (
      <div className='d-flex flex-grow-1 justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.pointsId}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Valor em Pontos',
    //minWidth: '297px',
    selector: 'pointsValue',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.pointsValue}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Data',
    //minWidth: '297px',
    selector: 'createdAt',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{(moment(row.createdAt).format('DD/MM/YYYY'))}</span>
        </div>
      </div>
    )
  },

  {
    name: 'Status',
    //minWidth: '138px',
    selector: 'active',
    sortable: false,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.active]} pill>
        {(!!row.active ? 'Recarga' : 'Estorno')}
      </Badge>
    )
  }
]
