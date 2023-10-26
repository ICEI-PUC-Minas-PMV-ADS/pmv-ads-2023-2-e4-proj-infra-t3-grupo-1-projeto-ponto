import React from "react";

import styles from "./index.module.css";

export default function ButtonCancel({ setViewEditForm }) {
  return (
    <button
      className={styles.buttonCancel} 
      data-cy="cancel"
      type="button"
      onClick={() => setViewEditForm(false)}
    >
      Cancelar
    </button>
  );
}
