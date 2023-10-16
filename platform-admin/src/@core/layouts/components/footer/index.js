// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a onClick={(e) => { e.preventDefault() }} target='_blank' rel='noopener noreferrer'>
          Reconhece
        </a>
        <span className='d-none d-sm-inline-block'>, Todos os direitos reservados</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Reconhece
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
