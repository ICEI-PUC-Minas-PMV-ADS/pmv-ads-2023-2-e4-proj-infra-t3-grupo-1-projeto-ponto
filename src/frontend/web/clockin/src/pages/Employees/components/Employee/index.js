import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import ButtonDelete from "../../../../components/ButtonDelete";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

export default function Employee({ employee, handleDeletehemployee }) {
  const navigate = useNavigate();

  const handleMoreInfo = (id) => {
    navigate(`${id}`);
  };
  return (
    <div className={styles.contentItens}>
      <span></span>
      <p><strong>{employee.fullName}</strong></p>
      <div className={styles.buttonEmployee}>
        <button className={styles.buttonUser} onClick={() => handleMoreInfo(employee.id)}>
          <FaUserLarge />
        </button>
        <ButtonDelete handleDelete={handleDeletehemployee} id={employee.id} />
      </div>
    </div>
  );
}
