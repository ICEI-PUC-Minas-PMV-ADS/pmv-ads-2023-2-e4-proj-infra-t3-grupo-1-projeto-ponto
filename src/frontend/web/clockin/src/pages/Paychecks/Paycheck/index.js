import React from "react";
import ButtonDelete from "../../../components/ButtonDelete";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

export default function Paycheck({ paycheck, handleDeletePaycheck }) {
  const navigate = useNavigate();

  const handleMoreInfo = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className={styles.contentPaycheck}>
      <h2 className={styles.tituloPaycheck}>Período do Contracheque</h2>
      <div className={styles.infoPaycheck}>
        <p>
          <strong>Intervalo:</strong> {paycheck.startDate} - {paycheck.endDate}
        </p>
        <div className={styles.buttonDelInfo}>
          <ButtonDelete id={paycheck.id} handleDelete={handleDeletePaycheck} />
        </div>
        <div className={styles.opcaoButton}>
          <button className={styles.buttonRedirecionar} onClick={() => handleMoreInfo(paycheck.id)}>
            Visualizar Contracheque
          </button>
        </div>
      </div>
    </div>
  );
}
