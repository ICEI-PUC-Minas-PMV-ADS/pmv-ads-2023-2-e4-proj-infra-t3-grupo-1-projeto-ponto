import React, { useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import DepartamentEditForm from "../DepartamentEditForm";

import styles from "./index.module.css";

export default function Departament({
  departament,
  handleDeleteDepartament,
  setDepartaments,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <div className={styles.containerButtons}>
      {viewEditForm ? (
        <DepartamentEditForm
          setDepartaments={setDepartaments}
          departamentProp={departament}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div className={styles.contentButtons}>
          <span></span>
          <p><strong>{departament.name}</strong></p>
          <div className={styles.buttons}>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
            <ButtonDelete
              handleDelete={handleDeleteDepartament}
              id={departament.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
