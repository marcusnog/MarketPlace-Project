import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";

const MyCard = ({ }) => {
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
                                                <a href="javascript:void(0)" title="Carrinho">Meus Favoritos</a>
                                            </li>

                                            <li>
                                                <span>Meus Favoritos</span>
                                            </li>
                                        </ul>
                                    </nav>

                                    <h2>Meus Favoritos</h2>
                                </header>

                                <div className="position-relative w-100 overflow-hidden">
                                    <div className="w-100 d-flex justify-content-between">
                                        <div className="border p-25 border rounded col-md-12">
                                           
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