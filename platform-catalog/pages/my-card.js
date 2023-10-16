import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { shippingContext } from "../hooks/ShippingProvider";
import AbaMeuPerfil from "./account";

const MyCard = ({ }) => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (idx) => {
        setToggleState(idx);
    };

    // type ShippingContext = {
    //     cep: string,
    //     setCep: string,
    //     cepAddress: string,
    //     numero: number,
    //     bairro: string,
    //     cidade: string,
    //     shipping: number,
    //     totalShipping: number,
    //     shippError: string,
    //     calcShipp: number,
    //     setTotalPrice: number
    // }

    const {
        address,
        cep,
        setCep,
        cepAddress,
        shipping,
        totalShipping,
        shippError,
        calcShipp,
        numero,
        bairro,
        cidade,
        setTotalPrice } = shippingContext()

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
                                                <span>Meu Cartão</span>
                                            </li>
                                        </ul>
                                    </nav>

                                    <h2>Meu Cartão</h2>
                                </header>

                                <div className="position-relative w-100 overflow-hidden">
                                    <div className="w-100 d-flex justify-content-between">
                                        <div className="border p-25 border rounded col-md-5 col-lg-5 col-sm-7 position-relative col-cartao">
                                            <h3 className="colorSecundary fw-600">Dados do Cartão</h3>
                                            <hr />

                                            <ul className="d-flex flex-column">
                                                <li className="card_cartao mb-20 position-relative p-20">
                                                    <figure>
                                                        <img src="/assets/imgs/shop/reconhece.svg" alt="" />
                                                    </figure>

                                                    <p className="pt-15 pb-15 fs-5 colorSecundary">**** **** **** 1234</p>

                                                    <div className="d-flex gap-4">
                                                        <div>
                                                            <small className="colorSecundary">Validade</small>
                                                            <p className="colorSecundary">01/12</p>
                                                        </div>

                                                        <div>
                                                            <small className="colorSecundary">Codigo de Segurança</small>
                                                            <p className="colorSecundary">01/12</p>
                                                        </div>
                                                    </div>

                                                    <p className="pt-30 colorSecundary">João P. Silva</p>

                                                    <figure className="position-absolute icon-bottom">
                                                        <img src="/assets/imgs/shop/icon_mastercard.svg" alt="" />
                                                    </figure>

                                                    <figure className="position-absolute icon-right">
                                                        <img src="/assets/imgs/shop/icon-aproxima.svg" alt="" />
                                                    </figure>
                                                </li>

                                                <ol className="w-100">
                                                    <li className="w-100">
                                                        <ol className="d-flex flex-wrap">
                                                            <li className="col-md-6 pr-10 mb-10">
                                                                <a href="javascript:void(0)" className={toggleState === 2 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(2)} >
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Solicitar Cartão <br />
                                                                        Reconhece
                                                                    </span>
                                                                </a>
                                                            </li>

                                                            <li className="col-md-6 pl-10 mb-10" >
                                                                <a href="javascript:void(0)" className={toggleState === 5 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(5)}>
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Ativar meu <br /> Cartão
                                                                    </span>
                                                                </a>
                                                            </li>

                                                            <li className="col-md-6 pr-10 mb-10">
                                                                <a href="javascript:void(0)" className={toggleState === 8 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(8)}>
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Recarregar <br /> Cartão
                                                                    </span>
                                                                </a>
                                                            </li>


                                                            <li className="col-md-6 pl-10 mb-10">
                                                                <a href="javascript:void(0)" className={toggleState === 6 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(6)}>
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Bloquear <br /> Cartão
                                                                    </span>
                                                                </a>
                                                            </li>

                                                            <li className="col-md-6 pr-10 mb-20">
                                                                <a href="javascript:void(0)" className={toggleState === 7 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(7)}>
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Solicitar 2a <br />
                                                                        Via do Cartão
                                                                    </span>
                                                                </a>
                                                            </li>

                                                            <li className="col-md-6 pl-10 mb-20" hidden>
                                                                <a href="" className="card_cartao p-20 d-table text-center w-100 fs-6">
                                                                    <figure className="mb-10 margin-auto">
                                                                        <img src="/assets/imgs/shop/icon_cifrao.svg" alt="" />
                                                                    </figure>

                                                                    <span>
                                                                        Desbloquear <br />
                                                                        novo cartão
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </ul>
                                        </div>

                                        <div className="col-md-5 col-sm-7 col-lg-6">
                                            <div className={toggleState === 2 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Solicitação de Cartão</h3>

                                                <hr />

                                                <p className="mb-40">Selecione o Endereço de Entrega do Cartão</p>

                                                <form>
                                                    <li className="pt-3 pl-20 pr-20 pb-3 col-md-12 border mt-10 mb-10 d-table">
                                                        <label className="mb-0 d-flex">
                                                            <input type="radio" className="" name="fav_language" value="HTML" />

                                                            <span className="pl-10 h6 mb-0">
                                                                <strong className="fw-bold"> Casa  - </strong>  <small className="fw-light">Endereço X e Y</small>
                                                            </span>
                                                        </label>
                                                    </li>

                                                    <li className="pt-3 pl-20 pr-20 pb-3 col-md-12 border mt-10 mb-10 d-table">
                                                        <label className="mb-0 d-flex">
                                                            <input type="radio" className="" name="fav_language" value="HTML" />

                                                            <span className="pl-10 h6 mb-0">
                                                                <strong className="fw-bold"> Trabalho  - </strong>  <small className="fw-light">Endereço X e Y</small>
                                                            </span>
                                                        </label>
                                                    </li>

                                                    <li className="mt-30">
                                                        <div className="row gap-3">
                                                            <li className="col-md-12">
                                                                <a href="javascript:void(0)" className={toggleState === 3 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                                    onClick={() => toggleTab(3)} >  Acionar Novo Endereço</a>
                                                            </li>

                                                            <li className="col-md-12">
                                                                <a href="javascript:void(0)" className={toggleState === 4 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                                    onClick={() => toggleTab(4)} >Solicitar Cartão </a>
                                                            </li>
                                                        </div>
                                                    </li>
                                                </form>
                                            </div>

                                            <div
                                                className={toggleState === 3 ? "content active-content border p-10 p-25 rounded " : "content border p-25 rounded"}
                                            >
                                                <h3 className="colorSecundary fw-600 ">Cadastrar novo Endereço</h3>

                                                <hr />

                                                <form>
                                                    <div className="col-12 mb-20">
                                                        <input type="text" value={address?.logradouro} className="form-control bg-light rounded border-secondary" placeholder="Avenida/Rua*" aria-label="Avenida/Rua" aria-describedby="button-addon2" />
                                                    </div>

                                                    <div className="row mb-20">
                                                        <div className="col-6">
                                                            <input type="text" className="form-control bg-light rounded border-secondary" placeholder="Complemento" aria-label="Complemento" aria-describedby="button-addon2" />
                                                        </div>

                                                        <div className="col-6">
                                                            <input type="text" className="form-control bg-light rounded border-secondary" placeholder="Número" aria-label="Número" aria-describedby="button-addon2" />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input type="text" value={address?.localidade} className="form-control bg-light rounded border-secondary" placeholder="Bairro" aria-label="Bairro" aria-describedby="button-addon2" />
                                                        </div>

                                                        <div className="col-6">
                                                            <input type="text" value={address?.cep} className="form-control bg-light rounded border-secondary" placeholder="CEP*" aria-label="CEP" aria-describedby="button-addon2" />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="w-100 mt-20 ">
                                                            <a href="javascript:void(0)" className={toggleState === 2 ? "btn mt-10 tabs tabs-active" : "btn mt-10 w-100"}
                                                                onClick={() => toggleTab(2)} > Cadastrar Endereço </a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div
                                                className={toggleState === 4 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"}
                                            >

                                                <h5 className="fs-3 text-success mb-30">Solicitação Concluida com Sucesso.</h5>

                                                <li className="col-md-12">
                                                    <a href="javascript:void(0)" className={toggleState === 1 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                        onClick={() => toggleTab(1)} >  Voltar</a>
                                                </li>
                                            </div>

                                            <div className={toggleState === 5 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Ativar meu Cartão</h3>
                                                <hr />

                                                <form>
                                                    <div className="row mb-10">
                                                        <div className="col-6">
                                                            <input type="text" className="form-control bg-light rounded border-secondary" placeholder="Numero do seu Cartão" aria-label="Complemento" aria-describedby="button-addon2" />
                                                        </div>

                                                        <div className="col-6">
                                                            <input type="text" value="" className="form-control bg-light rounded border-secondary" placeholder="Codigo de Segurança" aria-label="Número" aria-describedby="button-addon2" />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <a href="javascript:void(0)" className={toggleState === 4 ? "btn mt-10 tabs tabs-active" : "btn mt-10 w-100"}
                                                                onClick={() => toggleTab(4)} > Desbloquear Cartão </a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className={toggleState === 6 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Bloquear meu Cartão</h3>
                                                <hr />

                                                <p className="mb-20">Você tem certeza que deseja bloquear seu cartão?</p>

                                                <form>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <a href="javascript:void(0)" className={toggleState === 4 ? "btn mt-10 tabs tabs-active" : "btn mt-10 w-100"}
                                                                onClick={() => toggleTab(4)} > Sim, tenho certeza! </a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className={toggleState === 7 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Solicitação 2 via do Cartão</h3>

                                                <hr />

                                                <p className="mb-40">Selecione o Endereço de Entrega do Cartão</p>

                                                <form>
                                                    <li className="pt-3 pl-20 pr-20 pb-3 col-md-12 border mt-10 mb-10 d-table">
                                                        <label className="mb-0 d-flex">
                                                            <input type="radio" className="" name="fav_language" value="HTML" />

                                                            <span className="pl-10 h6 mb-0">
                                                                <strong className="fw-bold"> Casa  - </strong>  <small className="fw-light">Endereço X e Y</small>
                                                            </span>
                                                        </label>
                                                    </li>

                                                    <li className="pt-3 pl-20 pr-20 pb-3 col-md-12 border mt-10 mb-10 d-table">
                                                        <label className="mb-0 d-flex">
                                                            <input type="radio" className="" name="fav_language" value="HTML" />

                                                            <span className="pl-10 h6 mb-0">
                                                                <strong className="fw-bold"> Trabalho  - </strong>  <small className="fw-light">Endereço X e Y</small>
                                                            </span>
                                                        </label>
                                                    </li>

                                                    <li className="mt-30">
                                                        <div className="row gap-3">
                                                            <li className="col-md-12">
                                                                <a href="javascript:void(0)" className={toggleState === 3 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                                    onClick={() => toggleTab(3)} >  Acionar Novo Endereço</a>
                                                            </li>

                                                            <li className="col-md-12">
                                                                <a href="javascript:void(0)" className={toggleState === 4 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                                    onClick={() => toggleTab(4)} >Solicitar Cartão </a>
                                                            </li>
                                                        </div>
                                                    </li>
                                                </form>
                                            </div>

                                            <div className={toggleState === 8 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Recarregar Cartão</h3>
                                                <hr />

                                                <p className="mb-40">Selecione o Valor de Recarga </p>

                                                <form action="">
                                                    <ul>
                                                        <li>
                                                            <ol className="w-100">
                                                                <li className="w-100">
                                                                    <ol className="d-flex flex-wrap">
                                                                        <li className="col-md-3 mb-10 pr-10">
                                                                            <a href="javascript:void(0)" className={toggleState === 9 ? "card_cartao p-50 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(9)} >
                                                                                <span className="d-flex gap-1 fw-bold justify-content-center">
                                                                                    <small className="fs-5">R$</small>
                                                                                    <small className="fs-2">20</small>
                                                                                </span>
                                                                            </a>
                                                                        </li>

                                                                        <li className="col-md-3 mb-10 pr-10" >
                                                                            <a href="javascript:void(0)" className={toggleState === 5 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(5)}>
                                                                                <span className="d-flex gap-1 fw-bold justify-content-center">
                                                                                    <small className="fs-5">R$</small>
                                                                                    <small className="fs-2">20</small>
                                                                                </span>
                                                                            </a>
                                                                        </li>

                                                                        <li className="col-md-3 mb-10 pr-10">
                                                                            <a href="javascript:void(0)" className={toggleState === 8 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(8)}>
                                                                                <span className="d-flex gap-1 fw-bold justify-content-center">
                                                                                    <small className="fs-5">R$</small>
                                                                                    <small className="fs-2">20</small>
                                                                                </span>
                                                                            </a>
                                                                        </li>

                                                                        <li className="col-md-3 mb-10">
                                                                            <a href="javascript:void(0)" className={toggleState === 6 ? "card_cartao p-20 d-table text-center w-100 fs-6 tabs tabs-active" : "card_cartao p-20 d-table text-center w-100 fs-6"} onClick={() => toggleTab(6)}>
                                                                                <span className="d-flex gap-1 fw-bold justify-content-center">
                                                                                    <small className="fs-5">R$</small>
                                                                                    <small className="fs-2">20</small>
                                                                                </span>
                                                                            </a>
                                                                        </li>

                                                                        <li> <p className="mt-20">Selecione o Valor de Recarga </p></li>
                                                                    </ol>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div>

                                            <div className={toggleState === 9 ? "content active-content border p-10 p-25 rounded" : "content border p-10 p-25 rounded"} >
                                                <h3 className="colorSecundary fw-600 ">Recarregar Cartão</h3>
                                                <hr />

                                                <p className="text-center fs-4 lh-1 fw-light">Você está fazendo uma recarga em <br /> seu <strong>cartão pré-pago</strong> no Valor de</p>

                                                <p className="text-center pt-20 pb-20 fs-3 colorSecundary fw-600">R$ 20,00</p>

                                                <hr />

                                                <div className="col-md-12 d-flex justify-content-between mt-30">
                                                    <li className="col-md-6 pr-5">
                                                        <a href="javascript:void(0)" className={toggleState === 4 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                            onClick={() => toggleTab(4)} >Confirmar </a>
                                                    </li>

                                                    <li className="col-md-6 pl-5">
                                                        <a href="javascript:void(0)" className={toggleState === 8 ? "text-center w-100 button button-add-to-cart btn-sm btn-success tabs tabs-active" : "text-center w-100 button button-add-to-cart btn-sm btn-success w-100"}
                                                            onClick={() => toggleTab(8)} >  Voltar</a>
                                                    </li>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </Layout >
        </>
    );
};

export default (MyCard);