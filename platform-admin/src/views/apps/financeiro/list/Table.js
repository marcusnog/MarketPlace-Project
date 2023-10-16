// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import QrCode from 'react-qrcode-svg'

// ** Invoice List Sidebar
import SidebarAddUser from './SidebarAddUser'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getData, editUser } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, FileText, Search } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button, Breadcrumb, BreadcrumbItem, Form, FormGroup } from 'reactstrap'
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
    const store = useSelector(state => state.user)
    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentItem, setCurrentItem] = useState(undefined)
    const [currentStatus, setCurrentStatus] = useState(statusOptions.find(x => x.value === true))
    const [valorCalc, setValorCalc] = useState("")
    const [selectedOption, setSelectedOption] = useState(null)
    const [toggleState, setToggleState] = useState(1)
    const [activeTab, setActiveTab] = useState(1)
    const [value, setValue] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [summary, setSummary] = useState('')
    const [showDiv, setShowDiv] = useState(false)
    const [pointsValuet, setPointsValuet] = useState('')

    const handlePointsPurchase = () => {
    // Montar o objeto com o valor do input no corpo da requisição
    const requestBody = {
      pointsValue: value,
      PointsId: "641376d70633b01bc12a1353",
      UserId: "6419ec114005288c709f3b21",
      AccountId: "6419c928b952dcad5602387e"
    }

    // Fazer a requisição POST
    axios.post('http://20.226.77.29/points-purchase-api/api/PointsPurchase/Create', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // Tratar a resposta da API, se necessário
        console.log(response.data)
      })
      .catch(error => {
        // Tratar erros, se necessário
        console.error(error)
      })
  }


    const taxaFixa = value * 0.05
    const taxaY = 0.05
    
    useEffect(() => {
    const calcTaxa = () => {
      const taxa = parseFloat(value) * taxaY
      setValorCalc(parseFloat(value) + taxa)
      }
      calcTaxa()
    })
    

    const handleRadioClick = (event) => {
      const value = event.target.value
      setSelectedOption(value)
      setValue(value)
    }
    
    console.log("valor selecionado", summary)
    
    const handleTabChange = (tab) => {
      setActiveTab(tab)
    }
  
    const handleValueChange = (event) => {
      setValue(event.target.value)
    }
  
    const handlePaymentMethodChange = (event) => {
      setPaymentMethod(event.target.value)
    }
  
    useEffect(() => {
      const handleSubmit = () => {
      // event.preventDefault(event.target.value)
      // Aqui você pode fazer qualquer lógica adicional, como salvar o resumo da compra ou realizar algum processamento.
      // Neste exemplo, estamos apenas atualizando o estado de 'summary' com os valores selecionados.
      setSummary(`Pacote: ${value}, Valor Total: ${valorCalc}, Forma de pagamento: ${paymentMethod}`)
    }
    handleSubmit()
    })
    

  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value
  //   setPointsValue(e.target.value)
  //   // setValue(event.target.value)
  //   setShowDiv(inputValue !== '')
  // }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

    const handleClick = () => {
        toast.success(
            <ToastErrorContent message={store.successMessage} title={intl.formatMessage({ id: 'Solicitação enviada com sucesso' })} />,
            
            { transition: Slide, hideProgressBar: false, autoClose: 2000 }
        )
    }
    // ** Function to toggle sidebar
    const toggleSidebar = () => {
        if (sidebarOpen) {
            dispatch(editUser(undefined))
        }
        setSidebarOpen(!sidebarOpen)
    }

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

    // ** Get data on mount
    useEffect(() => {
        getCurrentState()
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

    const inputValue = "00020101021226480019BR.COM.STONE.QRCODE0108A37F8712020912345678927820 014BR.GOV.BCB.PIX2560sandbox-qrcode.stone.com.br/api/v2/qr/sGY7FyVExavqkzFvkQu MXA28580010BR.COM.ELO0104516002151234567890000000308933BB1100401P520400 00530398654041.005802BR5911STONE TESTE6009SAO PAULO62600522sGY7FyVExavqkzFvkQuMXA50300017BR.GOV.BCB.BRCODE01051.0.0 80500010BR.COM.ELO01100915132023020200030201040613202363043BA1" // Defina o valor do input desativado

  const handleCopyButtonClick = () => {
    if (inputValue) {
      navigator.clipboard.writeText(inputValue)
        .then(() => {
          console.log('Texto copiado para a área de transferência:', inputValue)
        })
        .catch((error) => {
          console.error('Erro ao copiar o texto:', error)
        })
    }
  }
    // ** Function in get data on rows per page

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


    //const CustomHeader = ({ toggleSidebar }) => {
      //  return (
         //   <div className='invoice-list-table-header w-100 mt-1'>
           //     <Row>
             //       <Col className='mb-1'>
               //         <Button.Ripple color='primary' onClick={toggleSidebar}>
                 //           Adicionar
                   //     </Button.Ripple>
                    //</Col>
                //</Row>
            //</div>
        //)
   // }

    return (
        <UILoader blocking={loading}>
            <Fragment>
                <Breadcrumb className='mb-2'>
                    <BreadcrumbItem>
                        <Link to='/'> Home </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/apps/user'> Compra de pontos </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Compra de pontos</CardTitle>
                    </CardHeader>
                    <CardBody>
                       <CardBody>
                        {activeTab === 1 && (
                        <form onSubmit={handlePointsPurchase}>
                        <ul className='d-flex pl-0'>
                        <li
                            className={selectedOption === '1000' ? 'p-5 border rounded mr-2 d-flex align-items-center flex-column box-ativo' : 'p-5 border rounded mr-2 d-flex align-items-center flex-column transition'}
                            onChange={handleRadioClick}
                          >
                            <label className='d-flex flex-column'>
                              <input
                                type='radio'
                                name='points'
                                value='1000'
                                checked={selectedOption === '1000'}
                                onChange={handleRadioClick}
                              />
                              <span className='text-primary h1 pt-1'>1.000</span>
                            </label>
                            <span className='d-block h4 text-primary'>pontos</span>
                          </li>
                          <li
                            className={selectedOption === '5000' ? 'p-5 border rounded mr-2 d-flex align-items-center flex-column box-ativo' : 'p-5 border rounded mr-2 d-flex align-items-center flex-column transition'}
                            onChange={handleRadioClick}
                          >
                            <label className='d-flex flex-column'>
                              <input
                                type='radio'
                                name='points'
                                value='5000'
                                checked={selectedOption === '5000'}
                                onChange={handleRadioClick}
                              />
                              <span className='text-primary h1 pt-1'>5.000</span>
                            </label>
                            <span className='d-block h4 text-primary'>pontos</span>
                          </li>
                          <li
                            className={selectedOption === '10000' ? 'p-5 border rounded mr-2 d-flex align-items-center flex-column box-ativo' : 'p-5 border rounded mr-2 d-flex align-items-center flex-column transition'}
                            onChange={handleRadioClick}
                          >
                            <label className='d-flex flex-column'>
                              <input
                                type='radio'
                                name='points'
                                value='10000'
                                checked={selectedOption === '10000'}
                                onChange={handleRadioClick}
                              />
                              <span className='text-primary h1 pt-1'>10.000</span>
                            </label>
                            <span className='d-block h4 text-primary'>pontos</span>
                          </li>
                          <li
                            className={selectedOption === '15000' ? 'p-5 border rounded mr-2 d-flex align-items-center flex-column box-ativo' : 'p-5 border rounded mr-2 d-flex align-items-center flex-column transition'}
                            onChange={handleRadioClick}
                          >
                            <label className='d-flex flex-column'>
                              <input
                                type='radio'
                                name='points'
                                value='15000'
                                checked={selectedOption === '15000'}
                                onChange={handleRadioClick}
                              />
                              <span className='text-primary h1 pt-1'>15.000</span>
                            </label>
                            <span className='d-block h4 text-primary'>pontos</span>
                          </li>
                        </ul>

                        <p className='d-flex'>ou digite o valor que deseja comprar</p>
                        <div className='d-flex w-100'>
                        <div className='col-md-4 mr-5'>
                        <input className="p-1 border rounded border-black w-100" type='text' value={value} placeholder='Valor em pontos'   onChange={e => { setValue(e.target.value); setShowDiv(true) }}/>
                        <Button color="primary" className={`tab ${activeTab === 2 ? 'active' : ''} d-block mt-2 `} onClick={() => handleTabChange(2)}>
                           <a onClick={handlePointsPurchase}>Avançar</a>
                        </Button>
                        </div>
                        {showDiv && <p>Por R$ {value} pontos + taxa 5%</p>}
                        
                        </div>
  
                            
                            </form>
                            )}
                            <div>
                        </div>
                        <div className="d-flex">
                        {activeTab === 2 && (
                        <div className="tab-content">
                          <h2>Forma de Pagamento</h2>
                          <form>
                            <Row>
                              <Col>
                            <ul>
                            <li
                              className="border rounded mr-2 d-flex p-2 bd-highlight align-items-center flex-column"
                              onChange={handlePaymentMethodChange}
                                >
                                  <label className='d-flex flex-column'>
                                    <input
                                      type='radio'
                                      name='points'
                                      value='pix'
                                      checked={paymentMethod === 'pix'}
                                      onChange={handlePaymentMethodChange}
                                    />
                                    <span className='text-primary h1 pt-1'>Pix</span>
                                  </label>
                                  {paymentMethod === 'pix' && 
                                  <div>
                                    <div className='Container row d-flex'>
                                    <div className='p-2 ml-2 border rounded d-flex align-items-center flex-column box-ativo'>
                                    <QrCode
                                      data="00020101021226480019BR.COM.STONE.QRCODE0108A37F8712020912345678927820 014BR.GOV.BCB.PIX2560sandbox-qrcode.stone.com.br/api/v2/qr/sGY7FyVExavqkzFvkQu MXA28580010BR.COM.ELO0104516002151234567890000000308933BB1100401P520400 00530398654041.005802BR5911STONE TESTE6009SAO PAULO62600522sGY7FyVExavqkzFvkQuMXA50300017BR.GOV.BCB.BRCODE01051.0.0 80500010BR.COM.ELO01100915132023020200030201040613202363043BA1"
                                      height="120"
                                      width="120"
                                      fgColor="#A1B2C3"
                                      bgColor="#123456"
                                    />              
                                    </div>
                                    <div className='p-1 d-flex'>
                                    <ul className='p-1'>
                                      <li>1. Acesse o app da sua instituição financeira</li>
                                      <li>2. Escolha pagamento via Pix</li>
                                      <li>3. Escaneie o qr code</li>
                                    </ul>
                                    </div>
                                    </div>
                                    <div className='p-2 Container row d-flex align-items-center'>
                                        <input type='text' className='border rounded d-flex align-items-center w-100' disabled value={inputValue}></input>
                                        <Button className="d-flex mt-2 align-items-center" onClick={handleCopyButtonClick}> Copiar Código Pix</Button>
                                    </div>
                                  </div>}
                                </li>
                                <li
                              className="p-1 border rounded mr-2 d-flex align-items-center flex-column mt-2"
                              onChange={handlePaymentMethodChange}
                                >
                                  <label className='d-flex flex-column'>
                                    <input
                                      type='radio'
                                      name='points'
                                      value='boleto'
                                      checked={paymentMethod === 'Boleto'}
                                      onChange={handlePaymentMethodChange}
                                    />
                                    <span className='text-primary h1 pt-1'>Boleto</span>
                                  </label>
                                  {paymentMethod === 'boleto' && 
                                  <div>
                                    <div>
                                      <Row>
                                        <Col>
                                          <ul>
                                            <li className='d-flex align-items-center flex-column'>
                                            <Card className='p-5 border rounded d-flex align-items-center flex-column box-ativo'>
                                              <FileText size={40} />     
                                              <label className='h2 text-primary mt-2'>PDF</label>                              
                                            </Card> 
                                            </li>
                                              <li className='p-2 d-flex align-items-center flex-column'>
                                              <Button color="primary" type="submit">Visualizar Boleto</Button>
                                              </li>
                                          </ul>
                                        </Col>
                                        <Col>
                                        <ul>
                                          
                                          <div className='row d-flex align-items-center flex-column'>
                                          <li className='col d-flex align-items-center flex-column'>
                                          <span>Após o pagamento, o Boleto é processado
                                          no período de 72h.
                                         
                                          </span>
                                          </li>
                                          <li className='col d-flex align-items-center flex-column'>
                                          <span>
                                          Para fazer o pagamento via internet
                                          Baking ou app, você pode copiar o Código 
                                          de barras do boleto.
                                          </span>
                                          </li>
                                          </div>
                                        </ul>
                                        </Col>
                                      </Row>
                                    </div>
                                  </div>
                                  }
                                </li>
                                <li
                              className="p-2 border rounded mr-2 d-flex align-items-center flex-column mt-2"
                              onChange={handlePaymentMethodChange}
                                >
                                  <label className='d-flex flex-column'>
                                    <input
                                      type='radio'
                                      name='points'
                                      value='cartao'
                                      checked={paymentMethod === 'cartao'}
                                      onChange={handlePaymentMethodChange}
                                    />
                                    <span className='text-primary h1 pt-1'>Cartão de crédito</span>
                                  </label>
                                  {paymentMethod === 'cartao' && 
                                  <div className='Container p-5'>
                                     <Form className="d-flex flex-column h-100">
                                     <FormGroup row className="p-1">
                                       <Label for="numeroCartao">Número do cartão</Label>
                                       <Col sm={20}>
                                         <Input type="numeroCartao" name="numeroCartao" id="numeroCartao" placeholder="numero Cartao" bsSize="lg" />
                                       </Col>
                                     </FormGroup>
                                     <FormGroup row className="p-1">
                                       <Label for="exampleEmail2">Vencimento</Label>
                                       <Col sm={15}>
                                         <Input type="vencimento" name="vencimento" id="vencimento" placeholder="mm/aa" bsSize="lg" />
                                       </Col>
                                     </FormGroup>
                                     <FormGroup row className="p-1">
                                       <Label for="cvv">Cvv</Label>
                                       <Col sm={5}>
                                         <Input className="d-flex align-items-start" type="cvv" name="cvv" id="cvv" placeholder="cvv" bsSize="md" />
                                       </Col>
                                     </FormGroup>
                                     <FormGroup row className="p-1">
                                       <Label for="titular">Titular</Label>
                                       <Col sm={15}>
                                         <Input type="titular" name="titular" id="titular" placeholder="titular" bsSize="lg" />
                                       </Col>
                                     </FormGroup>
                                   </Form>
                                  </div>
                                  }
                                </li>
                                 
                            </ul>
                             
                            <Button color="primary" type="submit" className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabChange(3)}>Avançar</Button>
                            </Col>
                            <Col md={6} >
                            <ul className="d-flex flex-column mr-6" md={10}>
                              <li className='p-5 border rounded mr-2 d-flex align-items-center flex-column'>
                                  <label className='d-flex'>
                                    Você escolheu o pacote de 
                                  </label>
                                    <span className='d-flex flex-column pt-1 h2'>{value} pontos</span> 
                                  <label>
                                    Valor R$ {value}
                                  </label>
                                  <label>
                                    Taxa R$ {taxaFixa}
                                  </label>
                                  <p>________________________</p>
                                  <label className='text-primary'>Total<h1 className='text-primary'>R$ {valorCalc}</h1></label>
                              </li>
                             </ul>
                            </Col>
                            </Row>
                          </form>
                          
                        </div>
                      )}

                        </div>
                        {activeTab === 3 && (
                          <div className="tab-content">
                            <h2>Resumo da Compra</h2>
                            <Row>
                            <Col>
                            <label className='h1 text-primary'>
                                O seu pedido foi enviado!
                            </label>
                            <ul>
                              <li className='mt-5'>
                              <span>
                                Os pontos serão creditados no prazo de 24h após a análise
                                e processamento do pagamento.
                              </span>
                              </li>
                              <li className='mt-5'>
                                <span>
                                  Para suporte e atendimento, envie um e-mail para:
                                  email@reconhece.vc
                                </span>
                              </li>
                            </ul>
                            </Col>
                            <Col sm={3}>
                            <ul>
                              <li className='p-5 border rounded mr-2 d-flex align-items-center flex-column'>
                                <span>Numero do pedido</span>
                                <label className='h3'>
                                  A65SFH8WEOVBR
                                </label>  
                                  <label className='d-flex'>
                                    Você escolheu o pacote de 
                                  </label>
                                    <span className='d-flex flex-column pt-1 h2'>{value} pontos</span> 
                                  <label>
                                    Valor R$ {value}
                                  </label>
                                  <label>
                                    Forma de pagamento {paymentMethod}
                                  </label>
                                  <p>________________________</p>
                                  <label className='text-primary'>Total<h1 className='text-primary'>R$ {valorCalc}</h1></label>
                              </li>
                             </ul>
                            </Col>
                            </Row>
                          </div>
                        )}
                       </CardBody>
                      
                    </CardBody>
                </Card>
            </Fragment>
        </UILoader>
    )
}

export default PartnersTable
