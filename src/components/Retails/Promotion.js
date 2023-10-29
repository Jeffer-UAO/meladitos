import Link from "next/link";
import { CardImg, CardTitle } from "reactstrap";
import { BASE_NAME } from "@/config/constants";
import styles from "./Retail.module.scss";
import { map } from "lodash";

export function Promotion(props) {
  const scale = "c_scale,f_auto,q_auto,w_150/";
  const upload = "image/upload/";

  const { products } = props;
  return (
    <div className={styles.content}>
      <h5>Promociones</h5>

      <div className={styles.list}>
        {map(
          products,
          (product, index) =>
            product.offer && (
              <Link
                key={index}
                href={`/${product.slug}`}
                className={styles.list__product}
              >
                <CardImg
                  alt="Card image cap"
                  src={
                    BASE_NAME +
                    upload +
                    scale +
                    product.images.split(upload)[1]
                  }
                />

                <div className={styles.product}>
                  <CardTitle className={styles.title}>
                    <h5>
                      {product.name} {product.name_extend}
                    </h5>
                    <h6>$ {product.price1}</h6>
                  </CardTitle>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
