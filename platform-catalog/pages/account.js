import Link from "next/link";
import { useHomeDataContext } from "../hooks/HomeDataProvider";

const AbaMeuPerfil = ({ }) => {
    const { userInfo } = useHomeDataContext();

    return (
        <>
            <div className="col-xl-3 position-relative z-3">
                <ul className="col-list_order colorBorderPrimay">
                    {userInfo?.internCampaign ? (
                        <div>
                            <li >
                                <Link href="/userdata">
                                    <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center"><span>Perfil</span></a>
                                </Link>
                                {/* <figure>
                                    <img src="../assets/imgs/icons/icon-user.svg" />
                                </figure> */}
                            </li>

                            <li>
                                <Link href="order-list">
                                    <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center ">
                                        <span>Meus Pedidos</span>

                                    </a></Link>
                                {/* <figure>
                                        <img src="../assets/imgs/icons/icon-meus-pedidos.svg" />
                                    </figure> */}
                            </li>

                            <li hidden>
                                <Link href="payment">
                                    <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center">
                                        <span>Meus Pagamentos</span>

                                    </a>
                                </ Link>
                                {/* <figure>
                                        <img src="../assets/imgs/icons/dolar.svg" />
                                </figure> */}
                            </li>

                            <li hidden>
                                <Link href="my-card">
                                    <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center">
                                        <span>Meu Cartão</span>

                                    </a>
                                </Link>
                                {/* <figure>
                                        <img src="../assets/imgs/icons/icon-meu-cartao.svg" />
                                    </figure> */}
                            </li>
                        </div>
                    ) : null}
                    <li hidden>
                        <Link href="my-phone">
                            <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center">
                                <span>Recarga de Celular</span>

                            </a>
                        </Link>
                        {/* <figure>
                            <img src="../assets/imgs/icons/icon-user.svg" />
                        </figure> */}
                    </li>

                    {/* <li>
                        <a href="favorites" className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center">
                            <span>Meus Favoritos</span>
                            <figure>
                                <img src="../assets/imgs/icons/icon-favoritos.svg" />
                            </figure>
                        </a>
                    </li> */}
                    {userInfo?.internCampaign ? (
                        <li>
                            <Link href="extract-points">
                                <a className="pt-10 pb-10 pl-20 pr-20 d-flex border-bottom colorSecundary justify-content-between align-items-center">
                                    <span>Extrato de Pontos</span>

                                </a>
                            </Link>
                            {/* <figure>
                                <img src="../assets/imgs/icons/icon-extrato.svg" />
                            </figure> */}
                        </li>
                    ) : null}
                </ul>
            </div>
        </>
    );
};

export default (AbaMeuPerfil);