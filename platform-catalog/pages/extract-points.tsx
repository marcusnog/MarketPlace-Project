import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";
import axios, { AxiosResponse } from "axios";
import { Address } from "cluster";
import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/AuthProvider";
import Loader from "../components/ecommerce/Loader";


interface AccountMoviment {
    createdAt: string;
    id: string;
    description: string;
    value: number;
    type: string;
}

interface ExtratoPontos {
    data: {
        accountMoviment: AccountMoviment[];
    };
}


const MyCard = ({ }) => {
    

    const { session } = useAuthContext();
    const [accountMoviment, setAccountMoviments] = useState<AccountMoviment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulando um carregamento demorado
        setTimeout(() => {
          setLoading(false); // Assumindo que o conteúdo foi carregado
        }, 2000); // Simula um carregamento de 2 segundos
      }, []);
   
    useEffect(() => {
        axios.get<ExtratoPontos>('http://20.226.77.29/platform-catalog-desktop-client/api/Points/GetMoviments', {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
            .then((response: AxiosResponse<ExtratoPontos>) => {
                const extratoPontos: ExtratoPontos = response.data;
                setAccountMoviments(extratoPontos.data.accountMoviment);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    

    return (
        <>
            <Layout parent="" sub="" subChild="" headerStyle="" noBreadcrumb="">
                {!loading ? (
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row justify-content-between">
                            <AbaMeuPerfil />

                            <div className="col-md-9 col-xl-9">
                                <header className="header-top mb-30">
                                    <nav className="mb-20">
                                        <ul className="nav-step">
                                            <li>
                                                <a href="javascript:void(0)" title="Carrinho">Meu Perfil</a>
                                            </li>

                                            <li>
                                                <span>Extrato de Pontos</span>
                                            </li>
                                        </ul>
                                    </nav>

                                    <h2>Extrato de Pontos</h2>
                                </header>

                                <div className="position-relative w-100 overflow-hidden">
                                    <div className="w-100 d-flex justify-content-between">
                                        <div className="border p-25 border rounded col-md-4 col-lg-4 col-sm-6 position-relative col-cartao" hidden>
                                            <h3 className="colorSecundary fw-600">Filtros de Pesquisa</h3>
                                            <hr className="w-100" />

                                            <p>Pesquisa por período</p>

                                            <form action="">
                                                <ul className="pt-15 d-flex flex-wrap justify-content-between">
                                                    <li className="col-md-6 pr-5">
                                                        <span>De:</span>
                                                        <input type="date" className="form-control" />
                                                    </li>

                                                    <li className="col-md-6 pl-5" >
                                                        <span>Até:</span>
                                                        <input type="date" className="form-control" />
                                                    </li>

                                                    <li className="col-md-12 mt-10">
                                                        <button className="btn w-100">Aplicar Filtro</button>
                                                    </li>

                                                    <hr className="w-100 d-table mt-30 mb-20" />

                                                    <li>
                                                        <p>Filtrar por entrada ou saida:</p>
                                                    </li>

                                                    <li className="w-100 pt-20">
                                                        <ol className="d-flex flex-wrap">
                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-2 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Entrada</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-2 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Saida</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-12 mt-15 ">
                                                                <button className="btn w-100">Aplicar Filtro</button>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>

                                        <div className="col-md-6 col-sm-8 col-lg-7" >
                                            <p className="mb-20 fw-600">Extrato e Saldo</p>

                                            <div className="table-responsive-xxl border rounded">
                                                {accountMoviment?.map((moviment) => (
                                                    <table className="table m-0 table-striped border-0">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th scope="col" className="bgPrimary fw-900 fs-7 pd-2" key={moviment.id}>Data</th>
                                                                <th scope="col" className="bgPrimary fw-900 fs-7 pd-2">Descrição</th>
                                                                <th scope="col" className="bgPrimary fw-900 fs-7 pd-2">Pontos</th>
                                                                <th scope="col" className="bgPrimary fw-900 fs-7">Tipo</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="text-center">
                                                            <td className="p-2">{moviment.createdAt}</td>
                                                            <td className="p-2">{moviment.description}</td>
                                                            <td className="p-2">{moviment.value}</td>
                                                            <td className="p-2">{moviment.type}</td>
                                                        </tbody>
                                                    </table>
                                                ))}
                                                <div className="d-flex justify-content-end">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default (MyCard);