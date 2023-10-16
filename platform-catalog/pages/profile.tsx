import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";
import { useMutation, useQuery } from 'react-query'
import { AuthProvider, useAuthContext } from "../hooks/AuthProvider";
import axios from "axios";
import { type, userInfo } from "os";
import { userContext } from "../hooks/UserProvider";
import { useHomeDataContext } from "../hooks/HomeDataProvider";
import EditAddress from "./EditAddress";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../components/ecommerce/Loader";

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

type variavel = {
    nickname: string,

}

type Telefone = {
    phone: string,
}

type variavel2 = {
    email: string,
}

type User = {
    id: string;
    nickname: string;
    phone: string;
    email: string;
}
interface AddressListProps {
    enderecos: Address[];
    user: User,
    variavel: variavel,

}

interface UserInfoSession {
    username: string;
    email: string;
    internCampaign: boolean;
}


const Cart: React.FC<AddressListProps> = ({ enderecos, user, variavel }) => {
    const { session, params } = useAuthContext();
    const { userInfo } = useHomeDataContext();
    const [toggleState, setToggleState] = useState(1);
    // const [data, setData] = useState(null);
    const [deletedAddressId, setDeletedAddressId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulando um carregamento demorado
        setTimeout(() => {
          setLoading(false); // Assumindo que o conteúdo foi carregado
        }, 2000); // Simula um carregamento de 2 segundos
      }, []);

    const router = useRouter();

    console.log("testando", variavel)
    // const [showDiv, setShowDiv] = useState(true);
    useEffect(() => {
        setName(user?.nickname),
            setEmail(user?.email),
            setPhone(user?.phone)
    }, [user])



    const [nickname, setName] = useState(user?.nickname);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);


    const handleDelete = (id: string, userId: string) => {
        const params = { userId, id };

        axios.post("http://20.226.77.29/platform-catalog-desktop-client/api/Address/Delete",
            params,
            {
                headers: {
                    Authorization: `Bearer ${session}`,
                    'Content-Type': 'application/json',
                },

            }
        )
            .then(response => {
                setDeletedAddressId(id);
                toast.success('Exclusão de endereço feita com sucesso', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                toast.error(error?.data?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

    };


    const handleSubmit = async () => {
        const api = "http://20.226.77.29/platform-catalog-desktop-client/api/User/Update";
        const params = {
            nickname,
            email,
            phone
        }
        axios.post(api, params, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
            .then(response => {
                console.log(response.data);
                const updatedUser = response.data;
                setName(updatedUser.nickname);
                setEmail(updatedUser.email);
                setPhone(updatedUser.phone);
                toast.success('alteração feita com sucesso', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Faça qualquer ação adicional que você deseje aqui, como redirecionar o usuário para outra página ou atualizar o estado local.
            })
            .catch(error => {
                console.error('Ocorreu um erro ao atualizar os dados do usuário:', error);
                // Lidar com o erro de alguma forma, como exibir uma mensagem de erro ao usuário.
            });

    }


    const toggleTab = (idx) => {
        setToggleState(idx);
    };

    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="" headerStyle="" noBreadcrumb="">
                {!loading ? (
                <section className="mt-50 mb-50">
                    <div className="container">

                        <div className="row justify-content-between">
                            <AbaMeuPerfil />
                            {userInfo?.internCampaign ? (
                                <div className="col-md-9 col-xl-9">
                                    <header className="header-top mb-30">
                                        <nav className="mb-20">
                                            <ul className="nav-step">
                                                <li>
                                                    <a href="javascript:void(0)" title="Carrinho">Meu Perfil</a>
                                                </li>

                                                <li>
                                                    <span>Meus Dados</span>
                                                </li>
                                            </ul>
                                        </nav>

                                        <h2>Meus Dados</h2>
                                    </header>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="mb-30">Dados Pessoais</h4>

                                            <form onSubmit={handleSubmit}>
                                                <ul>
                                                    <li>
                                                        <input type="text" value={nickname} className="form-control bg-light mr-15 mb-15 rounded border-secondary" onChange={(e) => setName(e.target.value)} />
                                                    </li>

                                                    <li className="w-100">
                                                        <ol className="row">

                                                            <li className="col-md-6">
                                                                <input type="text" value={phone} className="form-control bg-light mr-15 mb-15 rounded border-secondary" onChange={(e) => setPhone(e.target.value)} />
                                                            </li>

                                                            <li className="col-md-6">
                                                                <input type="text" value={email} className="form-control bg-light mr-15 mb-15 rounded border-secondary" onChange={(e) => setEmail(e.target.value)} />
                                                            </li>

                                                        </ol>
                                                    </li>

                                                    <li className="w-100 mt-15">
                                                        <button className="tabs btn w-100" type="submit">Atualizar Cadastro</button>
                                                    </li>

                                                </ul>
                                            </form>

                                        </div>

                                        <div className="col-md-6 ">
                                            <h4 className="mb-30">Endereço de Entrega</h4>

                                            <ul className="d-flex justify-content-between">
                                                {
                                                    enderecos?.map(address => (
                                                        <li className="col-md-6 h-100 mr-10 backgroundCards p-20 rounded border-secondary" key={address.id}>

                                                            <li className="mb-2">
                                                                {address?.street}, {address?.neighborhood} - {address?.number}
                                                            </li>

                                                            <Link href={`/EditAddress?=${address?.id}`}>
                                                                <a>Atualizar Endereço</a>
                                                            </Link>
                                                            <span className="mt-2 d-table "
                                                            >
                                                                <i className="fi-rs-trash mr-10 text-secondary"></i>
                                                                <button className="text-secondary" onClick={() => handleDelete(address.id, address.userId)}
                                                                    disabled={deletedAddressId === address.id}

                                                                >Excluir</button>
                                                            </span>

                                                        </li>
                                                    ))}
                                                <li className="col-md-6 pl-10 ">
                                                    <a href="AddressInputs" className="text-center h-100 backgroundCards w-100 d-flex justify-content flex-column align-items-center p-40 rounded border-secondary">
                                                        <span className="fs-1 fw-bold colorCinz d-block mb-20">+</span>

                                                        <span className="fw-bold">
                                                            <Link href="AddressInputs">Adicionar Endereço</Link>
                                                        </span>


                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>

                                </div>
                            ) : null}
                        </div>

                    </div>

                </section>
                ) : (
                    <Loader />
                )}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    // cartItems: state.cart,
    // activeCart: state.counter,
});

const mapDispatchToProps = {
    //closeCart,
    //increaseQuantity,
    //decreaseQuantity,
    //deleteFromCart,
    //openCart,
    //clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);