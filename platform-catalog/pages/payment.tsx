import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";
import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/AuthProvider";


type Billet = {
    Barcode: string,
    Email: string
}

type BilletDetailsAux = {
    participantId: string,
    participantName: string,
    participantDocument: string,
    BankCode: string,
    BankName: string,
    Barcode: string,
    DigitableLine: string,
    DueDate: string,
    Value: string,
    Type: string,
    campaignId: string,
    token: string,
    environment: string,
    campaign: string,
    Email: string
};

const MyCard = ({ }) => {


    const [toggleState, setToggleState] = useState(1);
    const { session, params } = useAuthContext();
    // const [bankCode, setBankCode] = useState();
    // const [BankName, setBankName] = useState();
    // const [DigitableLine, setDigitableLine] = useState();
    // const [DueDate, setDueDate] = useState();
    // const [value, setvalue] = useState();
    // const [type, setType] = useState();
    const [BilletRequest, setBilletRequest] = useState({});
    const [Barcode, setBarCode] = useState("");
    const [Email, setEmail] = useState("");
    const [billet, setBillet] = useState();

    console.log("tab", toggleState)


    async function validate() {
        try {
            await axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/BilletPayment/Validate", {
                Barcode: Barcode,
                BilletRequest: BilletRequest,
                token: params.get('token'),
                campaign: params.get('campaign'),
                environment: params.get('environment')
            }, {
                headers: {
                    Authorization: `bearer ${session?.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    let request = response?.data?.data as BilletDetailsAux;
                    setBilletRequest(request)
                })

        } catch (e) {
            console.log(e)
        }
    };


    const getBillets = () => {
        return axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/BilletPayment/GetBillets", {
            // Barcode: Barcode,
            // BilletRequest: BilletRequest,
            // token: params.get('token'),
            // campaign: params.get('campaign'),
            // environment: params.get('environment')
        }, {
            headers: {
                Authorization: `bearer ${session?.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                return response?.data?.data as Billet;
            }).catch(err => {
                console.log(err)
            })
    };

    async function confirmPayment() {
        try {
            await axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/BilletPayment/ConfirmPaymentBillet", {
                Barcode: Barcode,
                BilletRequest: BilletRequest,
                Email: Email,
                token: params.get('token'),
                campaign: params.get('campaign'),
                environment: params.get('environment')
            }, {
                headers: {
                    Authorization: `bearer ${session?.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    let request = response?.data?.data;
                    setBilletRequest(request)
                })

        } catch (e) {
            console.log(e)
        }
    };

    const toggleTab = (idx) => {
        setToggleState(idx);

        switch (idx) {
            case 3:
                validate()
                break;
            case 4:
                confirmPayment()
        }



        // axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/BilletPayment/GetBilletById", {
        //     barcode: Barcode,
        //     BilletDetailsRequest: BilletDetailsRequest,
        //     token: params.get('token'),
        //     campaign: params.get('campaign'),
        //     environment: params.get('environment')
        // }, {
        //     headers: {
        //         Authorization: `bearer ${session?.token}`,
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //         return response?.data?.data;
        //     })


    };




    return (
        <>
            <Layout parent="" sub="" subChild="" headerStyle="" noBreadcrumb="">
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
                                                <span>Meus Pagamentos</span>
                                            </li>
                                        </ul>
                                    </nav>

                                    <h2>Meus Pagamentos</h2>
                                </header>

                                <div className="position-relative w-100 overflow-hidden">
                                    <div className="w-100 d-flex justify-content-between">
                                        <div className="border p-25 border rounded col-md-12 col-lg-4 col-sm-6 position-relative col-cartao">
                                            <h3 className="colorSecundary fw-600">Filtre por Estado</h3>

                                            <hr className="w-100" />

                                            <form action="">
                                                <ul className="d-flex flex-wrap justify-content-between">
                                                    <li className="w-100">
                                                        <ol className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-1 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Pago</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-1 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Em Analise</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-1 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Concluido</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-5">
                                                                <label className="d-flex mb-0 gap-1 w-100">
                                                                    <input type="radio" className="col-md-2 col-sm-1" name="fav_language" value="HTML" />
                                                                    <p>Cancelado</p>
                                                                </label>
                                                            </li>

                                                            <li className="col-md-12 mt-5">
                                                                <button className="btn w-100">Aplicar Filtro</button>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ul>
                                            </form>

                                            <hr className="mt-30" />

                                            <a href="javascript:void(0)" className="btn w-100 mt-10" onClick={() => toggleTab(2)}>Pagar novo boleto</a>
                                        </div>

                                        <div className="col-md-6 col-sm-8 col-lg-7">
                                            <div className={toggleState === 1 ? "content active-content" : "content"}>
                                                <div className="content active-content border p-10 p-25 rounded content border p-10 p-25 rounded"
                                                >

                                                    <h5 className="fs-3 text-success mb-30">Você não possui Pagamentos</h5>

                                                    <p className="fs-6"> <span className="fw-300"></span></p>

                                                    <li className="col-md-12">

                                                    </li>
                                                </div>
                                                <div className="table-responsive-xxl border rounded" hidden>
                                                    <table className="table m-0 table-striped border-0">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th scope="col" className="bgPrimary fw-300 fs-7">Código de barras</th>
                                                                <th scope="col" className="bgPrimary fw-300 fs-7">Data do pagamento</th>
                                                                <th scope="col" className="bgPrimary fw-300 fs-7">Valor</th>
                                                                <th scope="col" className="bgPrimary fw-300 fs-7">Status</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="text-center">
                                                            <tr>
                                                                <td className="align-middle">23793381286008779130137<br /> 000063307892500000250000</td>
                                                                <td className="align-middle">27/03/2023</td>
                                                                <td className="align-middle">R$ 2.500,00</td>
                                                                <td className="align-middle">Em Análise</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className={toggleState === 2 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <p className="fw-600"> Dados e método de pagamento</p>

                                                <hr />

                                                <form action="" >
                                                    <ul>
                                                        <li>
                                                            <label htmlFor="" className="pb-10 fw-400">Código de Barras:</label>
                                                            <input type="text" value={Barcode} placeholder="Preencha o Numero do Boleto" className="form-control bg-light rounded border-secondary" onChange={(e) => setBarCode(e.target.value)} />
                                                        </li>
                                                        {/* <li>
                                                            <label htmlFor="" className="pb-10 fw-400">Email:</label>
                                                            <input type="text" value={Email} placeholder="Preencha o seu e-mail" className="form-control bg-light rounded border-secondary" onChange={(e) => setEmail(e.target.value)} />
                                                        </li> */}

                                                        <li className="col-md-12 mt-20">
                                                            <a href="javascript:void(0)" className="btn w-100 mt-10" onClick={() => toggleTab(3)}>Pagar novo boleto</a>
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div>

                                            <div className={toggleState === 3 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <p className="fw-600"> Dados e método de pagamento</p>

                                                <form action="" >


                                                    <li>
                                                        <hr />
                                                    </li>

                                                    <li>
                                                        <div className="w-100 bg-form bg-form p-30 rounded">
                                                            <ol>


                                                                <li className="py-3 border mb-10 bg-white rounded border-secondary">
                                                                    <label className="d-flex mb-0">
                                                                        <input type="radio" className="col-md-1 col-sm-1" name="fav_language" value="HTML" />

                                                                        <span>
                                                                            Saldo de Pontos - Você tem: <small>0 pontos</small>
                                                                        </span>
                                                                    </label>
                                                                </li>

                                                                <hr />

                                                                { }
                                                                <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> Nome: </strong> AMNC</span>
                                                                </li>

                                                                <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> Banco: </strong> Bradesco</span>
                                                                </li>

                                                                <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> Vencimento: </strong> 03/02/2023</span>
                                                                </li>

                                                                <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> Tipo: </strong> DM</span>
                                                                </li>

                                                                <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> Valor:</strong>R$ 2.500,00</span>
                                                                </li>

                                                                {/* <li className="pb-2">
                                                                    <span className="fs-6 fw-300"> <strong className="fw-600"> DigitableLine: </strong>{item}</span>
                                                                </li> */}

                                                                <hr />

                                                                <li>
                                                                    <div>
                                                                        {/* <h5 className="font-weight-bold d-flex justify-content-between">
                                                                            <span>Entrega: </span>
                                                                            <span>R$ xxxx</span>
                                                                        </h5> */}

                                                                        <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                                                                            <span> Total: </span>
                                                                            <span>R$ 2.500,00</span>
                                                                        </h4>
                                                                    </div>
                                                                </li>


                                                                {/* <hr /> */}

                                                                {/* <li>
                                                                    <h4 className="heading-4 mb-10 price-color d-flex justify-content-between">
                                                                        <span>Total em Pontos: </span>
                                                                        <span>R$ xxxx</span>
                                                                    </h4>
                                                                </li> */}

                                                                <hr />
                                                                <li className="col-md-12 mt-20">
                                                                    <a href="javascript:void(0)" className="btn w-100 mt-10" onClick={() => toggleTab(4)}>Confirmar Pagamento</a>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    </li>
                                                </form>
                                            </div>

                                            <div className={toggleState === 4 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"}
                                            >

                                                <h5 className="fs-3 text-success mb-30">Seu boleto foi agendado para pagamento!</h5>

                                                <p className="fs-6"> <span className="fw-300">{Barcode}</span></p>

                                                <p className="fs-6 pt-20 pb-20"> <span className="fw-300"> Autenticação: </span> <br /> 000AAA000AAA000AAA000AAA0000AA0A0A0A0A0</p>

                                                <p className="fs-6 pb-30 fw-400 fst-italic">Seu pagamento está em análise e será aprovado em até 3 dias úteis. <br />
                                                    Você receberá um e-mail assim que seu pagamento for confirmado com
                                                    uma cópia do comprovante.</p>

                                                <li className="col-md-12">
                                                    <a href="javascript:void(0)" className={toggleState === 1 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                        onClick={() => toggleTab(1)} >  Voltar para pagamentos</a>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default (MyCard);