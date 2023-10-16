import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";
import { shippingContext } from "../hooks/ShippingProvider";

import Link from "next/link";
import {
    clearCart,
    closeCart,
    decreaseQuantity,
    deleteFromCart,
    increaseQuantity,
    openCart,
} from "../redux/action/cart";
import { useHomeDataContext } from "../hooks/HomeDataProvider";
import { useAuthContext } from "../hooks/AuthProvider";
import axios from "axios";
import Loader from "../components/ecommerce/Loader";

interface DeliveryAddress {
    city: string,
    complement: string,
    district: string,
    number: string,
    publicPlace: string,
    reference: string,
    state: string,
    telephone: string,
    telephone1: string,
    telephone2: string,
    telephone3: string,
    zipCode: string,
}

interface OrderList {
    cnpj: string,
    cpf: string,
    orderCode: string,
    deliveryAddress: DeliveryAddress[],

};

type Address = {
    city: string,
    complement: string,
    district: string,
    number: string,
    publicPlace: string,
    reference: string,
    state: string,
    telephone: string,
    telephone1: string,
    telephone2: string,
    telephone3: string,
    zipCode: string,
}



const Cart = ({
    openCart,
    cartItems,
    activeCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    clearCart,
}) => {
    const { session } = useAuthContext();
    const [orders, setOrderList] = useState<OrderList[]>([])
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        // Simulando um carregamento demorado
        setTimeout(() => {
          setLoading(false); // Assumindo que o conteúdo foi carregado
        }, 2000); // Simula um carregamento de 2 segundos
      }, []);

    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.price * item.quantity));

        return price;
    };


    useEffect(() => {
        axios.get<OrderList[]>('http://20.226.77.29/ms-order-api/api/Order/GetListOrder/36442669807', {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                setOrderList(response.data);
                const deliveryAddresses: DeliveryAddress[] = orders.flatMap(order => order.deliveryAddress);
                console.log(deliveryAddresses);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])


    console.log(orders);

    return (
        <>
            <Layout parent="" sub="" subChild="" headerStyle="" noBreadcrumb="">
                {!loading ? (
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row justify-content-between">
                            <AbaMeuPerfil />

                            <div className="col-md-9 col-xl-9">
                                {orders.length === 0 ? (


                                    <div className="content active-content border p-10 p-25 rounded content border p-10 p-25 rounded"
                                    >

                                        <h5 className="fs-3 text-success mb-30">Você não possui Pedidos</h5>

                                        <p className="fs-6"> <span className="fw-300"></span></p>

                                        <li className="col-md-12">

                                        </li>
                                    </div>

                                ) : (

                                    <div className="w-100 d-flex justify-content-between">
                                        {orders?.map((item) =>
                                            <div className="container">
                                                <div className="row">

                                                    <div className="col">
                                                        <div className="d-flex flex-column bd-highlight mb-3">
                                                            <div className="p-2 bd-highlight container-pedidos-realizados-aberto rounded">
                                                                <div className="d-flex flex-column bd-highlight mb-3">
                                                                    <div className="bd-highlight flex-item-status-pedido mt-20 ml-20">
                                                                        <div className="d-flex flex-row bd-highlight mb-3">


                                                                            <div className="bd-highlight col-2 pedido-font">
                                                                                Pedido <span>{item?.orderCode}</span>
                                                                            </div>

                                                                            <div className="bd-highlight col-2 pedido-font" hidden>
                                                                                Data <span>01/01/2022</span>
                                                                            </div>
                                                                            <div className="bd-highlight col d-flex justify-content-end sucess-status">

                                                                                <div>
                                                                                    <a><span>Status <b>Pedido Enviado para o Parceiro</b></span></a>
                                                                                </div>
                                                                                <div className="mt-0.75 ml-5">
                                                                                    <a><img src="../assets/imgs/icons/icon-seta-cima.svg" width={22}></img></a>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-2 bd-highlight">
                                                                        {cartItems.map((item, i) => (
                                                                            <div className="w-100 d-flex pb-10 pt-10">
                                                                                <div className="d-flex w-100">
                                                                                    <div className="d-flex w-100">
                                                                                        <figure className="col-2">
                                                                                            <img className="w-100" src={item?.images[1]?.url} />
                                                                                        </figure>


                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                        {cartItems.map((item, i) => (
                                                                            <div className="bd-highlight mt-20 ml-20">
                                                                                <div className="d-flex flex-row bd-highlight mb-3">

                                                                                    <div className="w-100 d-flex pb-10 pt-10">
                                                                                        <div className="d-flex w-100">
                                                                                            <div className="d-flex w-100">
                                                                                                <figure className="col-2">

                                                                                                </figure>

                                                                                                <div className="pl-30">
                                                                                                    <Link href="/products">
                                                                                                        <a className="text-secondary">
                                                                                                            {item.displayName}
                                                                                                        </a>
                                                                                                    </Link>


                                                                                                    <p>Loja: {item.storeName}</p>
                                                                                                </div>
                                                                                                <div className="pl-30">
                                                                                                    <span>Quantidade: </span>
                                                                                                    {item?.quantity}
                                                                                                </div>
                                                                                            </div>

                                                                                            <p>
                                                                                                R$ {item.quantity *
                                                                                                    item?.skus[0]?.salePrice}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    {cartItems.map((item, i) => (
                                                                        <div className="bd-highlight order-border-top-2 mr-20 ml-20">
                                                                            <div className="d-flex flex-row bd-highlight mb-3">
                                                                                {/* <div className="mt-20 bd-highlight col-4">
                                                                                    <div className="d-flex flex-column bd-highlight mb-3">
                                                                                        <div className="mb-2 bd-highlight font-blue">
                                                                                            <span>Endereço de Cobrança</span>
                                                                                        </div>
                                                                                        <div className="bd-highlight">
                                                                                            <span>

                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="bd-highlight">
                                                                                            <span> <p>{address?.cep}</p>
                                                                                                <p>{address?.logradouro}</p>
                                                                                                <p>{address?.localidade}</p>
                                                                                                <p>{address?.uf}</p></span>
                                                                                        </div>
                                                                                        <div className="bd-highlight">
                                                                                            <span></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> */}

                                                                                <div className="mt-20 bd-highlight col-4">
                                                                                    <div className="d-flex flex-column bd-highlight mb-3">
                                                                                        <div className="mb-2 bd-highlight font-blue">
                                                                                            Método de Pagamento
                                                                                        </div>
                                                                                        <div className="bd-highlight">
                                                                                            Saldo de Pontos + Cartão
                                                                                        </div>
                                                                                        {/* <div className="mb-2 bd-highlight">
                                                                                        <h6>{}</h6>
                                                                                    </div>
                                                                                    <div className="bd-highlight">
                                                                                        Mastercard (final 0000)
                                                                                    </div> */}
                                                                                        <div className="mb-2 bd-highlight">
                                                                                            <h6></h6>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="mt-20 bd-highlight col">
                                                                                    <div className="d-flex flex-column bd-highlight mb-3">
                                                                                        <div className="bd-highlight">
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <div>
                                                                                                    <h5>Subtotal</h5>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>{item.quantity *
                                                                                                        item?.skus[0]?.salePrice} Pts.</h5>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* <div className="bd-highlight mt-10">
                                                                                            <div className="bd-highlight">
                                                                                                <div className="d-flex justify-content-between">
                                                                                                    <div>
                                                                                                        <h5>Entrega</h5>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <h5>20 vig$</h5>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div> */}
                                                                                        <div className="bd-highlight mt-50">
                                                                                            <div className="bd-highlight">
                                                                                                <div className="d-flex justify-content-between total-font">
                                                                                                    <div>
                                                                                                        <h5>Total</h5>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <h5>{item.quantity *
                                                                                                            item?.skus[0]?.salePrice} Pts.</h5>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {/* <div className="p-2 bd-highlight order-border-top-2 mr-20 ml-20">Flex item 4</div> */}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </section>
                ):(
                    <Loader />
                )}
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