import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { shippingContext } from "../../hooks/ShippingProvider";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import { QueryCache } from "react-query";
import { useRouter } from "next/router";
import Loader from "./Loader";
import Preloader from "../elements/Preloader";

const ProductDetails = ({
  product,
  cartItems,
  addToCompare,
  addToCart,
  addToWishlist,
  increaseQuantity,
  decreaseQuantity,
  quickView,
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [LoadingCep, setLoadingCep] = useState(false);
  const {
    cep,
    address,
    setCep,
    cepAddress,
    shipping,
    totalShipping,
    shippError,
    calcShipp,
    setTotalPrice,
    buscarEndereco,
    LoadingCep
  } = shippingContext();

  useEffect(() => {
    if (shipping) {
      calcShipp(cartItems);
    }
  }, [cartItems]);

  const apertou = () => {
    
    setTimeout(() => {
      setLoadingCep(true);
    }, 1000);
  }


  const handleCart = (product) => {
    addToCart(product);
    toast("Produto adicionado ao carrinho!");
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast("Added to Compare list !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist !");
  };

  const inCart = cartItems.find((cartItem) => cartItem.id === product?.id);
  // const [cep, setCep] = useState("");
  const [productShipping, setProductShipping] = useState(null);
  const [cepError, setCepError] = useState(false);
  const [productSelected, setProductSelected] = useState(product?.skus[0]);

  // const calcShipp = (e) => {
  //   e.preventDefault();
  //   if (!cep) {
  //     setProductShipping(null);
  //     return setCepError(true);
  //   }
  //   setCepError(false);

  // const productShipp = {
  //   address: `Rua Test - até 609/610, Bairro, São Bernardo do Campo/SP, ${cep}`,
  //   shippingPrice: 10,
  //   store: product?.storeName,
  // };

  // setProductShipping(productShipp);

  const filteredColors = (product) => {
    if ((cores = cores.length > 1)) {
      product?.skus?.map((item, i) =>
        item?.attributes?.filter((cor) => cor.description === "Cor")
      );
    } else {
      productSelected?.attributes.filter((cor) => cor.description);
    }
  };

  useEffect(() => {
    // Simulando um carregamento demorado
    setTimeout(() => {
      setLoading(false); // Assumindo que o conteúdo foi carregado
    }, 2000); // Simula um carregamento de 2 segundos
  }, []);

  const changeSkuProduct = (idSku) => {
    setLoading(true);

    // Perform some time-consuming operation
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    let productSelectedAux = product?.skus.filter((item) => item.id === idSku);
    setProductSelected(productSelectedAux[0]);
  };

  const variations = [];

  product?.skus?.map((item, i) =>
    item?.attributes?.map((atr, i) => variations.push(atr))
  );

  const voltagens = [];
  const tamanho = [];
  const cores = [];
  const sabores = [];

  variations?.map((item, i) => {
    if (item.description === "Voltagem") {
      voltagens.push(item.value);
    }

    if (item.description === "Tamanho") {
      tamanho.push(item.value);
    }

    if (item.description === "Cor") {
      cores.push(item.value);
    }

    if (item.description === "Sabor") {
      sabores.push(item.value);
    }
  });

  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          {!loading ? (
            <div className="row flex-row-reverse">
              <div className="col-xl-12 col-lg-12 m-auto">
                <div className="product-detail accordion-detail">
                  <div className="row mb-50  mt-30">
                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                      <div className="detail-gallery">
                        <span className="zoom-icon">
                          <i className="fi-rs-search"></i>
                        </span>

                        <div className="product-image-slider">
                          <ThumbSlider product={productSelected} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info  pr-30 pl-30">
                        <h2 className="title-detail">{product?.displayName}</h2>
                        <hr />
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color">
                            <div className="d-flex gap-3">
                              <p>
                                <span className="fw-300">REF:</span>
                                <strong>
                                  {" "}
                                  {productSelected?.storeItemCode}{" "}
                                </strong>
                              </p>

                              <p>
                                <span className="fw-300">Modelo:</span>
                                <strong> {productSelected?.model} </strong>
                              </p>

                              <p>
                                <span className="fw-300">Loja Parceira:</span>
                                <strong> {product?.storeName}</strong>
                              </p>
                            </div>

                            <span className="current-price text-brand">
                              {productSelected?.salePrice}
                              <small>pontos</small>
                            </span>
                          </div>
                        </div>

                        <hr />

                        <div className="col-flex-collum">
                          <div>
                            <div className="attr-detail attr-size mb-30 w-100">
                              {voltagens != null && voltagens.length > 0 ? (
                                <>
                                  <strong className="mr-10">Voltagem</strong>
                                  <ul className="list-filter size-filter font-small">
                                    {product?.skus?.map((item, i) =>
                                      item?.attributes?.map((atr, a) => (
                                        <li
                                          className={
                                            item?.id === productSelected?.id
                                              ? "active"
                                              : ""
                                          }
                                          key={i}
                                          onClick={() =>
                                            changeSkuProduct(item?.id)
                                          }
                                        >
                                          <a>{atr.value}</a>
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </>
                              ) : (
                                ""
                              )}

                              {tamanho != null && tamanho.length > 0 ? (
                                <>
                                  <strong className="mr-10">Tamanho</strong>
                                  <ul className="list-filter size-filter font-small">
                                    {product?.skus?.map((item, i) =>
                                      item?.attributes
                                        ?.filter(
                                          (tamanho) =>
                                            tamanho.description === "Tamanho"
                                        )
                                        .map((atr, a) => (
                                          <li
                                            className={
                                              item.id === productSelected?.id
                                                ? "active"
                                                : ""
                                            }
                                            key={i}
                                            onClick={() =>
                                              changeSkuProduct(item?.id)
                                            }
                                          >
                                            <a>{atr.value}</a>
                                          </li>
                                        ))
                                    )}
                                  </ul>
                                </>
                              ) : (
                                ""
                              )}
                              {sabores != null && sabores.length > 0 ? (
                                <>
                                  <strong className="mr-10">Sabor</strong>
                                  <ul className="list-filter size-filter font-small">
                                    {product?.skus?.map((item, i) =>
                                      item?.attributes?.map((atr, a) => (
                                        <li
                                          className={
                                            item.id === productSelected?.id
                                              ? "active"
                                              : ""
                                          }
                                          key={i}
                                          onClick={() =>
                                            changeSkuProduct(item?.id)
                                          }
                                        >
                                          <a>{atr.value}</a>
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </>
                              ) : (
                                ""
                              )}

                              {cores != null && cores.length > 0 ? (
                                <>
                                  <strong className="mr-10 mt-20">Cor</strong>
                                  <div className="attr-detail attr-color mb-30 ">
                                    <ul className="list-filter color-filter">
                                      {product?.skus?.map((item, i) =>
                                        item?.attributes
                                          ?.filter(
                                            (cor) => cor.description === "Cor"
                                          )
                                          .map((atr, a) => (
                                            <li
                                              className={
                                                item.id === productSelected?.id
                                                  ? "active"
                                                  : ""
                                              }
                                              key={i}
                                              onClick={() =>
                                                changeSkuProduct(item?.id)
                                              }
                                            >
                                              <a>
                                                <span
                                                  className={`product-color-${atr.value}`}
                                                ></span>
                                              </a>
                                            </li>
                                          ))
                                      )}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="d-flex">
                              <div className="d-flex gap-3 align-items-center">
                                <span className="fs-6">Quantidade:</span>

                                <div className="attr-detail attr-size">
                                  <div className="detail-extralink">
                                    <div className="detail-qty border radius">
                                      <a
                                        onClick={(e) =>
                                          !inCart
                                            ? setQuantity(
                                                quantity > 1 ? quantity - 1 : 1
                                              )
                                            : decreaseQuantity(product?.id)
                                        }
                                        className="qty-down"
                                      >
                                        <i className="fi-rs-angle-small-down"></i>
                                      </a>

                                      <span className="qty-val">
                                        {inCart?.quantity || quantity}
                                      </span>

                                      <a
                                        onClick={() =>
                                          !inCart
                                            ? setQuantity(quantity + 1)
                                            : increaseQuantity(product.id)
                                        }
                                        className="qty-up"
                                      >
                                        <i className="fi-rs-angle-small-up"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="detail-extralink">
                            <div className="product-extra-link2">
                              <button
                                onClick={(e) =>
                                  handleCart({
                                    ...product,
                                    quantity: quantity || 1,
                                  })
                                }
                                className="button button-add-to-cart"
                              >
                                Adicionar ao Carrinho
                              </button>

                              <button
                                hidden
                                onClick={(e) =>
                                  handleCart({
                                    ...product,
                                    quantity: quantity || 1,
                                  })
                                }
                                className="button button-purchase"
                              >
                                Comprar
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="col-calc-frete">
                            <p>Busque seu endereço por CEP e calcule o frete</p>
                            {!shipping && (
                            <form className="col-md-7 col-sm-12 col-xs-12 d-flex gap-2">
                              <div className="col-md-8 col-xs-12">
                                <input
                                  type="number"
                                  value={cep}
                                  className="form-control bg-light mr-15 rounded border-secondary"
                                  placeholder="00000-000"
                                  onChange={(e) => setCep(e.target.value)}
                                />
                              </div>
                              <button
                                onClick={() => calcShipp(cartItems)}
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-addon1"
                              >
                                Buscar
                              </button>
                            </form>
                            )}
                          </div>
                          {cepError && (
                            <div className="text-danger">
                              Informe um CEP válido
                            </div>
                          )}
                          
                          {! LoadingCep ? 
                          
                          shipping && 
                          (
                            <div>
                              <a href="" className="mb-10 d-flex">
                                Fazer nova consulta
                              </a>

                              <p>{address?.cep}</p>
                              <p>{address?.logradouro}</p>
                              <p>{address?.bairro}</p>
                              <p>{address?.localidade}</p>
                              <p>{address?.uf}</p>

                              <hr className="border-secondary border-top" />

                              <h6 className="text-brand fw-900">Frete</h6>

                              <div>
                                {shipping?.map((item, index) => (
                                  <p key={index}>
                                    {item.store}: {item.priceShipping} Pts.
                                  </p>
                                ))}
                              </div>

                              <p className="fw-900 mt-10 font-xl">
                                Total do frete: {totalShipping} Pts.
                              </p>
                            </div>
                          ) : (
                            <Loader />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {quickView ? null : (
                    <>
                      <ProductTab product={product} />

                      <div className="row mt-60" hidden>
                        <div className="col-12">
                          <h3 className="section-title style-1 mb-30">
                            Produtos Relacionados
                          </h3>
                        </div>
                        <div className="col-12">
                          <div className="row related-products position-relative">
                            <RelatedSlider />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cart,
});

const mapDispatchToProps = {
  addToCompare,
  addToWishlist,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
