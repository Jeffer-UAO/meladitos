import React, { useEffect } from "react";
import NextNprogress from "nextjs-progressbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/global.scss";
import { CartProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <NextNprogress
        color="#FF0"
        startPosition={0.3}
        stopDelayMs={200}
        height={10}
      />
    
      <CartProvider>
      <Component {...pageProps} />
        <ToastContainer          
          autoClose={2000}      
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        

      </CartProvider>
    </>
  );
}
