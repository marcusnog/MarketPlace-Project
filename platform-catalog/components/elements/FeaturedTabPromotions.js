
import SingleProduct from "../ecommerce/SingleProduct";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

SwiperCore.use([Navigation, Autoplay]);

export const FeaturedTabPromotions = ({ products }) => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                breakpoints={{
                // when window width is >= 576px
                    576: {
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 1024px
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerGroup: 2,
                        slidesPerView: 6,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                navigation
                //modules={[Pagination, Navigation]}
                //className="mySwiper"
                >
                  { products !== undefined ? products?.map((product, i) => (
                    <SwiperSlide key={i}>
                      <SingleProduct product={product} />
                    </SwiperSlide>
                 )) : <span>Sem produtos para exibição</span>}
                </Swiper>
        </>
    );
};

