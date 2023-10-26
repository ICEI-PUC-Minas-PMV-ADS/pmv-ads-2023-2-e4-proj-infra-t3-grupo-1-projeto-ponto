import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonCancel from "../../../../components/ButtonCancel";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import InputForm from "../../../../components/InputForm";
import {
  putDepartament,
  getDepartaments,
} from "../../../../services/departamentService";

import styles from "./index.module.css";

export default function DepartamentEditForm({
  setDepartaments,
  departamentProp = null,
  setViewEditForm = null,
}) {
  const [departamentName, setDepartamentName] = useState(departamentProp.name);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseUpdate = await putDepartament(
        departamentName,
        departamentProp.id
      );
      const responseDepartaments = await getDepartaments(params.userId);
      console.log(responseUpdate);
      setDepartaments(responseDepartaments.data);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containerEdit}>
      <form onSubmit={handleSubmit}>
        <InputForm
          value={departamentName}
          changeValue={(name) => setDepartamentName(name)}
          required={true}
          type={"text"}
          placeholder={"Digite aqui o nome do departamento"}
          label={"Nome: "}
          data_cy={"input-name"}
        />
        <ButtonSubmitForm textButton={"Enviar"} />
        <ButtonCancel setViewEditForm={setViewEditForm} />
      </form>
    </div>
  );
}
