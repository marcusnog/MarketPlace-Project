import { useEffect, useState } from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import axios from "axios";
import { useAuthContext } from "../../hooks/AuthProvider";
import { useRouter } from "next/router";
import Footer from "../../components/layout/Footer";

const ProductId = () => {
    useEffect(() => {
        req()
    },[])

    const { session } = useAuthContext();
    const [product, setProduct] = useState();

    const Router = useRouter(),
        IdProduct = Router.query.slug

    const api = "http://20.226.77.29/platform-catalog-desktop-client/api/Home/ProductDetails";

    const productFilter = {
        IdProduct: Router.query.slug
    }

    const req = () =>{

        
        axios.post(api, productFilter, {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setProduct(response?.data?.data);
        }).catch(err => {
            if (err?.response?.status === 400) {
               
            } else {
                
            }
        })
        .finally();
    }
        
        return (
            <>
            
            <Layout parent="Home" sub="Shop" subChild={product?.displayName}>
            <div className="container">
            {
                product !== undefined && product !== null ? (
                <ProductDetails product={product} />
                ): ""
            }
            </div>
            
        </Layout>
        </>
    );
};


export default ProductId;
