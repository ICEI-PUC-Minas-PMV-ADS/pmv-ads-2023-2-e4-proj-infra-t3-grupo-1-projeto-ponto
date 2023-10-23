import { React, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import InputForm from "../../../../components/InputForm";
import {
  putJustification,
  getJustifications,
} from "../../../../services/justificationsService";
import ButtonCancel from "../../../../components/ButtonCancel";

export default function JustificationEditForm({
  setJustifications,
  justificationProp = null,
  setViewEditForm = null,
}) {
  const [justificationName, setJustificationName] = useState(
    justificationProp.name
  );
  const [justificationdescription, setJustificationdescription] = useState(
    justificationProp.description
  );
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (justificationProp) {
        const justification = {
          name: justificationName,
          description: justificationdescription,
          id: justificationProp.id,
        };
        const responseUpdate = await putJustification(justification);
        const responseJustifications = await getJustifications(params.userId);
        console.log(responseUpdate);
        setJustifications(responseJustifications.data);
        setViewEditForm(false);
      }
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
      <ButtonCancel setViewEditForm={setViewEditForm} />
    </form>
  );
}
