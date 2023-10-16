import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import { useHomeDataContext } from "../hooks/HomeDataProvider";

import Link from "next/link";
import {
  clearCart,
  closeCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  openCart,
} from "../redux/action/cart";
//import ProductTab from "../components/elements/ProductTab";
import RelatedSlider from "../components/sliders/Related";
import { shippingContext } from "../hooks/ShippingProvider";
import axios from "axios";
import { useAuthContext } from "../hooks/AuthProvider";
import { toast } from "react-toastify";

// type ShippingContext = {
//     cep: string,
//     setCep: string,
//     cepAddress: string,
//     shipping: number,
//     totalShipping: number,
//     shippError: string,
//     calcShipp: number,
//     setTotalPrice: number
// }

// type Request = {
//     PaymentMethodId: number,
//     Shops: [],
//     Recipent: [],

// }

const Cart = ({
  openCart,
  cartItems,
  activeCart,
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
  quickView,
}) => {
  const price = () => {
    let price = 0;
    cartItems.forEach(
      (item) => (price += item.skus[0].salePrice * item.quantity)
    );

    return price;
  };

  const {
    cep,
    address,
    setCep,
    cepAddress,
    shipping,
    totalShipping,
    shippError,
    calcShipp,
    setTotalPrice,
    buscarEndereco,
  } = shippingContext();

  const { userInfo } = useHomeDataContext();
  const { session, params } = useAuthContext();

  const [points, setPoints] = useState("");
  const [valorPontos, setValorPontos] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [codigoSegurancaCartao, setCodigoSegurancaCartao] = useState("");
  const [nomeBandeira, setNomeBandeira] = useState("");
  const [cpf, setCpf] = useState("");
  const [mesValidade, setmesValidade] = useState("");
  const [anoValidade, setAnoValidade] = useState("");
  const [street, setStreet] = useState(address?.logradouro);
  const [city, setCity] = useState(address?.localidade);
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState(address?.cep);
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [number, setnumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const [reference, setReference] = useState("");
  const [telephone2, setTelephone2] = useState("");
  const [telephone3, setTelephone3] = useState("");
  // const [orderdeliveryAddressId, setorderdeliveryAddressId] = useState();
  const [publicPlace, setPublicPlace] = useState("");
  const [statusPedido, setStatus] = useState();

  useEffect(() => {
    if (shipping) {
      calcShipp(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(price() + totalShipping);
  }, [cartItems]);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (idx) => {
    setToggleState(idx);
    switch (idx) {
      case 4:
        handleOrder();
    }
  };


  console.log("Carrinho:", cartItems);

  const selecionarPontos = () => {
    setPaymentMethodId(1);
    if (userInfo?.pointsBalance < price() + totalShipping) {
      toast.error("Saldo de pontos insulficiente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const shops = {
    store: cartItems.map((item) => (item?.storeId)),
    orderStoreId: cartItems.map((item) => (item?.storeItemCode)),
    orderCode: "",
    products: cartItems.map((item) => (item?.id, item?.salePrice)),
    orderProductId: cartItems.map((item) => (item?.id)),
    codeSku: cartItems.map((item) => (item?.skus[0].id)),
    quantity: cartItems.map((item) => (item?.quantity)),
    valueUnitary: cartItems.map((item) => (item?.skus[0]?.salePrice)),


  };

  console.log("dados do produto", shops);

 
  // const teste = {
  //   controlPointInternal: true,
  //   type: 1,
  //   codigoCampanhaFornecedor: "000000000000000000000001",
  //   CNPJ: `${cpf}`,
  //   loginCliente: "marcus@reconhece.vc",
  //   senhaCliente: "TaLJkl0jvUGGaoxuqYfwQw==",
  //   chaveCampanha: "000000000000000000000001",
  //   paymentMethodId: "1",
  //   shops: [
  //     {
  //       store: `${shops.store}`,
  //       orderStoreId: `${shops.orderStoreId}`,
  //       orderCode: "1",
  //       storeId: "1",
  //       products: [
  //         {
  //           orderProductId: `${shops.orderProductId}`,
  //           codeSku: `${shops.codeSku}`,
  //           codeProduct: `${shops.orderProductId}`,
  //           statusDelivery: "1",
  //           quantity: `${shops.quantity}`,
  //           valueUnitary: `${shops.valueUnitary}`,
  //         },
  //       ],
  //     },
  //   ],
  //   recipient: {
  //     orderRecipientId: "",
  //     cpfcnpj: `${cpf}`,
  //     email: `${userInfo.email}`,
  //     Name: `${userInfo.name}`,
  //     stateRegistration: "1",
  //     active: true,
  //   },
  //   deliveryAddress: {
  //     telephone: `${userInfo.phone}`,
  //     telephone2: "",
  //     telephone3: "",
  //       street: `${street}`,
  //       city: `${city}`,
  //       zipcode: `${zipcode}`,
  //       district: `${district}`,
  //       complement: "string",
  //       number: `${number}`,
  //       orderdeliveryAddressId: "1",
  //       publicPlace: "string",
  //       reference: "string",
  //       state: `${state}`,
      
  //   },
  //   paymentData: {
  //     valorPontos: 0,
  //     valorComplemento: 0,
  //     nomeBandeira: `${nomeBandeira}`,
  //     quantidadeParcelas: 1,
  //     nsu: "2",
  //     numeroCartao: `${numeroCartao}`,
  //     codigoSegurancaCartao: `${codigoSegurancaCartao}`,
  //     anoValidade: `${anoValidade}`,
  //     mesValidade: `${mesValidade}`,
  //     nomeTitular: `${nomeTitular}`,
  //   },
  //   billet: {
  //     campaignId: "31",
  //     email: "string",
  //     participantId: "string",
  //     billetId: "string",
  //     participantName: "string",
  //     billetDetails: {
  //       bankName: "string",
  //       barcode: "string",
  //       digitableLine: "string",
  //       type: "string",
  //     },
  //     billetPaymentInfos: {},
  //     token: "string",
  //     environment: "string",
  //     campaign: "31",
  //     codeRequestReconhece: "string",
  //   },
  //   recharge: {
  //     participantId: "string",
  //     participantName: "string",
  //     participantDocument: "string",
  //     campaignId: "string",
  //     celcoinTransactionId: 0,
  //     cellphoneOperator: "string",
  //     rechargeValue: 0,
  //     rechargeFeeValue: 0,
  //     rechargePointsValue: 0,
  //     stateCode: 0,
  //     phoneNumber: "string",
  //     providerId: 0,
  //     token: "string",
  //     environment: "string",
  //     campaign: "string",
  //     codeRequestReconhece: "string",
  //   },
  // };

  const teste = {
    controlPointInternal: true,
    type: 1,
    codigoCampanhaFornecedor: "000000000000000000000001",
    CNPJ: "36442669807",
    loginCliente: "marcus@reconhece.vc",
    senhaCliente: "TaLJkl0jvUGGaoxuqYfwQw==",
    chaveCampanha: "000000000000000000000001",
    paymentMethodId: "1",
    shops: [
      {
        store: 6,
        orderStoreId: "1",
        orderCode: "1",
        storeId: "1",
        products: [
          {
            orderProductId: "64657cea2b3616f49e19323c",
            codeSku: "229",
            codeProduct: "229",
            statusDelivery: "1",
            quantity: 1,
            valueUnitary: 200,
          },
        ],
      },
    ],
    recipient: {
      orderRecipientId: "",
      cpfcnpj: "36442669807",
      email: "marcus@reconhece.vc",
      Name: "JOSE MIRANDA",
      stateRegistration: "1",
      active: true,
    },
    deliveryAddress: {
      orderDeliveryAddressId: "1",
      district: "sp",
      city: "sao paulo",
      zipCode: "09030030",
      complement: "ap 111",
      state: "SP",
      publicPlace: "a",
      number: "11",
      reference: "ap",
      telephone: "992490963",
      telephone2: "992490963",
      telephone3: "992490963",
    },
    paymentData: {
      valorPontos: 0,
      valorComplemento: 0,
      nomeBandeira: "VISA",
      quantidadeParcelas: 1,
      nsu: "2",
      numeroCartao: "0123456789012345",
      codigoSegurancaCartao: "843",
      anoValidade: "27",
      mesValidade: "08",
      nomeTitular: "Felipe Crivelaro",
    },
    billet: {
      campaignId: "31",
      email: "string",
      participantId: "string",
      billetId: "string",
      participantName: "string",
      billetDetails: {
        bankName: "string",
        barcode: "string",
        digitableLine: "string",
        type: "string",
      },
      billetPaymentInfos: {},
      token: "string",
      environment: "string",
      campaign: "31",
      codeRequestReconhece: "string",
    },
    recharge: {
      participantId: "string",
      participantName: "string",
      participantDocument: "string",
      campaignId: "string",
      celcoinTransactionId: 0,
      cellphoneOperator: "string",
      rechargeValue: 0,
      rechargeFeeValue: 0,
      rechargePointsValue: 0,
      stateCode: 0,
      phoneNumber: "string",
      providerId: 0,
      token: "string",
      environment: "string",
      campaign: "string",
      codeRequestReconhece: "string",
    },
  };

  console.log("dados do usuario", userInfo);
  console.log("Super objeto", teste)

  const handleOrder = async () => {
    try {
      const response = await axios.post(
        "http://20.226.77.29/ms-order-api/api/Order/CreateOrder",
        teste,
        {
          headers: {
            // Authorization: `bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(response.data.data);
      console.log(response.data); // Para fins de depuração
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout
        parent="Home"
        sub="Shop"
        subChild="Cart"
        noBreadcrumb=""
        headerStyle=""
      >
        <section className="mb-50 overflow-hidden position-relative">
          <div className="container">
            <div className="row" hidden>
              <div className="col-lg-8 mb-30">
                <h4 className="heading-4 mb-10 font-weight-bold text-primary">
                  Você pode adicionar também
                </h4>
              </div>
              {quickView ? null : (
                <>
                  <div className="row mt-10">
                    <div className="col-12">
                      <div className="row related-products position-relative w-50">
                        <RelatedSlider />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="container ps-relatve">
            <div className="row">
              <div className="content-tabs mb-30 mt-30 ml-10 mr-10 p-0">
                <div
                  className={
                    toggleState === 1 ? "content active-content" : "content"
                  }
                >
                  <header className="header-top ">
                    <h2>Frete</h2>

                    <nav>
                      <ul className="nav-step">
                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            Carrinho
                          </a>
                        </li>

                        <li>
                          <span>Calculo de Frente</span>
                        </li>
                      </ul>
                    </nav>
                  </header>

                  <h6 className="font-weight-bold mt-30 mb-30 text-decoration-underline">
                    <a href="/"> Continuar Comprando</a>{" "}
                  </h6>

                  <div className="col-lg-12 ">
                    <div className="row">
                      <div className="table-responsive shopping-summery col-md-8 col-12 col-sm-8">
                        {cartItems.length <= 0 && "Nenhum produto adicionado"}
                        <table
                          className={
                            cartItems.length > 0
                              ? "table table-wishlist"
                              : "d-none"
                          }
                        >
                          <tbody>
                            {cartItems.map((item, i) => (
                              <tr className="col-12 border-bottom d-flex align-items-center justify-content-between">
                                <td className="image product-thumbnail">
                                  <img src={item?.images[1]?.url} />
                                </td>

                                <div className="col-md-8">
                                  <td className="product-des product-name">
                                    <h5 className="product-name font-weight-bold">
                                      <Link href="/products">
                                        <a className="text-secondary">
                                          {item.displayName}
                                        </a>
                                      </Link>
                                    </h5>

                                    <div>
                                      <span>Loja: {item.storeName}</span>
                                    </div>
                                    <div>
                                      <span>REF: {item.storeItemCode}</span>
                                    </div>
                                    <div>
                                      <span>Modelo: {item.model}</span>
                                    </div>
                                  </td>
                                </div>
                                <td>
                                  <tr className="text-center" data-title="Cart">
                                    <h4 className="text-body">
                                      Pts.
                                      {item.quantity * item?.skus[0]?.salePrice}
                                    </h4>
                                  </tr>

                                  <tr
                                    className="detail-info"
                                    data-title="Stock"
                                  >
                                    <div className="detail-extralink mt-15">
                                      <div className="detail-qty border radius ">
                                        <a
                                          onClick={(e) =>
                                            decreaseQuantity(item.id)
                                          }
                                          className="qty-down"
                                        >
                                          <i className="fi-rs-angle-small-down"></i>
                                        </a>
                                        <span className="qty-val">
                                          {item.quantity}
                                        </span>
                                        <a
                                          onClick={(e) =>
                                            increaseQuantity(item.id)
                                          }
                                          className="qty-up"
                                        >
                                          <i className="fi-rs-angle-small-up"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </tr>

                                  <tr className="action" data-title="Remove">
                                    <a
                                      onClick={(e) => {
                                        deleteFromCart(item.id);
                                      }}
                                      className="mt-2 d-table "
                                    >
                                      <i className="fi-rs-trash mr-10 text-secondary"></i>
                                      <span className="text-secondary">
                                        Excluir
                                      </span>
                                    </a>
                                  </tr>
                                  <tr hidden>
                                    <a>
                                      <i className="fi-rs-heart mr-10"></i>
                                      Salvar como favorito
                                    </a>
                                  </tr>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="col-md-4 col-12 col-sm-4">
                        <td>
                          <div className="bg-form text-white p-20">
                            {!shipping && (
                              <div className="input-group mb-3">
                                <input
                                  type="number"
                                  className="form-control bg-light mr-15 rounded border-secondary"
                                  placeholder="CEP"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={cep}
                                  onChange={(e) => setCep(e.target.value)}
                                />
                                <div className="input-group-append">
                                  <button
                                    onClick={() => calcShipp(cartItems)}
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="button-addon1"
                                  >
                                    Calcular Frete
                                  </button>
                                </div>
                              </div>
                            )}

                            {shippError && (
                              <div className="text-danger">
                                Informe um CEP válido
                              </div>
                            )}

                            {!shipping && (
                              <a
                                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                                className="text-secondary underline"
                              >
                                Não sei meu CEP
                              </a>
                            )}

                            <div className="input-group mt-3 mb-10" hidden>
                              <input
                                type="text"
                                className="form-control bg-light mr-15 rounded border-secondary"
                                placeholder="Digite o cupom"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  id="button-addon1"
                                >
                                  Aplicar Cupom
                                </button>
                              </div>
                            </div>

                            {shipping && (
                              <div>
                                <a href="" className="mb-10 d-flex">
                                  Fazer nova consulta
                                </a>

                                <p>{address?.cep}</p>
                                <p>{address?.logradouro}</p>
                                <p>{address?.localidade}</p>
                                <p>{address?.uf}</p>

                                <hr className="border-secondary border-top" />

                                <h6 className="text-brand fw-900">Frete</h6>

                                <div>
                                  {shipping?.map((item, index) => (
                                    <p key={index}>
                                      {item.store}: {item.priceShipping} Pts.
                                    </p>
                                  ))}
                                </div>

                                <p className="fw-900 mt-10 font-xl">
                                  Total do frete: {totalShipping} Pts.
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </div>
                    </div>

                    {shipping && (
                      <div className="border-top mt-30 pt-30">
                        <div className="row justify-content-end">
                          <div className="col-2">
                            <h5 className="font-weight-bold" hidden>
                              Entrega Pts.{totalShipping}
                            </h5>
                            <h4 className="heading-4 font-weight-bold">
                              Total da compra
                            </h4>
                            <h4 className="heading-4 mt-5 price-color">
                              Pts.{price() + totalShipping}
                            </h4>
                          </div>

                          <div className="col-2">
                            <div className="cart-action">
                              <button
                                className={
                                  toggleState === 2
                                    ? "btn tabs tabs-active"
                                    : "tabs btn w-100"
                                }
                                onClick={() => toggleTab(2)}
                              >
                                Proxima Etapa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content active-content" : "content"
                  }
                >
                  <header className="header-top">
                    <h2>Frete</h2>

                    <nav className="mb-30">
                      <ul className="nav-step">
                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            Carrinho
                          </a>
                        </li>

                        <li>
                          <span>Informações de Endereço</span>
                        </li>
                      </ul>
                    </nav>
                  </header>

                  <div className="row justify-content-between">
                    <div className="col-7">
                      <div className="d-flex flex-column">
                        <form>
                          <div className="row">
                            <div className="col-10">
                              <input
                                type="text"
                                value={address?.logradouro}
                                className="form-control bg-light mr-15 mb-15 mt-10 rounded border-secondary"
                                placeholder="Avenida/Rua*"
                                aria-label="Avenida/Rua"
                                aria-describedby="button-addon2"
                                onChange={(e) => setStreet(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control bg-light rounded border-secondary"
                                placeholder="Complemento"
                                aria-label="Complemento"
                                aria-describedby="button-addon2"
                                onChange={(e) => setComplement(e.target.value)}
                              />
                            </div>
                            <div className="col-5">
                              <input
                                type="text"
                                className="form-control bg-light mr-15 rounded border-secondary"
                                placeholder="Número"
                                aria-label="Número"
                                aria-describedby="button-addon2"
                                onChange={(e) => setNumber(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-10">
                              <input
                                type="text"
                                value={address?.localidade}
                                className="form-control bg-light mr-15 mb-15 mt-15 rounded border-secondary"
                                placeholder="Bairro"
                                aria-label="Bairro"
                                aria-describedby="button-addon2"
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <input
                                type="text"
                                value={address?.cep}
                                className="form-control bg-light mr-15 mb-15 rounded border-secondary"
                                placeholder="CEP*"
                                aria-label="CEP"
                                aria-describedby="button-addon2"
                                onChange={(e) => setZipCode(e.target.value)}
                              />
                            </div>
                          </div>
                        </form>

                        <div className="col-4 mt-10">
                          <button
                            className={
                              toggleState === 3
                                ? "btn tabs tabs-active"
                                : "tabs btn w-100"
                            }
                            onClick={() => toggleTab(3)}
                          >
                            ir para o Pagamento
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <div className="w-100 bg-form bg-form p-20">
                        {cartItems.map((item, i) => (
                          <div className="w-100 d-flex pb-10 pt-10">
                            <div className="d-flex w-100">
                              <div className="d-flex w-100">
                                <figure className="col-2">
                                  <img
                                    className="w-100"
                                    src={item?.images[1]?.url}
                                  />
                                </figure>

                                <div className="pl-30">
                                  <Link href="/products">
                                    <a className="text-secondary">
                                      {item.displayName}
                                    </a>
                                  </Link>

                                  <p>Loja: {item.storeName}</p>
                                  <span>Quantidade: </span>
                                  {item?.quantity}
                                </div>
                              </div>

                              <p>
                                Pts.
                                {item.quantity * item?.skus[0]?.salePrice}
                              </p>
                            </div>
                          </div>
                        ))}

                        <hr />
                        {shipping && (
                          <div>
                            <h5 className="font-weight-bold d-flex justify-content-between">
                              <span>Entrega: </span>
                              <span>Pts.{totalShipping} </span>
                            </h5>

                            <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                              <span> Total: </span>
                              <span>Pts.{price() + totalShipping}</span>
                            </h4>
                          </div>
                        )}
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content active-content" : "content"
                  }
                >
                  <header className="header-top">
                    <h2>Pagamento</h2>

                    <nav className="mb-30">
                      <ul className="nav-step">
                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            Carrinho
                          </a>
                        </li>

                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            {" "}
                            Informações de Endereço
                          </a>
                        </li>

                        <li>
                          <span>Opções de Pagamento</span>
                        </li>
                      </ul>
                    </nav>
                  </header>

                  <div className="row justify-content-between">
                    <div className="col-md-7 col-12 col-sm-7">
                      <ul className="mb-30">
                        <form>
                          <li className="p-3 border mt-10 mb-10">
                            <label className="d-flex mb-0">
                              <input
                                type="radio"
                                className="col-md-1 col-sm-1"
                                name="fav_language"
                                value="HTML"
                                key={1}
                                onClick={() => selecionarPontos("1")}
                              />

                              <span>
                                Saldo de Pontos - Você tem:{" "}
                                <small>{userInfo?.pointsBalance}</small>
                              </span>
                            </label>
                          </li>

                          <li className="p-3 border">
                            <label className="d-flex mb-0">
                              <input
                                type="radio"
                                className="col-md-1 col-sm-1"
                                name="fav_language"
                                key={2}
                                value="HTML"
                                onClick={() => setPaymentMethodId("2")}
                              />

                              <span>Pontos + Cartão de Crédito</span>
                            </label>

                            <hr />

                            <span className="pt-15 pb-15 d-block">
                              Digite o valor que deseja pagar em pontos
                            </span>

                            <ol>
                              <li className="d-flex align-items-center">
                                <div className="pr-10 col-md-6 col-12 col-sm-6">
                                  <input
                                    type="text"
                                    value={points}
                                    className="form-control rounded border-secondary"
                                    placeholder="Pontos"
                                    onChange={(e) => setPoints(e.target.value)}
                                  />
                                </div>
                                <div className="pr-10 col-md-6">
                                  <p>
                                    {cartItems.map((item) => item.displayName)}
                                  </p>
                                </div>
                              </li>

                              <li className="pt-30 pb-15">
                                <legend className="pb-20">
                                  Insira os dados do seu cartão de crédito
                                </legend>

                                <input
                                  type="text"
                                  value={numeroCartao}
                                  className="form-control rounded border-secondary"
                                  placeholder="Número do cartão"
                                  onChange={(e) =>
                                    setNumeroCartao(e.target.value)
                                  }
                                />
                              </li>

                              <li className="d-flex align-items-center justify-content-between">
                                <ol className="col-md-6 col-12 col-sm-5 pr-10 ">
                                  <li className="w-100">
                                    <input
                                      type="text"
                                      value={mesValidade}
                                      className="form-control rounded border-secondary"
                                      placeholder="mês"
                                      onChange={(e) =>
                                        setmesValidade(e.target.value)
                                      }
                                    />
                                  </li>
                                </ol>
                                <ol className="col-md-6 col-12 col-sm-5 pr-10 ">
                                  <li className="w-100">
                                    <input
                                      type="text"
                                      value={anoValidade}
                                      className="form-control rounded border-secondary"
                                      placeholder="Ano"
                                      onChange={(e) =>
                                        setAnoValidade(e.target.value)
                                      }
                                    />
                                  </li>
                                </ol>
                              </li>

                              <li className="pt-15 pb-15">
                                <input
                                  type="text"
                                  value={nomeTitular}
                                  className="form-control rounded border-secondary"
                                  placeholder="Nome Impresso no Cartão"
                                  onChange={(e) =>
                                    setNomeTitular(e.target.value)
                                  }
                                />
                              </li>

                              <li className="">
                                <input
                                  type="text"
                                  value={cpf}
                                  className="form-control rounded border-secondary"
                                  placeholder="CPF do Titular"
                                  onChange={(e) => setCpf(e.target.value)}
                                />
                              </li>
                              <li className="d-flex align-items-center justify-content-between">
                                <ol className="col-md-6 col-12 col-sm-5 pr-10">
                                  <li className="pt-15 pb-15">
                                    <input
                                      type="text"
                                      value={codigoSegurancaCartao}
                                      className="form-control rounded border-secondary"
                                      placeholder="codigoSegurancaCartao"
                                      onChange={(e) =>
                                        setCodigoSegurancaCartao(e.target.value)
                                      }
                                    />
                                  </li>
                                </ol>
                                <ol className="col-md-6 col-12 col-sm-5 pr-10">
                                  <li className="pt-15 pb-15">
                                    <input
                                      type="text"
                                      value={nomeBandeira}
                                      className="form-control rounded border-secondary"
                                      placeholder="Bandeira do Cartão"
                                      onChange={(e) =>
                                        setNomeBandeira(e.target.value)
                                      }
                                    />
                                  </li>
                                </ol>
                              </li>
                              <li className="pt-30 pb-15" hidden>
                                <legend className="pb-10">
                                  Selecione o número de parcelas
                                </legend>

                                <select className="" name="select">
                                  <option value="valor1">Valor 1</option>
                                  <option value="valor2" selected>
                                    Valor 2
                                  </option>
                                  <option value="valor3">Valor 3</option>
                                </select>
                              </li>
                            </ol>
                          </li>
                        </form>

                        <div className="col-4 mt-10">
                          <button
                            className={
                              toggleState === 4
                                ? "btn tabs tabs-active"
                                : "tabs btn w-100"
                            }
                            onClick={() => toggleTab(4)}
                          >
                            Finalizar pagamento
                          </button>
                        </div>
                      </ul>
                    </div>

                    <div className="col-md-4 col-12 col-sm-4">
                      <div className="w-100 bg-form bg-form p-20">
                        {cartItems.map((item, i) => (
                          <div className="w-100 d-flex pb-10 pt-10">
                            <div className="d-flex w-100">
                              <div className="d-flex w-100">
                                <figure className="col-2">
                                  <img
                                    className="w-100"
                                    src={item?.images[1]?.url}
                                  />
                                </figure>

                                <div className="pl-30">
                                  <Link href="/products">
                                    <a className="text-secondary">
                                      {item.displayName}
                                    </a>
                                  </Link>

                                  <p>Loja: {item.storeName}</p>
                                </div>
                              </div>

                              <p>
                                Pts.
                                {item.quantity * item?.skus[0]?.salePrice}
                              </p>
                            </div>
                          </div>
                        ))}

                        <hr />

                        <div>
                          <h5 className="font-weight-bold d-flex justify-content-between">
                            <span>Subtotal: </span>
                            <span>Pts. {price() + totalShipping}</span>
                          </h5>

                          <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                            <span> Entrega: </span>
                            <span>Pts. {totalShipping}</span>
                          </h4>
                        </div>

                        <hr />

                        <div className="mt-30 mb-30">
                          <h4 className="heading-4 mb-10 price-color d-flex justify-content-between">
                            <span>Total em Pontos: </span>
                            <span>Pts. {price() + totalShipping}</span>
                          </h4>

                          <h5 className="font-weight-bold d-flex justify-content-between pt-30">
                            <span>Total no Cartão de Credito: </span>
                            <span>Pts. 0,00 </span>
                          </h5>

                          <h5 className="font-weight-bold d-flex justify-content-between pt-10">
                            <div className="d-flex">
                              <figure></figure>

                              {/* <p>
                                                                Mastercard - Final 000000 <br />
                                                                <span>2x  de R$ 100,00 sem juros</span>
                                                            </p> */}
                            </div>
                          </h5>
                        </div>

                        <hr />

                        <div className="mt-30 mb-30">
                          <span>Dados do Enreço: </span>
                          <span className="d-block">
                            <p>{address?.cep}</p>
                            <p>{address?.logradouro}</p>
                            <p>{address?.localidade}</p>
                            <p>{address?.uf}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    toggleState === 4 ? "content active-content" : "content"
                  }
                >
                  <header className="header-top mb-45">
                    <h2>Pagamento</h2>

                    <nav>
                      <ul className="nav-step">
                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            Carrinho
                          </a>
                        </li>

                        <li>
                          <a href="javascript:void(0)" title="Carrinho">
                            {" "}
                            Finalização do Pagamento
                          </a>
                        </li>

                        <li>
                          <span>Seu pedido</span>
                        </li>
                      </ul>
                    </nav>
                  </header>

                  <div className="row justify-content-between">
                    <div className="col-md-7 col-12 col-sm-7">
                      <div className="col-finalize-purchase">
                        <div className="col-finalize_pedido">
                          <header>
                            <p>
                              Seu pedido foi concluido com sucesso e o pagamento
                              confirmado!
                            </p>
                            <h3>Resumo do Pedido</h3>
                            <p>
                              Número do pedido: {statusPedido?.codigoPedido}
                            </p>
                          </header>

                          <ul>
                            <li className="step_one">
                              <div className="sub-step_one">
                                <h5>Endereço de Entrega</h5>

                                <p>{address?.cep}</p>
                                <p>{address?.logradouro}</p>
                                <p>{address?.localidade}</p>
                                <p>{address?.uf}</p>
                              </div>

                              <div className="sub-step_tho">
                                <i></i>
                                <ul>
                                  <li className="step-ok">
                                    <figure></figure>

                                    <span>
                                      Confirmação <br /> de Pagamento
                                    </span>
                                  </li>

                                  <li>
                                    <figure></figure>

                                    <span>
                                      Envio a <br /> Transportadora
                                    </span>
                                  </li>

                                  <li>
                                    <figure></figure>

                                    <span>
                                      Produto a <br /> Caminho
                                    </span>
                                  </li>

                                  <li>
                                    <figure></figure>

                                    <span>
                                      Produto <br /> Entregue
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </li>

                            <li className="step_tho">
                              <div>
                                {cartItems.map((item, i) => (
                                  <div className="w-100 d-flex pb-10 pt-10">
                                    <div className="d-flex w-100">
                                      <div className="d-flex w-100">
                                        <figure className="col-2">
                                          <img
                                            className="w-100"
                                            src={item?.images[1]?.url}
                                          />
                                        </figure>

                                        <div className="pl-30">
                                          <Link href="/products">
                                            <a className="text-secondary">
                                              {item.displayName}
                                            </a>
                                          </Link>

                                          <p>Loja: {item.storeName}</p>
                                        </div>
                                      </div>

                                      <p>
                                        Pts.
                                        {item.quantity *
                                          item?.skus[0]?.salePrice}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </li>

                            <li className="step_tre">
                              <div className="sub-step_tre">
                                <h5>Endereço de Entrega</h5>

                                <p>{address?.cep}</p>
                                <p>{address?.logradouro}</p>
                                <p>{address?.localidade}</p>
                                <p>{address?.uf}</p>
                              </div>

                              <div className="sub-step_fuo">
                                <h5>Método de Pagamento</h5>

                                <p>
                                  Saldo de Pontos + cartão <strong></strong>
                                </p>

                                {/* <p>
                                                                    Mastercard <strong>à vista R$ 999,00</strong>
                                                                </p> */}
                              </div>

                              <div className="sub-step_fiv">
                                <ul>
                                  <li>
                                    <div>
                                      <li>Subtotal:</li>
                                      <li>
                                        <span>Pts.</span>{" "}
                                        {price() + totalShipping}
                                      </li>
                                    </div>
                                  </li>

                                  <li>
                                    <div>
                                      <li>Entrega:</li>
                                      <li>
                                        <span>Pts.</span>
                                        {totalShipping}
                                      </li>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>

                            <li className="step_for">
                              <a href="javascript:void(0)">Todos os pedidos</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-12 col-sm-4">
                      <div className="w-100 bg-form bg-form p-20">
                        {cartItems.map((item, i) => (
                          <div className="w-100 d-flex pb-10 pt-10">
                            <div className="d-flex w-100">
                              <div className="d-flex w-100">
                                <figure className="col-2">
                                  <img
                                    className="w-100"
                                    src={item?.images[1]?.url}
                                  />
                                </figure>

                                <div className="pl-30">
                                  <Link href="/products">
                                    <a className="text-secondary">
                                      {item.displayName}
                                    </a>
                                  </Link>

                                  <p>Loja: {item.storeName}</p>
                                </div>
                              </div>

                              <p>
                                Pts.
                                {item.quantity * item?.skus[0]?.salePrice}
                              </p>
                            </div>
                          </div>
                        ))}

                        <hr />

                        <div>
                          <h5 className="font-weight-bold d-flex justify-content-between">
                            <span>Subtotal: </span>
                            <span>Pts. {price() + totalShipping} </span>
                          </h5>

                          <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                            <span> Entrega: </span>
                            <span>Pts. {totalShipping}</span>
                          </h4>
                        </div>

                        <hr />

                        <div className="mt-30 mb-30">
                          <h4 className="heading-4 mb-10 price-color d-flex justify-content-between">
                            <span>Total em Pontos: </span>
                            <span>Pts. {price() + totalShipping}</span>
                          </h4>

                          <h5 className="font-weight-bold d-flex justify-content-between pt-30" hidden>
                            <span>Total no Cartão de Credito: </span>
                            <span>Pts. 0,00 </span>
                          </h5>

                          <h5 className="font-weight-bold d-flex justify-content-between pt-10">
                            <div className="d-flex">
                              <figure></figure>

                              {/* <p>
                                                                Mastercard - Final 000000 <br />
                                                                <span>2x  de R$ 100,00 sem juros</span>
                                                            </p> */}
                            </div>
                          </h5>
                        </div>

                        <hr />

                        <div className="mt-30 mb-30">
                          <p className="mb-10">
                            <span>Dados do Enreço: </span>
                            <span className="d-block">
                              <p>{address?.cep}</p>
                              <p>{address?.logradouro}</p>
                              <p>{address?.localidade}</p>
                              <p>{address?.uf}</p>
                            </span>
                          </p>
                        </div>
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

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  activeCart: state.counter,
});

const mapDispatchToProps = {
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  openCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
