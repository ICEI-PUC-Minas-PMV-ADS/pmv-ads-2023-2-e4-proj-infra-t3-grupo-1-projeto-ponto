import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitRegisterForm from "../../../../components/ButtonSubmitRegisterForm";
import InputForm from "../../../../components/InputForm";
import { postPositions } from "../../../../services/PositionsService";

export default function PositionForm({ setPositions }) {
  const [positionName, setPositionName] = useState("");
  const [positioHrvalue, setPositionHrValue] = useState(0);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const departament = {
      name: positionName,
      hrValue: positioHrvalue,
      hrAdministratorId: params.userId,
    };
    const response = await postPositions(departament);
    setPositions((prevPositions) => [...prevPositions, response.data]);
    setPositionName("");
    setPositionHrValue(0);
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
      <ButtonSubmitRegisterForm textButton={"Enviar"} />
    </form>
  );
}
