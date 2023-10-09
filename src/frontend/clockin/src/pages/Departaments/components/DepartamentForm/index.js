import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitRegisterForm from "../../../../components/ButtonSubmitRegisterForm";
import InputForm from "../../../../components/InputForm";
import { postDepartament } from "../../../../services/DepartamentService";

export default function DepartamentForm({ setDepartaments }) {
  const [departamentName, setDepartamentName] = useState("");
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const departament = {
      name: departamentName,
      hrAdministratorId: params.userId,
    };
    const response = await postDepartament(departament);
    console.log(response)
    setDepartaments((prevDepartaments) => [...prevDepartaments, response.data]);
    setDepartamentName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={departamentName}
        changeValue={(name) => setDepartamentName(name)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui o nome do departamento"}
        label={"Nome: "}
      />
      <ButtonSubmitRegisterForm textButton={"Enviar"} />
    </form>
  );
}
