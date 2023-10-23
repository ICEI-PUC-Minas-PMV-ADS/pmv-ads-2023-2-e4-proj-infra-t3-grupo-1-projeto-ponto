import React from "react";
import ButtonDelete from "../../../components/ButtonDelete";
import { useNavigate } from "react-router-dom";

export default function Paycheck({ paycheck, handleDeletePaycheck}) {
  const navigate = useNavigate();

  const handleMoreInfo = (id) => {
    navigate(`${id}`);
  };

  return (
    <div>
      <p>
        Período do Contracheque: {paycheck.startDate} - {paycheck.endDate}
      </p>
      <button onClick={() => handleMoreInfo(paycheck.id)}>
        Mais informações
      </button>
      <ButtonDelete id={paycheck.id} handleDelete={handleDeletePaycheck} />
    </div>
  );
}
