import React from "react";
import styles from "./Redes.module.scss";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";


export function Redes() {
  return <div className={styles.space}>
    <h4>CATÁLOGO 2023</h4>
    <div className={styles.phone}>
      <p>322 663 0481 - 313 600 8914</p>      
    </div>

  
    <div className={styles.redes}>
      <p>losmeladitos01 <AiFillInstagram size="22" color="yellow" /> </p>
      <p>@losmeladitos <BsFacebook color="blue" size="20"/></p>   
    </div>
  </div>;
}
