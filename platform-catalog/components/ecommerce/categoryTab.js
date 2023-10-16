import React, { useEffect } from "react";
import Loader from "../ecommerce/Loader";
import { CarouselPoints } from "../elements/CarouselPoints";

export const CategoryTabPoints = ({productsWhitinPrice, loading}) => {
    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Produtos que cabem nos seus pontos</h3>
            </div>

                {loading? <Loader/> : (
                    <div className="tab-content">
                        <div className="product-grid-4 row">
                            <CarouselPoints products={productsWhitinPrice} />
                        </div>
                    </div>
                )}
        </>
    );
}
