import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitRegisterForm from "../../../../components/ButtonSubmitRegisterForm";
import InputForm from "../../../../components/InputForm";
import { postJustification } from "../../../../services/JustificationsService";

export default function JustificationForm({ setJustifications }) {
  const [justificationName, setJustificationName] = useState("");
  const [justificationdescription, setJustificationdescription] = useState("");
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const departament = {
      name: justificationName,
      description: justificationdescription,
      hrAdministratorId: params.userId,
    };
    const response = await postJustification(departament);
    setJustifications((prevJustifications) => [...prevJustifications, response.data]);
    setJustificationName("");
    setJustificationdescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={justificationName}
        changeValue={(name) => setJustificationName(name)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui o nome da justificativa"}
        label={"Nome: "}
      />
      <InputForm
        value={justificationdescription}
        changeValue={(description) => setJustificationdescription(description)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui a descrição da justificativa"}
        label={"Descrição: "}
      />
      <ButtonSubmitRegisterForm textButton={"Enviar"} />
    </form>
  );
}
