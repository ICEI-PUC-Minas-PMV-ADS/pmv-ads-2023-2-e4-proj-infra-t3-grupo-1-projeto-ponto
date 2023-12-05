import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../../components/ButtonCancel";
import InputForm from "../../../../components/InputForm";
import {
  getPositions,
  putPosition,
} from "../../../../services/positionsService";

import styles from "./index.module.css";

export default function PositionEditForm({
  setPositions,
  positionProp = null,
  setViewEditForm = null,
}) {
  const [positionName, setPositionName] = useState(positionProp.name);
  const [positioHrvalue, setPositionHrValue] = useState(positionProp.hrValue);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPosition = {
        name: positionName,
        hrValue: positioHrvalue,
        id: positionProp.id,
      };
      const responseUpdate = await putPosition(newPosition);
      const responsePositions = await getPositions(params.userId);
      setPositions(responsePositions.data);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containerEdit}>
      <form onSubmit={handleSubmit}>
        <InputForm
          value={positionName}
          changeValue={(name) => setPositionName(name)}
          required={true}
          type={"text"}
          placeholder={"Digite aqui o nome do cargo"}
          label={"Nome: "}
        />
        <InputForm
          value={positioHrvalue}
          changeValue={(hrValue) => setPositionHrValue(hrValue)}
          required={true}
          type={"number"}
          placeholder={
            "Digite aqui o valor da hora que o colaborador irá receber"
          }
          label={"valor da hora: "}
        />
        <ButtonSubmitForm textButton={"Enviar"} />
        <ButtonCancel setViewEditForm={setViewEditForm} />
      </form>
    </div>
  );
}
