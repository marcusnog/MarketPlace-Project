import React from "react";
import Link from "next/link"
import { useHomeDataContext } from "../../hooks/HomeDataProvider";
import { useRouter } from "next/router";

export const Footer = () => {
    const { stores } = useHomeDataContext();
    const router = useRouter();

    const findProductsByStore = (storeId, storeName) => {
        // preventDefault();
        router.push({
            pathname: "/products",
            query: {
                StoreId: storeId, //
                StoreName: storeName
            },
        });
    };

    return (
        <>
            <footer className="footer">
                <div className="bgPrimary">
                    <div className="container">
                        <div className="col-section_a">
                            <div className="col-flex-rodape col-flex-rodape_a" hidden>
                                <h2>Lojas Parceiras</h2>

                                <ul className="">
                                    {stores?.slice(0, 12).map((item, i) => (                                        
                                            <li key={item.value} onClick={() => findProductsByStore(item.value, item.label)}>
                                                <figure>
                                                    <img src={`../assets/imgs/shop/${item.value}.png`} alt={item.label} />
                                                </figure>
                                            </li>                                        
                                    ))}
                                </ul>



                                <a href="">Confira todas as lojas</a>
                            </div>

                            <div className="col-flex-rodape col-flex-rodape_b">
                                <h2>Formas de Pagamento</h2>

                                <figure>
                                    <img src="/assets/imgs/theme/reconhece/logos.svg" />
                                </figure>

                                <h2>Certificados de Segurança</h2>

                                <figure>
                                    <img src="/assets/imgs/theme/reconhece/certificado-seguranca.svg" />
                                </figure>
                            </div>

                            <div className="col-flex-rodape col-flex-rodape_c">
                                <p>Formas de pagamento: cartões de crédito americanas.com, visa, aura, mastercard, diners club, hiper, american express; boleto bancário; débito online itaú, banco do brasil, bradesco e visa electron.</p>
                                <p>Preços e condições de pagamento exclusivos para compras via internet. Ofertas válidas na compra de até 10 peças de cada produto por cliente, até o término dos nossos estoques para internet. Caso os produtos apresentem divergências de valores, o preço válido é o da sacola de compras.</p>
                                <p>Vendas sujeitas a análise e confirmação de dados.</p>

                                <p>Fale conosco: https://www.reconhece.vc/central-de-atendimento/fale-conosco/</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bgSecundary col-section_b">
                    <figure>
                        <img src="/assets/imgs/theme/reconhece/logo-rodape.svg" />
                    </figure>

                    <p>® Reconhece.vc – CNPJ: 00.000.000/0000-00 <br />

                        Todos os direitos reservados</p>

                    <nav>
                        <ul>
                            <li>
                                <a href="">
                                    Condições de uso  |
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    Notificação de Privacidade   |
                                </a>
                            </li>


                            <li>
                                <a href="">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    );
};

// export default Footer;
