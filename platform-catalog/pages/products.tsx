import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShowSelect from "../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../components/ecommerce/Filter/SortSelect";
import Breadcrumb2 from "../components/layout/Breadcrumb2";
//import store from "../redux/store";
//import CategoryProduct from "../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../components/ecommerce/Filter/PriceRangeSlider";
//import SizeFilter from "../components/ecommerce/Filter/SizeFilter";
import VendorFilter from "../components/ecommerce/Filter/VendorFilter";
//import Pagination from "../components/ecommerce/Pagination";
import QuickView from "../components/ecommerce/QuickView";
import SingleProduct from "../components/ecommerce/SingleProduct";
import Layout from "../components/layout/Layout";
import { fetchProduct } from "../redux/action/product";
import axios from "axios";
import { useAuthContext } from "../hooks/AuthProvider";
import Loader from "../components/ecommerce/Loader";
//import { useQuery } from "react-query";
//import Loader from "../components/ecommerce/Loader";

type ProductsTypes = {
    length: unknown;
    map(arg0: (item: any, i: any) => JSX.Element): import("react").ReactNode;
    totalItems: number,
    searchProducts: string,
}


const Products = ({ products, productFilters, fetchProduct }) => {

    const [searchProducts, setSearchProducts] = useState<ProductsTypes>();
    const [totalItems, setTotalItems] = useState<number>();
    const { session } = useAuthContext();

    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(Math.ceil(totalItems / itemsPerPage));

    const Router = useRouter(),
        storeId = Router.query.StoreId,
        storeName = Router.query.StoreName,
        searchTerm = Router.query.search,
        category = Router.query.Category,
        minValue = Router.query.minValue,
        maxValue = Router.query.maxValue

        useEffect(() => {
            // Simulando um carregamento demorado
            setTimeout(() => {
              setLoading(false); // Assumindo que o conteúdo foi carregado
            }, 2000); // Simula um carregamento de 2 segundos
          }, []);

    useEffect(() => {
        setCurrentPage(1)
    }, [Router])

    const findProductsByFilters = (storeId, searchTerm, category, minValue, maxValue) => {

        setLoading(true);

        const api = "http://20.226.77.29/platform-catalog-desktop-client/api/Home/FindProducts";

        const productFilter = {
            StoreId: storeId,
            ProductName: searchTerm,
            Category: category,
            StartValue: minValue,
            EndValue: maxValue
        }

        axios.post(api, productFilter, {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            },
            params: {
                page: currentPage,
                pagesize: itemsPerPage
            }
        })
            .then(response => {
                setTotalItems(response?.data?.metadata?.totalItems);
                setSearchProducts(response?.data?.data);
            }).catch(err => {
                if (err?.response?.status === 400) {
                    setTotalItems(0);
                    // setSearchProducts([]);
                } else {

                }
            })
            .finally(() => setLoading(false));

    };

    useEffect(() => {
        findProductsByFilters(storeId, searchTerm, category, minValue, maxValue);
        createPagination();
        window.scrollTo({ top: 0 });
    }, [storeId, searchTerm, category, itemsPerPage, currentPage, searchProducts?.length, minValue, maxValue]);

    const createPagination = () => {

        var arr = [];

        if (searchProducts !== undefined && searchProducts.length as number > 0) {
            arr = new Array(Math.ceil(totalItems / itemsPerPage))
                // .fill()
                .map((_, idx) => idx + 1);
        }

        setPagination(arr);
        setPages(Math.ceil(totalItems / itemsPerPage));
    };

    // const startIndex = currentPage * itemsPerPage - itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const getPaginatedProducts = searchProducts?.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage;
    let end = start + itemsPerPage;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    return (
        <>

            <Layout noBreadcrumb="d-none" parent="" sub="" subChild="" headerStyle="">
                {!loading ? (
                <section className="">
                    <div className="container mb-30 position-relative mt-30  pt-30">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                                <div className="shop-product-fillter">
                                    <div className="sort-by-product-area">
                                        <div className="sort-by-cover mr-10">
                                            <ShowSelect
                                                selectChange={selectChange}
                                                showLimit={itemsPerPage}
                                            />
                                        </div>
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                    </div>
                                </div>

                                <div className="row product-grid">
                                    <div className="mb-30">
                                        <p className="d-flex gap-1">
                                            <strong className="text-brand">{totalItems}</strong>
                                            <span> Produtos Encontrados!</span> 
                                        </p>
                                    </div>

                                    {searchProducts?.length === 0 && (
                                        <h3>Nenhum produto encontrado </h3>
                                    )}

                                    {searchProducts?.map((item, i) => (
                                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-30" key={i} >
                                            <SingleProduct product={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                {/*<div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        Category
                                    </h5>
                                    <CategoryProduct />
                                </div> */}

                                <div className="sidebar-widget price_range range mb-30">
                                    <h5 >Preço</h5>
                                    <hr className="mb-50" />
                                    <PriceRangeSlider />
                                    <hr className="mt-50" />
                                    <div className="list-group">
                                        <div className="list-group-item mb-10 ">
                                            <label className="fw-400">
                                                Filtre por Valor
                                            </label>
                                            <VendorFilter />
                                            {/*<label className="fw-900 mt-15">
                                                Item Condition
                                            </label>
                                            <SizeFilter />*/}
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                ) : (
                    <Loader />
                )}

                {/* <WishlistModal /> */}
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                <QuickView />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <Search />
                        </div>
                        <div className="col-xl-6">
                            <SideBarIcons />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-6">
                            <CategoryProduct />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3">
                            
                        </div>
                        <div className="col-md-9">
                            

                            

                            
                        </div>
                    </div>
                </div> */}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProduct,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);

