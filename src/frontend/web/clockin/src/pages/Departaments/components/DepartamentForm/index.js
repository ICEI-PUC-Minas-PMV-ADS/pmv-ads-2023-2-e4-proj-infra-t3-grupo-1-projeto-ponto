import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import InputForm from "../../../../components/InputForm";
import { postDepartament } from "../../../../services/departamentService";

export default function DepartamentForm({ setDepartaments }) {
  const [departamentName, setDepartamentName] = useState("");
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const departament = {
        name: departamentName,
        hrAdministratorId: params.userId,
      };
      const response = await postDepartament(departament);
      console.log(response);
      setDepartaments((prevDepartaments) => [
        ...prevDepartaments,
        response.data,
      ]);
      setDepartamentName("");
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={departamentName}
        changeValue={(name) => setDepartamentName(name)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui o nome do departamento"}
        // label={"Nome: "}
        data_cy={"input-name"}
      />
      <ButtonSubmitForm textButton={"Enviar"} />
    </form>
  );
}
