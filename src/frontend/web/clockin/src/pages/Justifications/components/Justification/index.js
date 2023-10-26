import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import JustificationEditForm from "../JustificationEditForm";

import styles from "./index.module.css";

export default function Justification({
  justification,
  handleDeleteJustification,
  setJustifications,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <>
      {viewEditForm ? (
        <JustificationEditForm
          setJustifications={setJustifications}
          justificationProp={justification}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div className={styles.containerItens}>
          <p><span>Nome:</span> {justification.name}</p>
          <p><span>Descrição:</span> {justification.description}</p>
          <div className={styles.buttonJustification}>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
            <ButtonDelete
              handleDelete={handleDeleteJustification}
              id={justification.id}
            />
          </div>
        </div>
      )}
    </>
  );
}
