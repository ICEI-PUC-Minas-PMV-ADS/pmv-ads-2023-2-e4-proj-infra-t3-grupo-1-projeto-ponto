import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import InputForm from "../../../../components/InputForm";
import { postPositions } from "../../../../services/PositionsService";

export default function PositionForm({ setPositions }) {
  const [positionName, setPositionName] = useState("");
  const [positioHrvalue, setPositionHrValue] = useState(0);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const position = {
        name: positionName,
        hrValue: positioHrvalue,
        hrAdministratorId: params.userId,
      };
      const response = await postPositions(position);
      setPositions((prevPositions) => [...prevPositions, response.data]);
      setPositionName("");
      setPositionHrValue(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
    </form>
  );
}
