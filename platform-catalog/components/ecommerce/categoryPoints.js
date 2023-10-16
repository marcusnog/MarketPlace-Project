
import SingleProduct from "./SingleProduct";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Autoplay]);

const FeaturedTab = ({ products }) => {

    return (
        <>
            <Swiper
                spaceBetween={24}
                grid={{
                    rows: 2
                }}
                loop={false}
                navigation={{
                    prevEl: ".custom_prev_f",
                    nextEl: ".custom_next_f"
                }}
                className="custom-class"
                breakpoints={{
                    480: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 4
                    },
                }}
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

export default FeaturedTab;
