// ** Link
import { Link } from 'react-router-dom'

// ** moment Components
import moment from 'moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { deleteCampaign, editCampaign, getData } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import { Edit2, MoreVertical, Trash2, Check, Users, Inbox } from 'react-feather'
import { setCampaign  } from '../../participant/store/action'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  return <Avatar color={color || 'primary'} className='mr-1' content={row.clientName} initials />
}

const statusObj = {
  true: 'light-success',
  false: 'light-secondary'
}

export const columns = [
  {
    name: 'Campanha',
    //minWidth: '4rem',
    selector: 'name',
    sortable: false,
    cell: row => (
      <div className='d-flex flex-grow-1 justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.clientName}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Nome da Campanha',
    //minWidth: '10rem',
    selector: 'name',
    sortable: false,
    cell: row => (
      <div className='d-flex flex-grow-1 justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.name}</span>
        </div>
      </div>
    )
  },

  {
    name: 'Participantes',
    //minWidth: '15rem',
    selector: 'name',
    sortable: false,
    cell: row => (
      <div className='d-flex flex-grow-1 justify-content-left align-items-center'>
        <Button.Ripple className='round d-flex align-items-center' color='primary' outline tag={Link}
          to={`/apps/participant/list/${row.id}`}
          onClick={() => store.dispatch(setCampaign(row.id))}
          >
          <Users size={18} className="mr-50" />
          Visualizar
        </Button.Ripple>
      </div>
    )
  },
  {
    name: 'Fator Conversão',
    //minWidth: '5rem',
    selector: 'email',
    sortable: false,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='font-weight-bold'>{row.coinConversionFactor}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Data Criação',
    ////minWidth: '297px',
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
    //minWidth: '50px',
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
    //minWidth: '80px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteCampaign(row.id, row.active))}>
            {!!row.active ? <Trash2 size={14} className='mr-50' /> : <Check size={14} className='mr-50' />}
            <span className='align-middle'>{(row.active ? 'Desativar' : 'Ativar')}</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(editCampaign(row.id))}>
            <Edit2 size={14} className='mr-50' />
            <span className='align-middle'>Editar</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
