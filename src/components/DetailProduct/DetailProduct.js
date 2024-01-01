import React, { useEffect, useState } from "react";
import { BASE_NAME } from "@/config/constants";
import { useWhatsApp, useCart } from "@/hooks";
import {
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";

import { toast } from "react-toastify";
import { BsWhatsapp } from "react-icons/bs";
import styles from "./DetailProduct.module.scss";

export function DetailProduct(props) {
  const scale = "c_scale,f_auto,q_auto,w_800/";
  const upload = "image/upload/";
  const { product, relate } = props;

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const { addCart } = useCart();
  const [productData, setProductData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [propductWhatsApp, setPropductWhatsApp] = useState();
  const [idProduct, setIdPropduct] = useState();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProductData(product[0]);
  }, []);

  const changeDetail = (data) => {
    setProductData(data);
    window.scrollTo(0, 0);
  };

  //-------------------------------------

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addProductId = (id) => {
    setIdPropduct(id);
    openCloseModal();
  };


  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");

    openCloseModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };



  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal();
  };

  const addDataToWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      BASE_NAME + propductWhatsApp
    );

    window.location.href = whatsappLink;
    toggleModal();
  };

  if (product) {
    return (
      <div className={styles.detailProduct}>
        <div className={styles.product} id="seccion-1">
          <CardImg
            alt="Card image cap"
            src={
              BASE_NAME + upload + scale + productData.images?.split(upload)[1]
            }
          />

          <div className={styles.description}>
            <CardTitle className={styles.title}>
              <h5 className={styles.name_extend}>{productData.name_extend}</h5>
              <div className={styles.price}>
                {productData.price2 > 0 && (
                  <h5>Por mayor $ {format(productData?.price2)}</h5>
                )}
                {productData.price1 > 0 && (
                  <h5>Al detal $ {format(productData?.price1)}</h5>
                )}
              </div>
            </CardTitle>
            
            <Button onClick={() => addProductId(productData.codigo)}>
                Agregar al Carrito
              </Button>
            <p>{productData.description}</p>

            <div
              className={styles.whatsapp}
              onClick={() =>
                addProductToWhatsApp(
                  productData.images +
                    " " +
                    productData.name_extend +
                    " " +
                    "Referencia: " +
                    productData.ref
                )
              }
            >
              <BsWhatsapp size={25} color="white" />
            </div>
          </div>
        </div>

        {/* <div className={styles.relate}>
          <p>PRODUCTOS RELACIONADOS</p>

          <div className={styles.list}>
            {map(relate, (product, index) => (
              <div
                key={index}
                className={styles.list__product2}
                onClick={() => changeDetail(product)}
              >
                <CardImg
                  alt="Card image cap"
                  src={BASE_NAME + product.images}
                />

                <div className={styles.name}>
                  <CardTitle>
                    <h5>
                      {product.name} {product.name_extend}
                    </h5>
                    {product.price1 !== null && <h6>$ {product.price1}</h6>}
                  </CardTitle>
                </div>
              </div>
            ))}
          </div>
        </div> */}

<Modal centered isOpen={showModal} toggle={openCloseModal}>
            <ModalHeader toggle={openCloseModal}>Ingrese Cantidad</ModalHeader>

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
              <Button color="secondary" onClick={openCloseModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

        <Modal centered isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

          <ModalBody>
            <FormGroup>
              {items.map((item, index) => (
                <Button
                  key={index}
                  color="success"
                  size="sm"
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
            <Button size="sm" outline color="secondary" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button size="sm" color="success" onClick={addDataToWhatsApp}>
              Aceptar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return <h5> La pagina no existe</h5>;
  }
}
