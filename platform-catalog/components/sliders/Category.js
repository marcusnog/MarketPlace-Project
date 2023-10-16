import React, {} from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { connect } from "react-redux";
import { updateProductCategory } from "./../../redux/action/productFiltersAction";
import { useRouter } from "next/router";
import ReactLoading from 'react-loading';

SwiperCore.use([Navigation, Autoplay]);

const CategorySlider = ({stores , loading}) => {
  
    const router = useRouter();
    
    const findProductsByStore = (storeId, storeName) => {
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
            {loading ? (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <ReactLoading type={'spin'} color={'#0088FF'} height={50} width={50} />
                </div>
            ): (
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    slidesPerGroup={5}
                    breakpoints={{
                    // when window width is >= 576px
                        576: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px
                        1024: {
                            spaceBetween: 12,
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerGroup: 12,
                            slidesPerView: 10,
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation
                    //modules={[Pagination, Navigation]}
                    //className="mySwiper"
                    >
                    {stores?.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={`card-2 `} onClick={() => findProductsByStore(item.value, item.label)}>
                                <a>
                                    <figure>
                                        <img src={`assets/imgs/shop/${item.value}.png`} alt={item.label} />
                                    </figure>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
};

export default connect(null, { updateProductCategory })(CategorySlider);
