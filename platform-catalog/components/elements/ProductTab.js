import { getDisplayName } from "next/dist/shared/lib/utils";
import React, { useState } from "react";

const ProductTab = ({product}) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const visible = product?.attributes?.length > 0 ? true : false; 

    return (
        <div className="product-info">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Descrição
                        </a>
                    </li>
                    {
                    visible && (<li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="caracteristicas" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            Características
                        </a>
                    </li>)
                    }
                    {
                    visible && (
                    <li className="nav-item">
                        <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} id="especificacaoTecnica" data-bs-toggle="tab" onClick={() => handleOnClick(3)}>
                            Especificações Técnicas
                        </a>
                    </li>)
                    }
                </ul>

                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        {product?.description}
                    </div>
                    
                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="caracteristicas">
                        <table className="table m-0 table-striped border-0">
                            <tbody>
                                
                                {
                                product?.attributes?.map((item, i) => (
                                    item.type === "SKU_Caracteristica" && (
                                    <>
                                        <tr className="stand-up">
                                    <td className="align-middle">{item?.description}</td>
                                    <td className="align-middle">
                                        {item?.value}
                                    </td>
                                </tr>
                                </>
                                )))
                              }
                            </tbody>
                        </table>
                    </div>

                    <div className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"} id="especificacaotecnica">
                        <table className="table m-0 table-striped border-0">
                            <tbody>
                                {
                                product?.attributes?.map((item, i) => (
                                    item.type === "Produto_EspecificacaoTecnica" && (
                                    <>
                                        <tr className="stand-up">
                                    <td className="align-middle">{item?.description}</td>
                                    <td className="align-middle">
                                        {item?.value}
                                    </td>
                                </tr>
                                </>
                                )))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
