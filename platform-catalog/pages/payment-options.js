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
import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext, AuthProvider } from "../hooks/AuthProvider";


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
        cartItems.forEach((item) => (price += item.skus[0].salePrice * item.quantity));

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
        setTotalPrice,
        
    
    } = shippingContext();
    
    const { session, params } = useAuthContext();


    const { data: order } = useQuery([shipping, session, cep, cepAddress, totalShipping], async () => {
        return axios.post("", {
            headers: {
                Authorization: `bearer ${session?.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response?.data?.data;
            })
    });


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
                        <header className="header-top mb-45">
                            <h2>Pagamento</h2>

                            <nav>
                                <ul className="nav-step">
                                    <li>
                                        <a href="javascript:void(0)" title="Carrinho">Carrinho</a>
                                    </li>

                                    <li>
                                        <a href="javascript:void(0)" title="Carrinho"> Informações de Endereço</a>
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
                                                <input type="radio" className="col-md-1 col-sm-1" name="fav_language" value="HTML" />

                                                <span>
                                                    Saldo de Pontos - Você tem: <small>98015 pontos</small>
                                                </span>
                                            </label>
                                        </li>

                                        <li className="p-3 border">
                                            <label className="d-flex mb-0">
                                                <input type="radio" className="col-md-1 col-sm-1" name="fav_language" value="HTML" />

                                                <span>
                                                    Pontos + Cartão de Crédito
                                                </span>
                                            </label>

                                            <hr />

                                            <span className="pt-15 pb-15 d-block">Digite o valor que deseja pagar em pontos</span>

                                            <ol>
                                                <li className="d-flex align-items-center">
                                                    <div className="pr-10 col-md-6 col-12 col-sm-6">
                                                        <input type="text" className="form-control rounded border-secondary" placeholder="Pontos" />
                                                    </div>

                                                    <p className="pl-10">+ <span>R$ 200,00</span> no cartão de crédito</p>
                                                </li>

                                                <li className="pt-30 pb-15">
                                                    <legend className="pb-20">Insira os dados do seu cartão de crédito</legend>

                                                    <input type="text" className="form-control rounded border-secondary" placeholder="Nome Impresso no Cartão" />
                                                </li>

                                                <li className="d-flex align-items-center justify-content-between">
                                                    <ol className="col-md-6 col-12 col-sm-5 pr-10 ">
                                                        <li className="w-100">
                                                            <input type="text" className="form-control rounded border-secondary" placeholder="validade" />
                                                        </li>
                                                    </ol>
                                                    <ol className="col-md-6 col-12 col-sm-5 pl-10 ">
                                                        <li className="w-100">
                                                            <input type="text" className="form-control rounded border-secondary" placeholder="cvv" />
                                                        </li>
                                                    </ol>
                                                </li>

                                                <li className="pt-15 pb-15">
                                                    <input type="text" className="form-control rounded border-secondary" placeholder="Nome Impresso no Cartão" />
                                                </li>

                                                <li className="">
                                                    <input type="text" className="form-control rounded border-secondary" placeholder="CPF do Titular" />
                                                </li>

                                                <li className="pt-30 pb-15">
                                                    <legend className="pb-10">Selecione o número de parcelas</legend>

                                                    <select className="" name="select">
                                                        <option value="valor1">Valor 1</option>
                                                        <option value="valor2" selected>Valor 2</option>
                                                        <option value="valor3">Valor 3</option>
                                                    </select>
                                                </li>
                                            </ol>
                                        </li>

                                        <li className="col-md-7 col-12 col-sm-7 mt-30">
                                            <a href="/Cart/finalize-purchase" className="btn">Finalizar Pagamento </a>
                                        </li>
                                    </form>
                                </ul>
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
                                            <span>R$  {price() + totalShipping}</span>
                                        </h5>

                                        <h4 className="heading-4 mt-10 price-color  d-flex justify-content-between">
                                            <span> Entrega: </span>
                                            <span>R$ {totalShipping}</span></h4>
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
                                        
                                            <span>Dados do Enreço: </span>
                                            <span className="d-block">{cepAddress}</span>
                                        
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