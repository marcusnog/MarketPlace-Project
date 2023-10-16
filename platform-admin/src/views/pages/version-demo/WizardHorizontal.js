import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'
import axios from 'axios'
import { Toast, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const WizardHorizontal = () => {
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)
  const history = useHistory()

  const [userData, setUserData] = useState({
    // Dados da etapa 1
    nickname: '',
    email: '',
    // Dados da etapa 2
    phone: '',
    password: '',
    // Dados da etapa 3
    cnpj: '',
    cliente: '',
    newclientuser: true
  })

  const handleInputChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    const respostaServidor = { success: true, message: "Requisição bem-sucedida!" }
    // Enviar a requisição POST com o Axios
    axios
      .post('http://20.226.77.29/userapi/api/UserAdministrator', userData)
      .then((response) => {
        console.log('Resposta da API:', response.data)
        history.push('/login')
        // history.replace('/login', { userData })
        toast.success(respostaServidor.message)
        // Realizar alguma ação após o sucesso da requisição
      })
      .catch((error) => {
        console.error('Erro na requisição:', error)
        // Tratar erros, se necessário
      })
  }

  console.log(userData)

  const steps = [
    {
      id: 'account-details',
      title: 'Criação da Conta',
      subtitle: 'Por favor, preencha corretamente',
      content: <AccountDetails userData={userData} handleInputChange={handleInputChange} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'personal-info',
      title: 'Dados da Empresa',
      subtitle: 'Precisamos agora dos dados da empresa.',
      content: <PersonalInfo userData={userData} handleInputChange={handleInputChange} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'step-address',
      title: 'Termos de Uso',
      subtitle: 'Você precisa aceitar os termos',
      content: <Address userData={userData} handleInputChange={handleInputChange} stepper={stepper} type='wizard-horizontal' />
    },
    {
      id: 'social-links',
      title: 'Ultima Etapa',
      subtitle: 'Crie sua Senha',
      content: <SocialLinks userData={userData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} stepper={stepper} type='wizard-horizontal' />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
