import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";
import { toast } from "react-toastify";
import {
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import Link from "next/link";

import { BsWhatsapp } from "react-icons/bs";

import styles from "./ListProduts.module.scss";

export function Listproducts(props) {
  const scale = "c_scale,f_auto,q_auto,w_400/";
  const upload = 'image/upload/';


  const { products, title } = props;
  const { addCart, loading } = useCart();
  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [idProduct, setIdPropduct] = useState();
  const [propductWhatsApp, setPropductWhatsApp] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductId = (id) => {
    setIdPropduct(id);
    toggleModal();
  };

  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");
    toggleModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  //----------------------------------------------

  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal2();
  };

  const addDataToWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      BASE_NAME + propductWhatsApp
    );

    window.location.href = whatsappLink;

    toggleModal2();
  };

  return (
    <div className={styles.listProduct}>
      <h4>{title}</h4>
      <div className={styles.list}>
        {map(products, (product, index) => (
          <div key={index} className={styles.list__product}>
            <div>
              <Link href={`/${product.productData.slug}`}>
                <CardImg
                  alt="Card image cap"
                  src={
                    BASE_NAME +
                  upload +
                  scale +
                    product.productData.images.split(upload)[1]
                  }
                />
              </Link>
              <div className={styles.product}>
                {/* <p>{product.productData.images.split(upload)[1]}</p> */}
                <CardTitle className={styles.title}>
                  <h5>{product.productData.name_extend}</h5>
                </CardTitle>

                <div className={styles.price}>
                  <CardSubtitle>
                    {product.productData.price2 > 0 && (
                      <h6>Por mayor $ {product.productData.price2}</h6>
                    )}
                    {product.productData.price1 > 0 && (
                      <h6>Al detal $ {product.productData.price1}</h6>
                    )}
                  </CardSubtitle>

                  <div
                    className={styles.whatsapp}
                    onClick={() =>
                      addProductToWhatsApp(
                        product.productData.images +
                          " " +
                          product.productData.name_extend +
                          " " +
                          "Referencia: " +
                          product.productData.ref
                      )
                    }
                  >
                    <BsWhatsapp size={25} color="white" />
                  </div>
                </div>
              </div>
            </div>
            <Button
              color="primary"
              onClick={() => addProductId(product.productData.codigo)}
            >
              Agregar al Carrito
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Ingrese Cantidad</ModalHeader>

        <ModalBody>
          Cantidad
          <FormGroup>
            <Input
              value={quantity}
              type="number"
              name="cantidad"
              id="cantidad"
              placeholder="Cantidad"
              onChange={handleQuantityChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={addData}>
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal centered isOpen={isOpen2} toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                size="sm"
                key={index}
                color="success"
                outline
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <BsWhatsapp size={20} /> Linea {index + 1}
                <p>{seller[index]}</p>
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button siz="sm" outline color="secondary" onClick={toggleModal2}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addDataToWhatsApp}>
            Aceptar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
