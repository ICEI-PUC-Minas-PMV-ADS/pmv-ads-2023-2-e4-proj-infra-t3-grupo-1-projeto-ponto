import { React, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import InputForm from "../../../../components/InputForm";
import { postJustification } from "../../../../services/JustificationsService";

export default function JustificationForm({
  setJustifications,
  justificationProp = null,
  setViewEditForm = null,
  viewEditForm = false,
}) {
  const [justificationName, setJustificationName] = useState("");
  const [justificationdescription, setJustificationdescription] = useState("");
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const justification = {
        name: justificationName,
        description: justificationdescription,
        hrAdministratorId: params.userId,
      };
      const response = await postJustification(justification);
      setJustifications((prevJustifications) => [
        ...prevJustifications,
        response.data,
      ]);
      setJustificationName("");
      setJustificationdescription("");
    } catch (error) {
      console.error(error);
    }
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
      <ButtonSubmitForm textButton={"Enviar"} />
    </form>
  );
}
