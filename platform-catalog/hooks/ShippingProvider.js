import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";
import axios from "axios";
import { useQuery } from "react-query";

// interface ShippingContext{
//     cep: string;
//     totalShipping: number;
//     totalPrice: number;
//     shipping: string;
//     cepAddress: string;
// }



const ShippingContext = createContext({})


export function ShippingProvider({ children }) {
    const [cep, setCep] = useState("")
    const [cepAddress, setCepAddress] = useState(null)
    const { session, params } = useAuthContext();
    const [shipping, setShipping] = useState(null)
    const [address, setAddress] = useState(null);
    const [LoadingCep, setLoadingCep] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalShipping, setTotalShipping] = useState(0)

    const [shippError, setShippError] = useState(false)

    const reset = () => {
        setShipping(null)
        setTotalShipping(0)
        setCepAddress(``)
       
    }



    const calcShipp = (cartItems) => {
        // if (!cartItems.length > 0) return reset()
        setLoadingCep(true);

        setTimeout(() => {
            setLoadingCep(false);
          }, 1000);

          

        if (!cep) return setShippError(true)


        setShippError(false)

        // setTimeout(() => {
        //     setLoadingCep(false);
        //   }, 1000);


        const buscarEndereço = async () => {
            try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            setAddress(data);
          } catch (error) {
            console.error('Erro ao buscar JSON:', error);
          }
        }

        buscarEndereço();

        
    //    setCepAddress(buscarEndereço())
        // setCepAddress(`Rua Gen Castelo Branco - 317, Cidade dos Funcionários, Fortaleza/CE, ${cep}`)

         // const { data: cepData } = useQuery(['cep', session], async () => {
        //     return await axios.get("http://20.226.77.29/platform-catalog-desktop-client/api/Order/GetShippingValue", {
        //         headers: {
        //             Authorization: `bearer ${session}`,
        //             'Content-Type': 'application/json',
        //         }
        //     })
        //         .then(response => {
        //             setCepAddress(`${cepData}`)
        //             return response?.data?.data;
                    
        //         })
        // });
        

        const shipp = cartItems?.map(item => {
            return { store: item.storeName, priceShipping: 10 }
        })

        const uniqueStores = shipp.filter((v, i, a) => a.findIndex(v2 => (v2.store === v.store)) === i)

        setShipping(uniqueStores)

        const total = uniqueStores.reduce((acc, curr) => acc + curr.priceShipping, 0)

        setTotalShipping(total)


        console.log("endereço", address);
    }

    return (
        <ShippingContext.Provider value={{
            cep,
            setCep,
            cepAddress,
            address,
            shipping,
            totalShipping,
            shippError,
            calcShipp,
            totalPrice,
            setTotalPrice,
            LoadingCep
        }}
        >
            {children}
        </ShippingContext.Provider>
    )
}

export const shippingContext = () => useContext(ShippingContext)