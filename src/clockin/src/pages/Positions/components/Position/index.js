import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import PositionEditForm from "../PositionEditForm";

export default function Position({
  position,
  handleDeletePosition,
  setPositions,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <div>
      {viewEditForm ? (
        <PositionEditForm
          setPositions={setPositions}
          positionProp={position}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div>
          <p>{position.name}</p>
          <p>
            {position.hrValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <ButtonUpdate setViewEditForm={setViewEditForm} />
          <ButtonDelete handleDelete={handleDeletePosition} id={position.id} />
        </div>
      )}
    </div>
  );
}
