import { createContext, useContext, useState } from "react";


const UserContext = createContext({})

const user = {
    name: 'Vitor',
    lastname: 'Oliveira',
    email: 'test@test.com',
    cpf: '44455533313',
    phone: '11999999999',
    addressList: [
        {
            country: 'Brasil',
            uf: 'SP',
            city: 'São Paulo',
            street: 'Rua test',
            district: 'bairro',
            number: '99',
            complement: 'bloco 2, apt 100',
            postcode: '09999999'
        },
        {
            country: 'Brasil',
            uf: 'SP',
            city: 'São Bernardo',
            street: 'Rua test',
            district: 'bairro',
            number: '123',
            complement: 'bloco 1, apt 99',
            postcode: '09000000'
        }
    ]
}

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState(user)
    const [currentAddress, setCurrentAddress] = useState(null)

    const login = () => { }

    const logout = () => { }

    return (
        <UserContext.Provider value={{ userInfo, currentAddress, setCurrentAddress }}>
            {children}
        </UserContext.Provider>
    )
}

export const userContext = () => useContext(UserContext)