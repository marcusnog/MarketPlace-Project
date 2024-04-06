import React, { useEffect } from "react";
import { CategoryTabPoints } from "../components/ecommerce/categoryTab";
import Banner5 from "../components/elements/Banner5";
import IntroPopup from "../components/elements/IntroPopup";
import Layout from "../components/layout/Layout";
import CategorySlider from "../components/sliders/Category";
import CategorySlidesList from "../components/sliders/Category2";
import Intro1 from "../components/sliders/Intro1";
import { useHomeDataContext } from "../hooks/HomeDataProvider";
import { CategoryTabBestSeller } from "../components/ecommerce/categoryBestSeller";
import { CategoryTabPromotions } from "../components/ecommerce/categoryPromotions";
import { useAuthContext } from "../hooks/AuthProvider";
import router from "next/router";
import { toast } from "react-toastify";

//import { LazyLoadImage } from "react-lazy-load-image-component";

function Home() {
    const { stores, productsBestSellers, productsOnSale, productsWhitinPrice, loading: configLoading } = useHomeDataContext();
    const { session, setSession} = useAuthContext();
    // useEffect(() => {
    //     const removerToken = () => {
    //       setSession(undefined);
    //     };
    
    //     const timeoutId = setTimeout(removerToken, 30 * 60 * 1000); // 30 minutos em milissegundos
    
    //     return () => {
    //       clearTimeout(timeoutId); // Limpa o timeout se o componente for desmontado antes do tempo limite
    //     };
    //   }, [session]);

    //   useEffect(() => {
    //     if (session === undefined) {
    //       toast.success('Token expirado, por favor refaça o login para continuar', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
          
    //       router.push({
    //         pathname: "/login/page-login",
    //         // pathname: "https://www.reconhece.vc/"
    //     });
    //     }
    //   },[]);

    // console.log("autenticado:", session);

    return (
        <>
            <IntroPopup />
            <Layout noBreadcrumb="d-none" parent="" sub="" subChild="" headerStyle="">
                <section className="home-slider position-relative">
                    <div className="container">
                        <div className="home-slide-cover mt-30">
                            <Intro1 />
                        </div>
                    </div>
                </section>

                <section id="parceiros" className="popular-categories section-padding">
                    <div className="container wow animate__fadeIn animate__animated">
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-10-columns" id="carausel-10-columns">
                                <CategorySlider stores={stores} loading={configLoading} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="banners mb-25">
                    <div className="container">
                        <div className="row">
                            <Banner5 />
                        </div>
                    </div>
                </section>

                <section className="product-tabs section-padding position-relative">
                    <div className="container">
                        <div className="col-lg-12">
                            <CategoryTabPoints productsWhitinPrice={productsWhitinPrice?.slice(0, 20)} loading={configLoading} />
                        </div>
                    </div>
                </section>

                <section className="popular-categories popular-hiden section-padding">
                    <div className="container wow animate__fadeIn animate__animated">
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-11-columns" id="carausel-1-columns">
                                <CategorySlidesList />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="promocoes" className="product-tabs section-padding position-relative">
                    <div className="container">
                        <div className="col-lg-12">
                            <CategoryTabPromotions productsOnSale={productsOnSale?.slice(0, 20)} loading={configLoading} />
                        </div>
                    </div>
                </section>

                <section id="productsBestSellers" className="product-tabs section-padding position-relative">
                    <div className="container">
                        <div className="col-lg-12">
                            <CategoryTabBestSeller productsBestSellers={productsBestSellers} loading={configLoading} />
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}


export default Home;