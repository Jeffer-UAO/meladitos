import React, { useEffect, useState } from "react";
import { Categories } from "@/api/category";
import { Products } from "@/api/products";
import {
  ListCategories,
  Footer,
  Promotion,
  Exclusive,
  NotFound,
  FooterApp,
  Redes,
} from "@/components";

import { BasicLayout } from "../../layouts";

const categoriesCtrl = new Categories();
// const productsCtrl = new Products();

export default function HomePage() {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoriesCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await productsCtrl.getProductByOfertAndExclusive();
  //       setProducts(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  if (categories !== null) {
    return (
      <>
        <BasicLayout>
          <Redes />
          <ListCategories categories={categories} />

          {/* <Promotion products={products} />
          <hr />
          <Exclusive products={products} /> */}

          <FooterApp />
          <Footer />
        </BasicLayout>
      </>
    );
  } else {
    return (
      <>
        <noscript>
          <font color="red">
            {" "}
            JavaScript está desactivado en su navegador. Habilite JavaScript
            para acceder a todas las funciones del sitio.{" "}
          </font>
        </noscript>
        <BasicLayout>
          <ListCategories categories={categories} />
          <FooterApp />
          <Footer />
        </BasicLayout>
      </>
    );
  }
}
