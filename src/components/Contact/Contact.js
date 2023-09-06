import styles from "./Contact.module.scss";
import { FooterApp } from "../FooterApp";

export function Contact() {
  return (
    <>
      <div className={styles.container}>
        <h1>LOS MELADITOS</h1>
        <div className={styles.phone}>
          <h5>Líneas de atención</h5>
          <ul>
            <li>(+57) 322 663 0481</li>
            <li>(+57) 310 893 7275</li>
            <li>(+57) 310 761 7780</li>
          </ul>
        </div>

        <div className={styles.adress}>
          <h5>Ubicación:</h5>
          <p>Calle 15# 9-36 frente a la estación del mio Petecuy</p>
        </div>
      </div>
      <FooterApp />
    </>
  );
}
