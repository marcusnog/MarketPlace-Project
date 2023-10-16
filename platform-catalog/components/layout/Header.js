import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import CategoryListProducts from "../ecommerce/Filter/CategoryListProducts";
import Search from "../ecommerce/Search";
import { useHomeDataContext } from "../../hooks/HomeDataProvider";
import { useAuthContext } from "../../hooks/AuthProvider";
import { QueryCache } from "react-query";
import product from "../../redux/reducer/product";
import router from "next/router";


// type UserInfo = {
//     pointsBalance: number,
//     name: string,
// }


const Header = ({
    totalCartItems,
    totalCompareItems,
    toggleClick,
    totalWishlistItems,
    lista,

}) => {
    const [isToggled, setIsToggled] = useState(false);
    const [scroll, setScroll] = useState(0);
    const { userInfo } = useHomeDataContext();
    const { session, setSession} = useAuthContext();

    const logout = () => {
        useEffect(() => {
            const removerToken = () => {
              setSession(undefined);
            };
            removerToken()
     // 30 minutos em milissegundos
          }, [session]);

          

          useEffect(() => {
            if (session === undefined) {
              
              router.push({
                pathname: "/login/page-login",
                // pathname: "https://www.reconhece.vc/"
            });
            }
          },[]);
    
    }
  
        // const queryCache = new QueryCache({
        //     onError: error => {
            
        //     },
        //     onSuccess: data => {
            
        //     }
        // })

    // const query = queryCache.find('scroll')

    const handleToggle = () => {
        setIsToggled(!isToggled)
    };

    return (
        <>
            <header className="header-area header-style-1 header-height-2">
                <div className="mobile-promotion">
                    <span>
                        Grand opening, <strong>up to 15%</strong> off all items.
                        Only <strong>3 days</strong> left
                    </span>
                </div>

                <div hidden>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info">
                                    <ul>
                                        <li>
                                            <Link href="/page-about">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-account">
                                                <a>My Account</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop-wishlist">
                                                <a>Wishlist</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-account">
                                                <a>Order Tracking</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-4">
                                <div className="text-center">
                                    <div
                                        id="news-flash"
                                        className="d-inline-block"
                                    >
                                        <ul>
                                            <li>
                                                Get great devices up to 50% off
                                                <Link href="/shop-grid-right">
                                                    <a> View details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info header-info-right">
                                    <ul>
                                        <li>
                                            Need help? Call Us:{" "}
                                            <strong className="text-brand">
                                                {" "}
                                                + 1800 900
                                            </strong>
                                        </li>
                                        <li>
                                            <Link href="/#">
                                                <a className="language-dropdown-active">
                                                    <i className="fi-rs-world"></i>
                                                    English
                                                    <i className="fi-rs-angle-small-down"></i>
                                                </a>
                                            </Link>
                                            <ul className="language-dropdown">
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            <img
                                                                src="/assets/imgs/theme/flag-fr.png"
                                                                alt=""
                                                            />
                                                            Français
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            <img
                                                                src="/assets/imgs/theme/flag-dt.png"
                                                                alt=""
                                                            />
                                                            Deutsch
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/#">
                                                        <a>
                                                            <img
                                                                src="/assets/imgs/theme/flag-ru.png"
                                                                alt=""
                                                            />
                                                            Pусский
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a
                                                className="language-dropdown-active"
                                                href="#"
                                            >
                                                USD{" "}
                                                <i className="fi-rs-angle-small-down"></i>
                                            </a>
                                            <ul className="language-dropdown">
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-fr.png"
                                                            alt=""
                                                        />
                                                        INR
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-dt.png"
                                                            alt=""
                                                        />
                                                        MBP
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-ru.png"
                                                            alt=""
                                                        />
                                                        EU
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="header-wrap">
                            <div className="logo logo-width-1">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/assets/imgs/theme/reconhece/logo.svg" alt="logo"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-right">
                                <div className="search-style-2">
                                    <Search />
                                </div>

                                <div className="header-action-right">
                                    <div className="header-action-2">

                                        <div className="col-extrato_pontos">
                                            <p>
                                                <span className="txt-saldo">
                                                    <figure>
                                                        <img src="/assets/imgs/icons/icon-carteira.svg"></img>
                                                    </figure>

                                                    <span>
                                                        Saldo
                                                    </span>
                                                </span>

                                                <span className="txt-valor">
                                                    {userInfo?.pointsBalance} <em>pts</em>
                                                </span>
                                            </p>

                                            <Link href="/extract-points" className="text-center w-100 d-table colorSecundary">Meu extrato de Pontos</Link>
                                        </div>

                                        <div className="search-location" hidden>
                                            <form action="#">
                                                <select className="select-active">
                                                    <option>
                                                        Your Location
                                                    </option>
                                                    <option>Alabama</option>
                                                    <option>Alaska</option>
                                                    <option>Arizona</option>
                                                    <option>Delaware</option>
                                                    <option>Florida</option>
                                                    <option>Georgia</option>
                                                    <option>Hawaii</option>
                                                    <option>Indiana</option>
                                                    <option>Maryland</option>
                                                    <option>Nevada</option>
                                                    <option>New Jersey</option>
                                                    <option>New Mexico</option>
                                                    <option>New York</option>
                                                </select>
                                            </form>
                                        </div>

                                        <div className="header-action-icon-2" hidden>
                                            <Link href="/shop-compare">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-compare.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalCompareItems}
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-compare">
                                                <a>
                                                    <span className="lable ml-0">
                                                        Compare
                                                    </span>
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="header-action-icon-2" hidden>
                                            <Link href="/shop-wishlist">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-heart.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalWishlistItems}
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-wishlist">
                                                <span className="lable">
                                                    Wishlist
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="header-action-icon-2 pt-15">
                                            <Link href="userdata">
                                                <a>
                                                    <img src="/assets/imgs/icons/icon-login.svg" />

                                                    <span className="lable ml-0">
                                                        Olá, {userInfo?.name}
                                                    </span>
                                                </a>
                                            </Link>

                                            <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                                <ul>
                                                    <li hidden>
                                                        <Link href="/page-account">
                                                            <a>
                                                                <i className="fi fi-rs-user mr-10"></i>
                                                                My Account
                                                            </a></Link>
                                                    </li>
                                                    <li hidden>
                                                        <Link href="/page-account"><a>
                                                            <i className="fi fi-rs-location-alt mr-10"></i>
                                                            Order Tracking
                                                        </a></Link>
                                                    </li>
                                                    <li hidden>
                                                        <Link href="/page-account"><a>
                                                            <i className="fi fi-rs-label mr-10"></i>
                                                            My Voucher
                                                        </a></Link>
                                                    </li>
                                                    <li hidden>
                                                        <Link href="/shop-wishlist"><a>
                                                            <i className="fi fi-rs-heart mr-10"></i>
                                                            My Wishlist
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/userdata"><a>
                                                            <i className="fi fi-rs-settings-sliders mr-10"></i>
                                                          Meu Perfil
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/login/page-login" onClick={() => logout}><a>
                                                            <i className="fi fi-rs-sign-out mr-10"></i>
                                                            Sair
                                                        </a></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="header-sub-wrap">
                            <nav className="list-a">
                                <ul>
                                    <li>
                                        <div className="main-categori-wrap">
                                            <a
                                                className="categories-button-active"
                                                onClick={handleToggle}
                                            >
                                                <img src="/assets/imgs/icons/icon-categorias.svg" />
                                                <span className="et"> Todas as Categorias </span>

                                            </a>

                                            <div
                                                className={
                                                    isToggled
                                                        ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                                                        : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                                                }
                                            >
                                                <div className="d-flex categori-dropdown-inner">
                                                    <div hidden>
                                                        <CategoryProduct2 />
                                                        <CategoryProduct3 />
                                                    </div>
                                                </div>
                                                <div
                                                    className="more_slide_open"

                                                >
                                                    <div className="d-flex categori-dropdown-inner">
                                                        <CategoryListProducts setToggled={setIsToggled} />
                                                    </div>
                                                </div>
                                                <div className="more_categories">
                                                    <span className="icon"></span>{" "}
                                                    <span className="heading-sm-1">
                                                        Ver Todas...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li hidden>
                                        <Link href="javascript:void(0)">
                                            <a>
                                                <img src="/assets/imgs/icons/icon-cep.svg" />
                                                Informe seu CEP: 01153 000
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav className="list-b">
                                <ul>
                                    <li>
                                        <Link href="/products?">
                                            <a>
                                                <img src="/assets/imgs/icons/icon-ofertas-do-dia.svg" />
                                                Ofertas do Dia
                                            </a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="#parceiros">
                                            <a>
                                                <img src="/assets/imgs/icons/icon-todas-as-lojas.svg" />
                                                Todas as Lojas
                                            </a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/products">
                                            <a>
                                                <img src="/assets/imgs/icons/icon-mais-vendidos.svg" />
                                                Mais Vendidos
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href="/my-phone">
                                            <a>
                                                <img src="/assets/imgs/icons/icon-historico-de-busca.svg" />
                                                Recarga de Celular
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav className="list-a">
                                <ul>
                                    <li>
                                        <Link href="/payment">
                                            <a className="mini-cart-icon">
                                                <img src="/assets/imgs/icons/icon-pagamento.svg" />
                                                Pagamento
                                            </a>
                                        </Link>
                                    </li>

                                    <li hidden>
                                        <Link href="./">
                                            <a className="mini-cart-icon">
                                                <img src="/assets/imgs/icons/icon-favoritos.svg" />

                                                <span className="pro-count blue" hidden>
                                                    {totalCartItems}
                                                </span>

                                                <span>
                                                    Favoritos
                                                </span>
                                            </a>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link href="../ShopCart">
                                            <a className="mini-cart-icon position-relative">
                                                <img src="/assets/imgs/icons/icon-carrinho.svg" />

                                                <span>
                                                    Carrinho
                                                </span>

                                                <span className="pro-count blue">
                                                    {totalCartItems}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        scroll
                            ? "header-bottom header-bottom-bg-color sticky-bar stick"
                            : "header-bottom header-bottom-bg-color sticky-bar"
                    }
                >
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative">
                            <div className="logo logo-width-1 d-block d-lg-none">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/assets/imgs/theme/reconhece/logo.svg" alt="logo"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav d-lg-flex">

                                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                                    <nav>
                                        <ul>
                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc664&label=Informatica">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-informatica.svg" />
                                                        Informatica
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cca51&label=Telefones e Celulares">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-eletroeletronicos.svg" />
                                                        Telefones e Celulares
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals" hidden>
                                                <Link href="/products">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-celular.svg" />
                                                        Celular
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc4c3&label=Esportes e Lazer">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-esportes-e-lazer.svg" />
                                                        Esportes e Lazer
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc60a&label=Games">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-games.svg" />
                                                        Games
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals" hidden>
                                                <Link href="/products">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-cozinha.svg" />
                                                        Cozinha
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cca7e&label=TV e Video">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-tv-e-video.svg" />
                                                        TV e Video
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc6a6&label=Livros">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-livraria-e-papelaria.svg" />
                                                        Livros
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc96d&label=Papelaria">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-eletrodomesticos.svg" />
                                                        Papelaria
                                                    </a>
                                                </Link>
                                            </li>

                                            <li className="hot-deals">
                                                <Link href="/products?Category=62f6c48d4f503264884cc44a&label=Eletrodomesticos">
                                                    <a>
                                                        <img src="/assets/imgs/icons/icon-eletrodomesticos.svg" />
                                                        Eletrodomesticos
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                            <div className="header-action-icon-2 d-lg-none" hidden>
                                <div className="burger-icon burger-icon-white">
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                </div>
                            </div>

                            <div className="header-action-right d-block d-lg-none">

                                <div className="header-action-2">
                                    <div className="header-action-icon-2" hidden>
                                        <Link href="/shop-wishlist">
                                            <a>
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-compare.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalCompareItems}
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2" hidden>
                                        <Link href="/shop-wishlist">
                                            <a>
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-heart.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalWishlistItems}
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2">
                                        <Link href="/shop-cart">
                                            <a className="mini-cart-icon">
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-cart.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalCartItems}
                                                </span>
                                            </a>
                                        </Link>
                                        <div className="cart-dropdown-wrap cart-dropdown-hm2">
                                            <ul>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                <img
                                                                    alt="Evara"
                                                                    src="/assets/imgs/shop/thumbnail-3.jpg"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/shop-grid-right">
                                                                <a>
                                                                    Plain
                                                                    Striola
                                                                    Shirts
                                                                </a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $800.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                <img
                                                                    alt="Evara"
                                                                    src="/assets/imgs/shop/thumbnail-4.jpg"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/shop-grid-right">
                                                                <a>
                                                                    Macbook Pro
                                                                    2022
                                                                </a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $3500.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="shopping-cart-footer">
                                                <div className="shopping-cart-total">
                                                    <h4>
                                                        Total
                                                        <span>$383.00</span>
                                                    </h4>
                                                </div>
                                                <div className="shopping-cart-button">
                                                    <Link href="/shop-cart">
                                                        <a>View cart</a>
                                                    </Link>
                                                    <Link href="/shop-checkout">
                                                        <a>Checkout</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-action-icon-2 d-block d-lg-none">
                                        <div
                                            className="burger-icon burger-icon-white"
                                            onClick={toggleClick}
                                        >
                                            <span className="burger-icon-top"></span>
                                            <span className="burger-icon-mid"></span>
                                            <span className="burger-icon-bottom"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    totalCartItems: state.cart.length,
    totalCompareItems: state.compare.items.length,
    totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);
