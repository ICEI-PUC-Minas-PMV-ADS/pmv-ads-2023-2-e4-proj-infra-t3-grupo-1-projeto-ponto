import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import PositionEditForm from "../PositionEditForm";

import styles from "./index.module.css";

export default function Position({
  position,
  handleDeletePosition,
  setPositions,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <div>
      {viewEditForm ? (
        <PositionEditForm
          setPositions={setPositions}
          positionProp={position}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div className={styles.contentItens}>
          <span></span>
          <div className={styles.infoItens}>
            <p><strong>{position.name}</strong></p>
            <p>|</p>
            <p>
              {position.hrValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className={styles.buttonPosition}>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
            <ButtonDelete
              handleDelete={handleDeletePosition}
              id={position.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
