import Link from "next/link";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Autoplay]);

const CategorySlider2 = () => {
    var data = [
        {
            id: 1,
            title: "Informatica",
            img: "icon-informatica.svg",
            link: "/products?Category=62f6c48d4f503264884cc664&label=Informática"
            
        },
        {
            id: 2,
            title: "Eletroeletrônicos",
            img: "icon-eletroeletronicos.svg",
            link:"/products?Category=62f6c48d4f503264884cc477&label=Eletroportáteis"
            
        },
        {
            id: 3,
            title: "Celular",
            img: "icon-celular.svg",
            link: "/products?Category=62f6c48d4f503264884cca51&label=Telefones%20e%20Celulares"
            
        },
        {
            id: 4,
            title: "Esportes e Lazer",
            img: "icon-esportes-e-lazer.svg",
            link: "/products?Category=62f6c48d4f503264884cc4c3&label=Esporte+e+Lazer"
            
        },
        {
            id: 5,
            title: "Games",
            img: "icon-games.svg",
            link: "/products?Category=62f6c48d4f503264884cc60a&label=Games"
            
        },
        {
            id: 6,
            title: "Cozinha",
            img: "icon-cozinha.svg",
            link: "/products?Category=62f6c48d4f503264884cc44a&label=Eletrodomesticos"

            
        },
        {
            id: 7,
            title: "TV e Video",
            img: "icon-tv-e-video.svg",
            link: "/products?Category=62f6c48d4f503264884cca7e&label=TV%20e%20Video"
            
        },
        {
            id: 8,
            title: "Livraria e Papelaria",
            img: "icon-livraria-e-papelaria.svg",
            link: "/products?Category=62f6c48d4f503264884cc4c3&label=Esporte+e+Lazer"

        },
    ];
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={15}
                slidesPerGroup={1}
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
                        spaceBetween: 10,
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerGroup: 2,
                        slidesPerView: 8,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                navigation
                //modules={[Pagination, Navigation]}
                //className="mySwiper"
                >
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                               <Link href={item.link}>
                                    <a>
                                        <img
                                            src={`/assets/imgs/icons/${item.img}`}
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </figure>
                            <h6>
                               <Link href={item.link}>
                                    <a>{item.title}</a>
                                </Link>
                            </h6>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default CategorySlider2;
