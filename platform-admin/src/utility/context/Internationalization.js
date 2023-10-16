// ** React Imports
import { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '@assets/data/locales/en-US.json'
import messagesPt from '@assets/data/locales/pt-BR.json'

// ** User Language Data
import userMessagesEn from '@src/assets/data/locales/en-US.json'
import userMessagesPt from '@src/assets/data/locales/pt-BR.json'

// ** Menu msg obj
const menuMessages = {
  'en-US': { ...messagesEn, ...userMessagesEn },
  'pt-BR': { ...messagesPt, ...userMessagesPt }
}

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState('pt-BR')
  const [messages, setMessages] = useState(menuMessages['pt-BR'])

  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='pt-BR'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
