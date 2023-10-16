import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, FormGroup, Row, Col, Button, Form, Input } from 'reactstrap'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

const Address = ({ stepper, type }) => {
  const { register, errors, handleSubmit, trigger } = useForm()

  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
            <PerfectScrollbar
                className='border p-1 rounded position-relative'
                options={{ wheelPropagation: false }}
                //</Form>onScrollY={container => scrollMenu(container)}
                > 
                <div className='col-md-12 h-35-rem'>
                    <h2>Termos e condições de uso do RECONHECE.VC</h2>
                    
                    <p>Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.</p>
                    <p>Este documento, e todo o conteúdo do site é oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por “EMPRESA”, que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como “VISITANTE”, reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo, situado no endereço (ADICIONAR ENDEREÇO DO SITE).</p>
                    <p>A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 00 de MES de 00. </p>
                    
                    <h3 className='mt-1 mb-1'>1. DA FUNÇÃO DO SITE</h3>    

                    <p>Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.</p>
                    <p>Este documento, e todo o conteúdo do site é oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por “EMPRESA”, que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como “VISITANTE”, reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo, situado no endereço (ADICIONAR ENDEREÇO DO SITE).</p>
                    <p>A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 00 de MES de 00. </p>
                    
                    <h3 className='mt-2 mb-2'>1. DA FUNÇÃO DO SITE</h3>

                    <p>Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.</p>
                    <p>Este documento, e todo o conteúdo do site é oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por “EMPRESA”, que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como “VISITANTE”, reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo, situado no endereço (ADICIONAR ENDEREÇO DO SITE).</p>
                    <p>A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 00 de MES de 00. </p>

                    <h3 className='mt-2 mb-2'>1. DA FUNÇÃO DO SITE</h3>

                    <p>Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.</p>
                    <p>Este documento, e todo o conteúdo do site é oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por “EMPRESA”, que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como “VISITANTE”, reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo, situado no endereço (ADICIONAR ENDEREÇO DO SITE).</p>
                    <p>A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 00 de MES de 00. </p>

                    <h3 className='mt-2 mb-2'>1. DA FUNÇÃO DO SITE</h3>

                    <p>Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.</p>
                    <p>Este documento, e todo o conteúdo do site é oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por “EMPRESA”, que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como “VISITANTE”, reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo, situado no endereço (ADICIONAR ENDEREÇO DO SITE).</p>
                    <p>A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 00 de MES de 00. </p>
                    <hr />
                </div>
            </PerfectScrollbar>
            <div className='MuiBox-root'></div>
           
          <FormGroup tag={Col} md='6' className="mt-2" hidden>
            <Input
            bsSize='lg'
              type='text'
              id={`address-${type}`}
              name={`address-${type}`}
              placeholder='98  Borough bridge Road, Birmingham'
              innerRef={register({ required: false })}
              className={classnames({ 'is-invalid': errors[`address-${type}`] })}
            />
          </FormGroup>
         
        <Row>
        <div className='d-flex justify-content-between mt-2 col-md-12 '>
          <Button.Ripple color='primary' className='btn-prev'>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Voltar etapa anterior</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Proxima Etapa</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
        </Row>
      </Form>
    </Fragment>
  )
}

export default Address
