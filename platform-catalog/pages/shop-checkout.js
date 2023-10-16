import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import {
    clearCart,
    closeCart,
    decreaseQuantity,
    deleteFromCart,
    increaseQuantity,
    openCart,
} from "../redux/action/cart";
import { shippingContext } from "../hooks/ShippingProvider";
import { useQuery } from "react-query";
import axios from "axios";


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
        cartItems.forEach((item) => (price += item.skus[0].salePrice * item.quantity));

        return price;

    };
    const {
        cep,
        setCep,
        address,
        cepAddress,
        shipping,
        totalShipping,
        shippError,
        calcShipp,
        numero,
        bairro,
        cidade,
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
            <Layout parent="Home" sub="Carrinho" subChild="Informações de Endereço">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <header className="header-top">
                            <h2>Frete</h2>

                            <nav className="mb-30">
                                <ul className="nav-step">
                                    <li>
                                        <a href="javascript:void(0)" title="Carrinho">Carrinho</a>
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
                                                <input type="text" value={address?.logradouro} className="form-control bg-light mr-15 mb-15 mt-10 rounded border-secondary" placeholder="Avenida/Rua*" aria-label="Avenida/Rua" aria-describedby="button-addon2" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-5">
                                                <input type="text" className="form-control bg-light rounded border-secondary" placeholder="Complemento" aria-label="Complemento" aria-describedby="button-addon2" />
                                            </div>
                                            <div className="col-5">
                                                <input type="text" className="form-control bg-light mr-15 rounded border-secondary" placeholder="Número" aria-label="Número" aria-describedby="button-addon2" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-10">
                                                <input type="text" value={address?.localidade} className="form-control bg-light mr-15 mb-15 mt-15 rounded border-secondary" placeholder="Bairro" aria-label="Bairro" aria-describedby="button-addon2" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-5">
                                                <input type="text" value={address?.cep} className="form-control bg-light mr-15 mb-15 rounded border-secondary" placeholder="CEP*" aria-label="CEP" aria-describedby="button-addon2" />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="col-2 mt-10">
                                        <a className="btn" href="payment-options">
                                            Avançar
                                        </a>
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
                                                        <img className="w-100" src={item?.images[1]?.url} />
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
                                                    $
                                                    {item.quantity *
                                                        item?.skus[0]?.salePrice}
                                                        
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <hr />
                                    {shipping && (
                                        <div>

                                            <h5 className="font-weight-bold d-flex justify-content-between">
                                                <span>Entrega: </span>
                                                <span>${totalShipping} </span>
                                            </h5>

                                            <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                                                <span> Total: </span>
                                                <span>${price() + totalShipping}</span></h4>
                                        </div>
                                    )}
                                    <hr />
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