import React, { useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import reconhece from "../public/assets/css/themes/reconhece";
import GlobalStyle from "../public/assets/css/global";

import "react-input-range/lib/css/index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-responsive-modal/styles.css";
import { BrowserRouter, Routes, RouterProvider } from "react-router-dom";
// Swiper Slider
import "swiper/css";
import "swiper/css/navigation";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import store from "../redux/store";
import Preloader from "../components/elements/Preloader";
import { AuthProvider } from "../hooks/AuthProvider";
import { HomeDataProvider } from "../hooks/HomeDataProvider";
import { ShippingProvider } from '../hooks/ShippingProvider'
import { UserProvider } from '../hooks/UserProvider'
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./index";


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []);

  const queryClient = new QueryClient();

  return (
    <>
      {!loading ? (

        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>
              <ShippingProvider>           
                  <ThemeProvider theme={reconhece}>
                    <Provider store={store}>
                      <HomeDataProvider>
                        
                        <GlobalStyle />
                        <StorageWrapper>
                          <Component {...pageProps} />
                          <ToastContainer />
                        </StorageWrapper> 
                      </HomeDataProvider>
                    </Provider>
                  </ThemeProvider>
              </ShippingProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>

      ) : (
        <Preloader />
      )}
    </>
  );
}

export default MyApp;
