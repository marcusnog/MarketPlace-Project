
import SingleProduct from "../ecommerce/SingleProduct";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

SwiperCore.use([Navigation, Autoplay]);

export const FeaturedTabPoints = ({ products }) => {
    return (
        <>
        <Swiper
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={{
                prevEl: ".custom_prev_a",
                nextEl: ".custom_next_a",
            }}
            className="custom-class"
        >
              { products !== undefined ? products?.map((product, i) => (
                <SwiperSlide key={i}>
                  <SingleProduct product={product} />
                </SwiperSlide>
             )) : <span>Sem produtos para exibição</span>}
            </Swiper>

        <div
            className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
        >
            <span className="slider-btn slider-prev slick-arrow custom_prev_a">
                <i className="fi-rs-angle-left"></i>
            </span>
            <span className="slider-btn slider-next slick-arrow custom_next_a">
                <i className="fi-rs-angle-right"></i>
            </span>
        </div>
    </>
    );
};

