import React from "react";
import { FaTrash } from "react-icons/fa";

import styles from './index.module.css'

export default function ButtonDelete({handleDelete, id}) {  
  return (
    <button className={styles.buttonDelete} data-cy="delete" onClick={() => handleDelete(id)}>
      <FaTrash/>
    </button>
  );
}
