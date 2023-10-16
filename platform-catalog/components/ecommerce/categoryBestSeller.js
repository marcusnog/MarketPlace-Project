import React from "react";
import { BestSellerCarousel } from '../elements/CarouselBestSeller';
import Loader from "./Loader";

export const CategoryTabBestSeller = ({productsBestSellers, loading}) =>{
    
    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Os Produtos mais Vendidos</h3>
            </div>
            {loading? <Loader /> : (
                <div className="tab-content wow fadeIn animated">
                  <div className="product-grid-4 row">
                      <BestSellerCarousel products={productsBestSellers} />
                  </div>
                </div>
            )}
          
        </>
    );
}
