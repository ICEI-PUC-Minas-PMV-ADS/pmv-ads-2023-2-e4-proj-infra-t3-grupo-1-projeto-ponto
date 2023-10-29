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
        <div className={styles.contentItens}>
          <div>
          <p><strong>Nome:</strong> {justification.name}</p>
          <p><strong>Descrição:</strong> {justification.description}</p>
          </div>
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
