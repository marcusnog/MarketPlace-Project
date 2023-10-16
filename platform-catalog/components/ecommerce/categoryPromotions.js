import React from "react";
import { FeaturedTabPromotions } from "../elements/FeaturedTabPromotions";
import Loader from "./Loader";


export const CategoryTabPromotions = ({productsOnSale, loading}) => {
    
    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Promoções</h3>
            </div>
            {loading? <Loader />: (
                <div className="tab-content wow fadeIn animated">
                    <div className="product-grid-4 row">
                        <FeaturedTabPromotions products={productsOnSale} />
                    </div>
                </div>
            )}
        
        </>
    );
}
