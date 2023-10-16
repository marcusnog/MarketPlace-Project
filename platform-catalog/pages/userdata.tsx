import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/AuthProvider";
import Cart from './profile';
import { useRouter } from "next/router";

type User = {
    id: string;
    nickname: string;
    phone: number;
    email: string;
}

type Address = {
    id: string,
    userId: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipcode: string,
}


export default function userdata() {
    const { session } = useAuthContext();
    const [user, setUser] = useState(null);
    const router = useRouter();


    const { data: address } = useQuery(['address', session], async () => {
        return await axios.get("http://20.226.77.29/platform-catalog-desktop-client/api/Address/GetAddress", {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response?.data?.data as Address[];
            })
    });

    // const { data: user, isError } = useQuery(['user', session], async () => {
    //     return await axios.get("http://20.226.77.29/platform-catalog-desktop-client/api/User/GetUser", {
    //         headers: {
    //             Authorization: `bearer ${session}`,
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(response => {
    //             return response?.data?.data as User[];
    //         })
    // });
    async function carregarDados() {
        try {
            const response = await axios.get('http://20.226.77.29/platform-catalog-desktop-client/api/User/GetUser',
                {
                    headers: {
                        Authorization: `bearer ${session}`,
                        'Content-Type': 'application/json',
                    }
                })


            setUser(response?.data?.data as User);

            const { nickname, email, phone } = response?.data?.data as User;

            // console.log("dados desconstruídos", nickname, email, phone);
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
        }
    }

    useEffect(() => {
        // Função para carregar os dados da API
        carregarDados();
    }, []);


    // const { nickname, email, phone } = this.state;
    let nickname = user?.nickname;
    let email = user?.email;
    let phone = user?.phone;

    console.log("teste save", nickname, email, phone);


    return (

        <Cart user={user} enderecos={address} variavel={nickname} />


    );
}
