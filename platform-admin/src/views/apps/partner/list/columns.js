import moment from 'moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { deletePartner, editPartner } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Edit2, MoreVertical, Trash2, Check} from 'react-feather'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

    return <Avatar color={color || 'primary'} className='mr-1' content={row.name} initials />
}

const statusObj = {
  true: 'light-success',
  false: 'light-secondary'
}

export const columns = [
  {
    name: 'Nome',
    selector: 'name',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Aceita Cartão',
    selector: 'acceptCardPayment',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{(!!row.acceptCardPayment ? 'Sim' : 'Não')}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Data Criação',
    selector: 'fullName',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='font-weight-bold'>{(moment(row.creationDate).format('DD/MM/YYYY'))}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Status',
    minWidth: '138px',
    selector: 'status',
    sortable: false,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.active]} pill>
        {(!!row.active ? 'Ativo' : 'Inativo')}
      </Badge>
    )
  },
  {
    name: 'Ações',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deletePartner(row.id, row.active))}>
            {!!row.active ? <Trash2 size={14} className='mr-50' /> : <Check size={14} className='mr-50' />}
            <span className='align-middle'>{(row.active ? 'Desativar' : 'Ativar')}</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(editPartner(row.id))}>
            <Edit2 size={14} className='mr-50' />
            <span className='align-middle'>Editar</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
