import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import {
    clearCart,
    closeCart,
    decreaseQuantity,
    deleteFromCart,
    increaseQuantity,
    openCart,
} from "../../redux/action/cart";
import { shippingContext } from "../../hooks/ShippingProvider";


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
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.price * item.quantity));
        return price;

    };
    const {
        cep,
        setCep,
        cepAddress,
        shipping,
        totalShipping,
        shippError,
        calcShipp,
        setTotalPrice } = shippingContext()

    useEffect(() => {
        if (shipping) {
            calcShipp(cartItems)
        }
    }, [cartItems])

    useEffect(() => {
        setTotalPrice(price() + totalShipping)
    }, [cartItems])

    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <header className="header-top mb-45">
                                <h2>Pagamento</h2>

                                <nav>
                                    <ul className="nav-step">
                                        <li>
                                            <a href="javascript:void(0)" title="Carrinho">Carrinho</a>
                                        </li>

                                        <li>
                                            <a href="javascript:void(0)" title="Carrinho"> Finalização do Pagamento</a>
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
                                                <p>Seu pedido foi concluido com sucesso e o pagamento confirmado!</p>
                                                <h3>Resumo do Pedido</h3>
                                            </header>

                                            <ul>
                                                <li className="step_one">
                                                    <div className="sub-step_one">
                                                        <h5>Endereço de Entrega</h5>

                                                        <p>
                                                            {cepAddress}
                                                        </p>
                                                    </div>

                                                    <div className="sub-step_tho">
                                                        <i></i>
                                                        <ul>
                                                            <li className="step-ok">
                                                                <figure>

                                                                </figure>

                                                                <span>
                                                                    Confirmação <br /> de Pagamento
                                                                </span>
                                                            </li>

                                                            <li>
                                                                <figure>

                                                                </figure>

                                                                <span>
                                                                    Envio a  <br /> Transportadora
                                                                </span>
                                                            </li>

                                                            <li>
                                                                <figure>

                                                                </figure>

                                                                <span>
                                                                    Produto a <br /> Caminho
                                                                </span>
                                                            </li>

                                                            <li>
                                                                <figure>

                                                                </figure>

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
                                                                            <img className="w-100" src={item?.images[1]?.url} />
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
                                                                        R$
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

                                                        <p>
                                                            Av. Nome da Rua, 123 <br />
                                                            Apartamento 12 - Bairro <br />
                                                            Cidade/UF - CEP 00000-000
                                                        </p>
                                                    </div>

                                                    <div className="sub-step_fuo">
                                                        <h5>Método de Pagamento</h5>

                                                        <p>
                                                            Saldo de Pontos <strong>999vig$</strong>
                                                        </p>

                                                        <p>
                                                            Mastercard <strong>à vista R$ 999,00</strong>
                                                        </p>
                                                    </div>

                                                    <div className="sub-step_fiv">
                                                        <ul>
                                                            <li>
                                                                <div>
                                                                    <li>Subtotal:</li>
                                                                    <li>3.289 <span>vig$</span></li>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div>
                                                                    <li>Entrega:</li>
                                                                    <li>3.289 <span>vig$</span></li>
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
                                                            <img className="w-100" src={item?.images[1]?.url} />
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
                                                        R$
                                                        {item.quantity *
                                                            item?.skus[0]?.salePrice}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <hr />

                                        <div>

                                            <h5 className="font-weight-bold d-flex justify-content-between">
                                                <span>Subtotal: </span>
                                                <span>R$ {totalShipping} </span>
                                            </h5>

                                            <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                                                <span> Entrega: </span>
                                                <span>R$ {price() + totalShipping}</span></h4>
                                        </div>

                                        <hr />

                                        <div className="mt-30 mb-30">
                                            <h4 className="heading-4 mb-10 price-color d-flex justify-content-between">
                                                <span>Total em Pontos: </span>
                                                <span>R$ {price() + totalShipping}</span>
                                            </h4>

                                            <h5 className="font-weight-bold d-flex justify-content-between pt-30">
                                                <span>Total no Cartão de Credito: </span>
                                                <span>R$ {totalShipping} </span>
                                            </h5>

                                            <h5 className="font-weight-bold d-flex justify-content-between pt-10">
                                                <div className="d-flex">
                                                    <figure>

                                                    </figure>

                                                    <p>
                                                        Mastercard - Final 000000 <br />
                                                        <span>2x  de R$ 100,00 sem juros</span>
                                                    </p>
                                                </div>
                                            </h5>
                                        </div>

                                        <hr />

                                        <div className="mt-30 mb-30">
                                            <p className="mb-10">
                                                <span>Dados do Enreço: </span>
                                                <span className="d-block">Aqui vai o endereço</span>
                                            </p>
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
