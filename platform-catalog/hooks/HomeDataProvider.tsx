import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import store from "../redux/store";
import { useReconhece } from "./useReconhece";
import { useAuth } from "./useAuth";
import { Session } from "inspector";
import router from "next/router";
import { toast } from "react-toastify";


interface UserInfoSession {
    name: string;
    pointsBalance: string;
    internCampaign: boolean;
}[];

type StoresSession = {
    label: string;
    value: string;
}[];

type CategoriesSession = {
    label: string;
    value: string;
}[];

type ProductsBestSellersSession = {
    productId: string;
    id: string;
    displayName: string;
    listPrice: string;
    salePrice: string;
    storeId: string;
    available: string;
}[];

type ProductsOnSaleSession = {
    productId: string;
    id: string;
    displayName: string;
    listPrice: string;
    salePrice: string;
    storeId: string;
    available: string;
}[];

type ProductsWithinPriceSession = {
    productId: string;
    id: string;
    displayName: string;
    listPrice: string;
    salePrice: string;
    storeId: string;
    available: string;
}[];

type HomeDataCxt = {
    userInfo?: UserInfoSession;
    stores?: StoresSession;
    categories?: CategoriesSession;
    productsBestSellers?: ProductsBestSellersSession;
    productsOnSale?: ProductsOnSaleSession;
    productsWhitinPrice?: ProductsWithinPriceSession;
    loading?: boolean
};

const HomeDataContext = createContext<HomeDataCxt>({});
export const useHomeDataContext = () => useContext(HomeDataContext);

export const HomeDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [userInfo, setUserInfo] = useState<UserInfoSession>();
    const [stores, setStores] = useState<StoresSession>();
    const [categories, setCategories] = useState<CategoriesSession>();
    const [productsBestSellers, setProductsBestSellers] = useState<ProductsBestSellersSession>();
    const [productsOnSale, setProductsOnSale] = useState<ProductsOnSaleSession>();
    const [productsWhitinPrice, setProductsWhitinPrice] = useState<ProductsWithinPriceSession>();

    const { response, fetchRoute, loading } = useAuth({
        route: "home/config",
        method: "get",
    });

    useEffect(() => {
        fetchRoute()
    }, []);


    useEffect(() => {
        if (response?.data?.data?.userInfos) {
            setUserInfo(response?.data?.data?.userInfos);
        }

        if (response?.data?.data?.stores) {
            setStores(response?.data?.data?.stores);
        }

        if (response?.data?.data?.categories) {
            setCategories(response?.data?.data?.categories);
        }

        if (response?.data?.data?.productsBestSellers) {
            setProductsBestSellers(response?.data?.data?.productsBestSellers);
        }

        if (response?.data?.data?.productsOnSale) {
            setProductsOnSale(response?.data?.data?.productsOnSale);
        }

        if (response?.data?.data?.productsWithinPrice) {
            setProductsWhitinPrice(response?.data?.data?.productsWithinPrice);
        }
    }, [response?.data]);

    return (
        <HomeDataContext.Provider value={{ userInfo, stores, categories, productsBestSellers, productsOnSale, productsWhitinPrice, loading }}>
            {children}
        </HomeDataContext.Provider>
    );
};